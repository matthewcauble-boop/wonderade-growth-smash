import { NextResponse } from "next/server"
import { isAngle } from "@/lib/ad-angles"
import {
    AGE_BANDS, CONCEPTS, DOING, INTENT, KID_COUNTS, NUTRIENTS, THOUGHT, WORRY, rankScores, type NutrientKey, type SurveyAnswer,
} from "@/lib/needs-survey"

const KLAVIYO_API_URL = "https://a.klaviyo.com/api"
const KLAVIYO_REVISION = "2024-10-15"
const NUTRIENT_KEYS = new Set<string>(NUTRIENTS.map((n) => n.key))

const oneOf = <T extends string>(values: readonly T[], v: unknown): T | "" => ((values as readonly unknown[]).includes(v) ? (v as T) : "")

// Stores a parent-needs survey as a Klaviyo "Needs Survey Completed" event (one flat row per response when
// exported) and copies the headline results onto the profile so segments can use them.
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const email = typeof body.email === "string" && body.email.includes("@") ? body.email.slice(0, 200) : ""
        const angle = isAngle(body.angle) ? body.angle : ""
        const answer = (body.answer || {}) as Partial<SurveyAnswer>

        const properties: Record<string, unknown> = {
            landing_angle: angle || "none",
            other_worry: typeof answer.worry === "string" ? answer.worry.slice(0, 500) : "",
        }

        // per nutrient: thought about it / worried / what they do today
        const buying: string[] = []
        const worriedVery: string[] = []
        let nutrientsAnswered = 0
        for (const n of NUTRIENTS) {
            const a = answer.nutrients?.[n.key]
            const thought = oneOf(THOUGHT, a?.thought)
            const worry = oneOf(WORRY, a?.worry)
            const doing = oneOf(DOING, a?.doing)
            if (thought && worry && doing) nutrientsAnswered++
            properties[`${n.key}_thought`] = thought
            properties[`${n.key}_worry`] = worry
            properties[`${n.key}_doing`] = doing
            if (doing === "buys_product") buying.push(n.key)
            if (worry === "very") worriedVery.push(n.key)
        }
        if (nutrientsAnswered === 0) return NextResponse.json({ error: "Incomplete survey" }, { status: 400 })

        const rank = Array.isArray(answer.rank)
            ? answer.rank.filter((r) => NUTRIENT_KEYS.has(r?.best) && NUTRIENT_KEYS.has(r?.worst) && r.best !== r.worst)
            : []
        const scores = rankScores(rank)
        const ranked = (Object.entries(scores) as [NutrientKey, number][]).sort((a, b) => b[1] - a[1])
        const topNeed = rank.length ? ranked[0][0] : ""
        Object.assign(properties, Object.fromEntries(ranked.map(([key, score]) => [`rank_score_${key}`, score])))
        properties.rank_order = rank.length ? ranked.map(([key]) => key).join(" > ") : ""

        for (const c of CONCEPTS) properties[`would_buy_${c.key}`] = oneOf(INTENT, answer.concepts?.[c.key])

        properties.kid_ages = Array.isArray(answer.ages) ? answer.ages.filter((a) => (AGE_BANDS as readonly string[]).includes(a)).join(", ") : ""
        properties.kid_count = oneOf(KID_COUNTS, answer.kids)
        properties.already_buys_for = buying.join(", ")
        properties.very_worried_about = worriedVery.join(", ")

        const KLAVIYO_PRIVATE_KEY = process.env.KLAVIYO_PRIVATE_KEY
        if (!KLAVIYO_PRIVATE_KEY) {
            console.error("Missing KLAVIYO_PRIVATE_KEY")
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        // anonymous visitors (opened /survey without an email) still count, under a random id
        const identity = email ? { email } : { anonymous_id: `survey-${crypto.randomUUID()}` }

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
                                    ...identity,
                                    properties: {
                                        survey_top_need: topNeed,
                                        survey_already_buys_for: properties.already_buys_for,
                                        survey_would_buy_iron_packet: properties.would_buy_iron_packet,
                                        survey_completed_at: new Date().toISOString(),
                                    },
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

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("Survey API error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
