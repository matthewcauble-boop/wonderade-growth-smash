import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, firstName, lastName, address, city, state, postalCode } = body;

        // Basic syntactic validation to shield the downstream API from malformed requests
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }

        const OMNISEND_API_KEY = process.env.OMNISEND_API_KEY;

        if (!OMNISEND_API_KEY) {
            console.error("CRITICAL: Missing Omnisend API Key in Server Runtime");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        // Transmit securely to the Omnisend v3 Contacts API
        const payload: any = {
            identifiers: [
                {
                    type: "email",
                    id: email,
                    channels: {
                        email: {
                            status: "subscribed",
                            statusDate: new Date().toISOString()
                        }
                    }
                }
            ],
            tags: ["v2-landing-page", "free-sample-claim"] // Native markers for the Omnisend Segment
        };

        // Dynamically enrich payload if step-2 address data is natively present
        if (firstName) payload.firstName = firstName;
        if (lastName) payload.lastName = lastName;
        if (address) payload.address = address;
        if (city) payload.city = city;
        if (state) payload.state = state;
        if (postalCode) payload.postalCode = postalCode;
        if (address || city || state) payload.country = "US"; // Required context standard for US mapping natively

        const response = await fetch("https://api.omnisend.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": OMNISEND_API_KEY
            },
            body: JSON.stringify(payload)
        });

        // Fail gracefully and explicitly if Omnisend rejects the payload structure
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Omnisend Rejection Log:", errorData);
            return NextResponse.json({ error: "Failed to append profile to Omnisend queue" }, { status: response.status });
        }

        return NextResponse.json({ success: true, message: "Profile successfully allocated to Omnisend." }, { status: 200 });

    } catch (error) {
        console.error("Fatal Next.js Serverless Execution Error:", error);
        return NextResponse.json({ error: "Internal Server Architecture Error" }, { status: 500 });
    }
}
