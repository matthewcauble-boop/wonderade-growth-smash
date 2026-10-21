import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/v2/layout/header"
import { AnnouncementBar } from "@/components/v2/layout/announcement-bar"
import { BenefitFader } from "@/components/v2/layout/benefit-fader"
import { Hero } from "@/components/v2/sections/hero"
import { SmashSequence } from "@/components/v2/sections/smash-sequence"
import { Quality } from "@/components/v2/sections/quality"
import { BoxComparison } from "@/components/v2/sections/box-comparison"
import { Offer } from "@/components/v2/sections/offer"
import { Founder } from "@/components/v2/sections/founder"
import { Footer } from "@/components/v2/layout/footer"
import { ScrollRestoration } from "@/components/utils/scroll-restoration"
import { ExploreLinks } from "@/components/seo/explore-links"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  title: "Wonderade: Kids' Juice Box With 8g Protein and 3g Sugar",
  description:
    "The juice you wish you had when you were growing up. A kids' juice box with 8g protein, 3g sugar (0g added), 4g fiber and real fruit. Major Orange and Princess Punch.",
  path: "/",
  absoluteTitle: true,
})

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white font-sans">
      <ScrollRestoration />
      <BenefitFader />
      <Header />
      <Hero />
      <AnnouncementBar />
      <SmashSequence />
      <Quality />
      {/* <BoxComparison /> */}
      <Founder />
      <Offer />
      <ExploreLinks />
      <Footer />
    </main>
  )
}
