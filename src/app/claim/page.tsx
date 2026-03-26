import Link from "next/link"
import { Suspense } from "react"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { AddressForm } from "@/components/v2/sections/address-form"
import { ScrollRestoration } from "@/components/utils/scroll-restoration"

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
