import { NextResponse } from "next/server"
import { createHash } from "node:crypto"

const KLAVIYO_API_URL = "https://a.klaviyo.com/api"
const KLAVIYO_REVISION = "2024-10-15"

type Json = Record<string, unknown>

function klaviyoHeaders(key: string) {
    return {
        "Content-Type": "application/json",
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: KLAVIYO_REVISION,
    }
}

// Credit the referrer: bump referral_count on their profile so the "3 friends = free box" promise on
// /share is trackable in Klaviyo (segment: referral_count >= 3).
async function creditReferrer(key: string, referrerEmail: string) {
    const q = encodeURIComponent(`equals(email,"${referrerEmail}")`)
    const res = await fetch(`${KLAVIYO_API_URL}/profiles/?filter=${q}&fields[profile]=properties`, { headers: klaviyoHeaders(key) })
    if (!res.ok) return
    const data = await res.json()
    const ref = data?.data?.[0]
    if (!ref?.id) return
    const count = Number(ref.attributes?.properties?.referral_count ?? 0) + 1
    await fetch(`${KLAVIYO_API_URL}/profiles/${ref.id}/`, {
        method: "PATCH",
        headers: klaviyoHeaders(key),
        body: JSON.stringify({
            data: {
                type: "profile",
                id: ref.id,
                attributes: { properties: { referral_count: count, last_referral_at: new Date().toISOString() } },
            },
        }),
    })
}

// Server-side Meta Conversions API event, deduplicated against the browser pixel via event_id.
// No-op unless META_PIXEL_ID and META_CAPI_TOKEN are set.
async function sendMetaEvent(opts: { name: string; email: string; eventId?: string; request: Request }) {
    const pixel = process.env.META_PIXEL_ID
    const token = process.env.META_CAPI_TOKEN
    if (!pixel || !token) return
    const em = createHash("sha256").update(opts.email.trim().toLowerCase()).digest("hex")
    const payload = {
        data: [
            {
                event_name: opts.name,
                event_time: Math.floor(Date.now() / 1000),
                event_id: opts.eventId,
                action_source: "website",
                event_source_url: opts.request.headers.get("referer") ?? "https://www.wonderade.us/",
                user_data: {
                    em: [em],
                    client_ip_address: opts.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
                    client_user_agent: opts.request.headers.get("user-agent") ?? undefined,
                },
            },
        ],
    }
    try {
        await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
    } catch (e) {
        console.error("[Meta CAPI]", e)
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, firstName, lastName, address, city, state, postalCode, eventId, source } = body

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        const KLAVIYO_PRIVATE_KEY = process.env.KLAVIYO_PRIVATE_KEY
        if (!KLAVIYO_PRIVATE_KEY) {
            console.error("Missing KLAVIYO_PRIVATE_KEY")
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }
        const headers = klaviyoHeaders(KLAVIYO_PRIVATE_KEY)

        // Referral cookie set by middleware from ?ref=<base64 email>
        const referralToken = request.headers
            .get("cookie")
            ?.split("; ")
            .find((row) => row.startsWith("wonderade_referral_id="))
            ?.split("=")[1]
        let referrerEmail: string | null = null
        if (referralToken) {
            try {
                const decoded = Buffer.from(decodeURIComponent(referralToken), "base64").toString("utf8")
                if (decoded.includes("@") && decoded.toLowerCase() !== String(email).toLowerCase()) referrerEmail = decoded.toLowerCase()
            } catch {
                // ignore bad token
            }
        }

        const hasAddress = Boolean(address || city || state || postalCode)

        // Step 1: create or update the profile
        const profileAttributes: Json = {
            email,
            properties: {
                signup_source: source || "v2-landing-page",
                free_sample_claim: hasAddress,
                signup_date: new Date().toISOString(),
                ...(referrerEmail ? { referred_by: referrerEmail } : {}),
            },
        }
        if (firstName) profileAttributes.first_name = firstName
        if (lastName) profileAttributes.last_name = lastName
        if (hasAddress) {
            profileAttributes.location = {
                address1: address || "",
                city: city || "",
                region: state || "",
                zip: postalCode || "",
                country: "US",
            }
        }

        const profileRes = await fetch(`${KLAVIYO_API_URL}/profiles/`, {
            method: "POST",
            headers,
            body: JSON.stringify({ data: { type: "profile", attributes: profileAttributes } }),
        })

        let profileId: string | null = null
        let isNew = false
        if (profileRes.status === 201) {
            profileId = (await profileRes.json()).data?.id ?? null
            isNew = true
        } else if (profileRes.status === 409) {
            profileId = (await profileRes.json()).errors?.[0]?.meta?.duplicate_profile_id ?? null
            if (profileId) {
                await fetch(`${KLAVIYO_API_URL}/profiles/${profileId}/`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({ data: { type: "profile", id: profileId, attributes: profileAttributes } }),
                })
            }
        } else {
            console.error("Klaviyo profile error:", await profileRes.text())
            return NextResponse.json({ error: "Failed to create profile" }, { status: profileRes.status })
        }

        // Step 2: subscribe with consent. The list-relationships endpoint only grants membership and records no
        // consent (13 of the first 60 signups have none); the subscription job sets SUBSCRIBED and adds to the list.
        const listId = process.env.KLAVIYO_LIST_ID?.trim()
        if (listId) {
            const subRes = await fetch(`${KLAVIYO_API_URL}/profile-subscription-bulk-create-jobs/`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    data: {
                        type: "profile-subscription-bulk-create-job",
                        attributes: {
                            custom_source: source || "v2-landing-page",
                            profiles: {
                                data: [
                                    {
                                        type: "profile",
                                        attributes: {
                                            email,
                                            subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                                        },
                                    },
                                ],
                            },
                        },
                        relationships: { list: { data: { type: "list", id: listId } } },
                    },
                }),
            })
            if (!subRes.ok) console.error("Klaviyo subscribe error:", subRes.status, await subRes.text())
        }

        // Step 3: side effects that must not fail the signup
        const tasks: Promise<unknown>[] = []
        if (referrerEmail && isNew) tasks.push(creditReferrer(KLAVIYO_PRIVATE_KEY, referrerEmail))
        tasks.push(sendMetaEvent({ name: hasAddress ? "Lead" : "Subscribe", email, eventId, request }))
        await Promise.allSettled(tasks)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("Klaviyo API error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
