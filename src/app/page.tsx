import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/v2/layout/header"
import { AnnouncementBar } from "@/components/v2/layout/announcement-bar"
import { BenefitFader } from "@/components/v2/layout/benefit-fader"
import { Hero } from "@/components/v2/sections/hero"
import { SmashSequence } from "@/components/v2/sections/smash-sequence"
import { Flavors } from "@/components/v2/sections/flavors"
import { Quality } from "@/components/v2/sections/quality"
import { BoxComparison } from "@/components/v2/sections/box-comparison"
import { Offer } from "@/components/v2/sections/offer"
import { Footer } from "@/components/v2/layout/footer"
import { ScrollRestoration } from "@/components/utils/scroll-restoration"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white font-sans [&_*]:!font-sans">
      <ScrollRestoration />
      <BenefitFader />
      <Header />
      <Hero />
      <AnnouncementBar />
      <SmashSequence />
      <Flavors />
      <Quality />
      {/* <BoxComparison /> */}
      <Offer />
      <Footer />
    </main>
  )
}
