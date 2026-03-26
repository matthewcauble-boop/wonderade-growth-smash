import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { ScrollRestoration } from "@/components/utils/scroll-restoration"
import { Suspense } from "react"
import { ShareCard } from "@/components/v2/sections/share-card"

export default function SharePage() {
    return (
        <main className="relative min-h-screen bg-[#F8F2D0] font-sans [&_*]:!font-sans flex flex-col">
            <ScrollRestoration />
            <Header />
            
            {/* Step 3 Success Container */}
            <section className="w-full flex-grow flex items-center justify-center p-4 py-20 bg-[#FBD02E]">
                <div className="max-w-2xl w-full">
                    <Suspense fallback={<div className="text-center font-mono text-[#374191] animate-pulse">Generating your custom link...</div>}>
                        <ShareCard />
                    </Suspense>
                </div>
            </section>
            
            <Footer />
        </main>
    )
}
