import Link from "next/link"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { Founder } from "@/components/v2/sections/founder"
import { JsonLd } from "@/components/seo/json-ld"
import { FLAVORS, SITE, YOUTUBE, breadcrumbJsonLd, pageMeta } from "@/lib/site"

// The entity page: who makes Wonderade, where, and the official links. Brand-name searches and AI answers lean on it.
export const metadata = pageMeta({
    title: "About Wonderade: The Kids' Protein Juice Box From Austin, Texas",
    description:
        "Wonderade is a kids' juice box with 8 g protein, 3 g sugar and 4 g fiber, founded in Austin, Texas by Matt Cauble, a dad who launched Soylent and Kin before Wonderade. The company, the characters and the official channels.",
    path: "/about",
})

export default function AboutPage() {
    const aboutPage = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        url: `${SITE}/about`,
        name: "About Wonderade",
        about: { "@id": `${SITE}/#organization` },
    }
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={[aboutPage, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
                <section className="border-b-2 border-[#374191] bg-[#FBD02E] px-4 py-12 md:px-8 md:py-16">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="font-display text-4xl font-extrabold leading-tight text-[#374191] md:text-6xl">About Wonderade</h1>
                        <p className="mt-4 text-lg text-[#374191]">
                            Wonderade is a juice box for growing kids: real fruit, 8 grams of protein, 3 grams of sugar with none
                            added, and 4 grams of fiber. Kids think it&apos;s a treat. Grown-ups know it&apos;s more.
                        </p>
                    </div>
                </section>

                <Founder />

                <section className="px-4 py-12 md:px-8">
                    <div className="mx-auto max-w-3xl space-y-10 text-lg">
                        <div>
                            <h2 className="font-display text-3xl font-extrabold text-[#374191]">The facts</h2>
                            <ul className="mt-3 list-disc space-y-1 pl-6">
                                <li>Company: Wonderade Corporation, founded in 2025, based in Austin, Texas</li>
                                <li>Founder: Matt Cauble, a dad who launched Soylent and Kin before Wonderade</li>
                                <li>Incorporated: September 12, 2025 (Delaware)</li>
                                <li>
                                    Product: kids&apos; juice boxes in two flavors,{" "}
                                    {FLAVORS.map((f, i) => (
                                        <span key={f.slug}>
                                            {i > 0 && " and "}
                                            <Link className="font-bold text-[#EF4B61] underline" href={`/flavors/${f.slug}`}>{f.name}</Link>
                                        </span>
                                    ))}
                                </li>
                                <li>
                                    Nutrition per box: 70 calories, 8 g protein, 3 g total sugar (0 g added), 4 g fiber.{" "}
                                    <Link className="font-bold text-[#EF4B61] underline" href="/nutrition">Full nutrition facts</Link>
                                </li>
                                <li>Status: pre-launch; founding families can <Link className="font-bold text-[#EF4B61] underline" href="/claim">claim a free sample</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-display text-3xl font-extrabold text-[#374191]">Meet the characters</h2>
                            <p className="mt-3">
                                <strong>Major Orange</strong> is a muscly cartoon orange and the face of the orange flavor.{" "}
                                <strong>Princess Punch</strong> is a unicorn with boxing gloves and the face of the fruit punch flavor.{" "}
                                <strong>Pip</strong> is the little star that lives in the O of the Wonderade logo. Together they star in{" "}
                                <Link className="font-bold text-[#EF4B61] underline" href="/food-stories">Food Stories</Link>, short, sourced videos about
                                where foods come from and how they work.{" "}
                                <Link className="font-bold text-[#EF4B61] underline" href="/characters">Meet the characters</Link>.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-display text-3xl font-extrabold text-[#374191]">Find us</h2>
                            <ul className="mt-3 list-disc space-y-1 pl-6">
                                <li>YouTube: <a className="font-bold text-[#EF4B61] underline" href={YOUTUBE} rel="me noopener">@wonderadeusa</a></li>
                                <li>The Wonderade Punch List, family weekend plans for 50 US cities: <a className="font-bold text-[#EF4B61] underline" href="https://punchlist.wonderade.us/">punchlist.wonderade.us</a> (<Link className="font-bold text-[#EF4B61] underline" href="/punch-list">all 50 cities</Link>)</li>
                                <li>Food Stories hub: <Link className="font-bold text-[#EF4B61] underline" href="/food-stories">wonderade.us/food-stories</Link></li>
                                <li>Questions: <Link className="font-bold text-[#EF4B61] underline" href="/faq">FAQ</Link> or <Link className="font-bold text-[#EF4B61] underline" href="/contact">contact us</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
