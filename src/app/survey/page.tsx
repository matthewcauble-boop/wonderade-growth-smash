import { Suspense } from "react"
import type { Metadata } from "next"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { NeedsSurvey } from "@/components/v2/sections/needs-survey"

export const metadata: Metadata = {
    title: "What matters most to you? | Wonderade",
    description: "Help shape what we make for your kids. About 2 minutes.",
    robots: { index: false, follow: false },
}

export default function SurveyPage() {
    return (
        <main className="relative flex min-h-screen flex-col bg-[#F8F2D0] font-sans">
            <Header />
            <section className="flex w-full flex-grow items-center justify-center bg-[#FBD02E] p-4 py-16">
                <div className="w-full max-w-xl">
                    <h1 className="mb-2 text-center font-sans text-3xl font-black uppercase text-[#374191]">Help us build it</h1>
                    <p className="mb-8 text-center font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/70">
                        About 2 minutes. Tell us what your family actually thinks about.
                    </p>
                    <Suspense fallback={null}>
                        <NeedsSurvey />
                    </Suspense>
                </div>
            </section>
            <Footer />
        </main>
    )
}
