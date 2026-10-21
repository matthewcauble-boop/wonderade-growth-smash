import { NextResponse } from "next/server"
import { isAngle } from "@/lib/ad-angles"
import { AGE_BANDS, NEEDS, TRADEOFFS, scoreNeeds, type NeedKey, type SurveyAnswer } from "@/lib/needs-survey"

const KLAVIYO_API_URL = "https://a.klaviyo.com/api"
const KLAVIYO_REVISION = "2024-10-15"
const NEED_KEYS = new Set<string>(NEEDS.map((n) => n.key))

// Stores a parent-needs survey as a Klaviyo "Needs Survey Completed" event (one row per response when exported)
// and copies the headline result onto the profile so segments can use it.
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const email = typeof body.email === "string" && body.email.includes("@") ? body.email.slice(0, 200) : ""
        const angle = isAngle(body.angle) ? body.angle : ""
        const answer = body.answer as SurveyAnswer | undefined

        const screens = Array.isArray(answer?.screens)
            ? answer!.screens.filter((s) => NEED_KEYS.has(s?.best) && NEED_KEYS.has(s?.worst) && s.best !== s.worst)
            : []
        if (screens.length === 0) return NextResponse.json({ error: "Incomplete survey" }, { status: 400 })

        const tradeoffs: Record<string, string> = {}
        for (const t of TRADEOFFS) {
            const choice = answer?.tradeoffs?.[t.key]
            if (choice === "a" || choice === "b") tradeoffs[`tradeoff_${t.key}`] = t[choice]
        }
        const ages = Array.isArray(answer?.ages) ? answer!.ages.filter((a) => (AGE_BANDS as readonly string[]).includes(a)) : []
        const worry = typeof answer?.worry === "string" ? answer.worry.slice(0, 500) : ""

        const scores = scoreNeeds(screens)
        const ranked = (Object.entries(scores) as [NeedKey, number][]).sort((a, b) => b[1] - a[1])
        const topNeed = ranked[0][0]

        const KLAVIYO_PRIVATE_KEY = process.env.KLAVIYO_PRIVATE_KEY
        if (!KLAVIYO_PRIVATE_KEY) {
            console.error("Missing KLAVIYO_PRIVATE_KEY")
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        const properties: Record<string, unknown> = {
            landing_angle: angle || "none",
            top_need: topNeed,
            need_ranking: ranked.map(([key]) => key).join(" > "),
            ...Object.fromEntries(ranked.map(([key, score]) => [`score_${key}`, score])),
            ...tradeoffs,
            kid_ages: ages.join(", "),
            biggest_worry: worry,
            screens_answered: screens.length,
        }

        // anonymous visitors (opened /survey without an email) still count, under a random id
        const profileAttributes = email ? { email } : { anonymous_id: `survey-${crypto.randomUUID()}` }

        const res = await fetch(`${KLAVIYO_API_URL}/events/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_KEY}`,
                revision: KLAVIYO_REVISION,
            },
            body: JSON.stringify({
                data: {
                    type: "event",
                    attributes: {
                        properties,
                        metric: { data: { type: "metric", attributes: { name: "Needs Survey Completed" } } },
                        profile: {
                            data: {
                                type: "profile",
                                attributes: {
                                    ...profileAttributes,
                                    properties: { survey_top_need: topNeed, survey_completed_at: new Date().toISOString() },
                                },
                            },
                        },
                    },
                },
            }),
        })
        if (!res.ok) {
            console.error("Klaviyo survey event error:", await res.text())
            return NextResponse.json({ error: "Failed to save survey" }, { status: 502 })
        }

        return NextResponse.json({ success: true, topNeed }, { status: 200 })
    } catch (error) {
        console.error("Survey API error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
