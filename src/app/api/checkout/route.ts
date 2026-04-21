import { NextResponse } from "next/server"
import { createCheckout, createCheckoutWithEmail } from "@/lib/shopify"

export async function POST(req: Request) {
    try {
        const { variantId, email, quantity } = await req.json()

        if (!variantId) {
            return NextResponse.json({ error: "Variant ID required" }, { status: 400 })
        }

        const checkout = email
            ? await createCheckoutWithEmail(variantId, email, quantity || 1)
            : await createCheckout(variantId, quantity || 1)

        if (!checkout?.webUrl) {
            return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 })
        }

        return NextResponse.json({
            checkoutUrl: checkout.webUrl,
            checkoutId: checkout.id
        })
    } catch (error) {
        console.error("[Checkout Error]", error)
        return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
    }
}
