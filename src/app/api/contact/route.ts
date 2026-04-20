import { NextResponse } from "next/server"

const KLAVIYO_API_URL = "https://a.klaviyo.com/api"
const KLAVIYO_REVISION = "2024-10-15"

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 })
        }

        const KLAVIYO_PRIVATE_KEY = process.env.KLAVIYO_PRIVATE_KEY

        if (KLAVIYO_PRIVATE_KEY) {
            // Create/update profile with contact form tag
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
                        attributes: {
                            email,
                            first_name: name,
                            properties: {
                                contact_message: message,
                                contact_date: new Date().toISOString(),
                                contact_source: "website-form"
                            }
                        }
                    }
                })
            })

            if (profileRes.status === 409) {
                // Profile exists — track as an event instead
                await fetch(`${KLAVIYO_API_URL}/events/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_KEY}`,
                        revision: KLAVIYO_REVISION
                    },
                    body: JSON.stringify({
                        data: {
                            type: "event",
                            attributes: {
                                metric: { data: { type: "metric", attributes: { name: "Contact Form Submitted" } } },
                                profile: { data: { type: "profile", attributes: { email } } },
                                properties: {
                                    name,
                                    message,
                                    source: "website-form"
                                },
                                time: new Date().toISOString()
                            }
                        }
                    })
                })
            }
        }

        // Log for visibility
        console.log(`[Contact Form] From: ${name} <${email}> — ${message}`)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Contact Form Error]", error)
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}
