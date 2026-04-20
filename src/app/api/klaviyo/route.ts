import { NextResponse } from "next/server"

const KLAVIYO_API_URL = "https://a.klaviyo.com/api"
const KLAVIYO_REVISION = "2024-10-15"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, firstName, lastName, address, city, state, postalCode } = body

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
        }

        const KLAVIYO_PRIVATE_KEY = process.env.KLAVIYO_PRIVATE_KEY

        if (!KLAVIYO_PRIVATE_KEY) {
            console.error("Missing KLAVIYO_PRIVATE_KEY")
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        // Parse referral cookie
        const cookieHeader = request.headers.get("cookie")
        const referralToken = cookieHeader
            ?.split("; ")
            .find((row) => row.startsWith("wonderade_referral_id="))
            ?.split("=")[1]
        let referrerEmail = null
        if (referralToken) {
            try {
                referrerEmail = Buffer.from(referralToken, "base64").toString("ascii")
            } catch {
                // ignore decode error
            }
        }

        // Step 1: Create or update profile via Klaviyo Profiles API
        const profileAttributes: Record<string, unknown> = {
            email,
            properties: {
                signup_source: "v2-landing-page",
                free_sample_claim: true,
                signup_date: new Date().toISOString(),
                ...(referrerEmail ? { referred_by: referrerEmail } : {})
            }
        }
        if (firstName) profileAttributes.first_name = firstName
        if (lastName) profileAttributes.last_name = lastName
        if (address || city || state || postalCode) {
            profileAttributes.location = {
                address1: address || "",
                city: city || "",
                region: state || "",
                zip: postalCode || "",
                country: "US"
            }
        }

        const profileRes = await fetch(`${KLAVIYO_API_URL}/profiles/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_KEY}`,
                revision: KLAVIYO_REVISION
            },
            body: JSON.stringify({
                data: {
                    type: "profile",
                    attributes: profileAttributes
                }
            })
        })

        let profileId: string | null = null

        if (profileRes.status === 201) {
            const profileData = await profileRes.json()
            profileId = profileData.data?.id
        } else if (profileRes.status === 409) {
            // Profile exists — get the ID from the duplicate response
            const dupeData = await profileRes.json()
            profileId = dupeData.errors?.[0]?.meta?.duplicate_profile_id || null

            // Update the existing profile with any new data
            if (profileId) {
                await fetch(`${KLAVIYO_API_URL}/profiles/${profileId}/`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_KEY}`,
                        revision: KLAVIYO_REVISION
                    },
                    body: JSON.stringify({
                        data: {
                            type: "profile",
                            id: profileId,
                            attributes: profileAttributes
                        }
                    })
                })
            }
        } else {
            const errorText = await profileRes.text()
            console.error("Klaviyo profile error:", errorText)
            return NextResponse.json({ error: "Failed to create profile" }, { status: profileRes.status })
        }

        // Step 2: Subscribe to the main list (you'll need to set KLAVIYO_LIST_ID in env)
        const listId = process.env.KLAVIYO_LIST_ID
        if (listId && profileId) {
            await fetch(`${KLAVIYO_API_URL}/lists/${listId}/relationships/profiles/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_KEY}`,
                    revision: KLAVIYO_REVISION
                },
                body: JSON.stringify({
                    data: [{ type: "profile", id: profileId }]
                })
            })
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("Klaviyo API error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
