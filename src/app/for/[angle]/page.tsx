import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { AngleLanding } from "@/components/v2/sections/angle-landing"
import { ANGLES, ANGLE_KEYS, isAngle } from "@/lib/ad-angles"

export function generateStaticParams() {
    return ANGLE_KEYS.map((angle) => ({ angle }))
}

export async function generateMetadata({ params }: { params: Promise<{ angle: string }> }): Promise<Metadata> {
    const { angle } = await params
    if (!isAngle(angle)) return {}
    const a = ANGLES[angle]
    // ad-test pages stay out of search so organic traffic doesn't skew the comparison
    return { title: `${a.headline} ${a.accent} | Wonderade`, description: a.subhead, robots: { index: false, follow: false } }
}

export default async function AngleLandingPage({ params }: { params: Promise<{ angle: string }> }) {
    const { angle } = await params
    if (!isAngle(angle)) notFound()
    return (
        <main className="relative min-h-screen bg-white font-sans">
            <Header />
            <Suspense fallback={null}>
                <AngleLanding angle={ANGLES[angle]} />
            </Suspense>
            <Footer />
        </main>
    )
}
