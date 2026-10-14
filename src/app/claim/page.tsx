import Link from "next/link"
import { pageMeta } from "@/lib/site"
import { Suspense } from "react"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { AddressForm } from "@/components/v2/sections/address-form"
import { ScrollRestoration } from "@/components/utils/scroll-restoration"

export const metadata = pageMeta({
    title: "Join the Founding Families: Try Wonderade First",
    description:
        "Wonderade is in pre-launch. Founding families can request a sample of the kids' juice box with 8g protein and 3g sugar (0g added) before it goes on sale.",
    path: "/claim",
})

export default function ClaimPage() {
    return (
        <main className="relative min-h-screen bg-[#F8F2D0] font-sans [&_*]:!font-sans flex flex-col">
            <ScrollRestoration />
            <Header />
            
            {/* Massive Brand Yellow Container strictly holding the Step-2 Onboarding Form */}
            <section className="w-full flex-grow flex items-center justify-center p-4 py-20 bg-[#FBD02E]">
                <div className="max-w-xl w-full">
                    <Suspense fallback={<div className="text-center font-mono text-[#374191] animate-pulse">Loading Custom Form...</div>}>
                        <AddressForm />
                    </Suspense>
                </div>
            </section>
            
            <Footer />
        </main>
    )
}
