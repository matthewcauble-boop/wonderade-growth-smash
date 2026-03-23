import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { BenefitFader } from "@/components/layout/benefit-fader"
import { Hero } from "@/components/sections/hero"
import { SmashSequence } from "@/components/sections/smash-sequence"
import { Flavors } from "@/components/sections/flavors"
import { Quality } from "@/components/sections/quality"
import { BoxComparison } from "@/components/sections/box-comparison"
import { Offer } from "@/components/sections/offer"
import { ScrollRestoration } from "@/components/utils/scroll-restoration"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
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

    </main>
  )
}
