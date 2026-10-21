import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, FaqList, ProductCta, TextLink, DataTable } from "@/components/seo/page-parts"
import { DrinksTable } from "@/components/seo/drinks-table"
import { GuideSources } from "@/components/seo/guide-sources"
import { GUIDANCE, FDC_URL } from "@/lib/drinks"
import { SITE, LOGO, faqJsonLd, pageMeta } from "@/lib/site"

const PATH = "/protein-juice-box"
const TITLE = "Protein Juice Box: What It Is and How It Compares"
const DESC =
    "What a protein juice box is, how much protein kids need by age, where the protein comes from, and how protein compares across juice, milk and other kids' drinks per serving."

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: "article" })

const FAQ = [
    {
        question: "What is a protein juice box?",
        answer: "A single-serve, shelf-stable juice box that has protein added, usually from milk proteins or plant proteins like pea. Most regular juice boxes have less than 1 gram of protein.",
    },
    {
        question: "How much protein does a child need a day?",
        answer: "The Recommended Dietary Allowance is 13 g a day for ages 1 to 3, 19 g for ages 4 to 8, and 34 g for ages 9 to 13. Most of it should come from regular meals and snacks.",
    },
    {
        question: "Is a protein juice box the same as a protein shake?",
        answer: "No. A protein shake is usually thick and milk-based. A protein juice box drinks like juice, straight from the box, with protein mixed in.",
    },
    {
        question: "How much protein is in Wonderade?",
        answer: "8 grams per 8.4 fl oz box, from pea protein, with 3 g of total sugar and 0 g added sugar.",
    },
]

export default function ProteinJuiceBoxPage() {
    const article = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: TITLE,
        description: DESC,
        datePublished: "2026-10-14",
        dateModified: "2026-10-14",
        author: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Wonderade" },
        publisher: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Wonderade", logo: { "@type": "ImageObject", url: LOGO } },
        mainEntityOfPage: `${SITE}${PATH}`,
        image: [`${SITE}/og.png`],
    }
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={[article, faqJsonLd(FAQ)]} />
                <PageHero
                    crumbs={[{ name: "Guides", path: "/blog" }, { name: "Protein juice box", path: PATH }]}
                    eyebrow="Guide"
                    title={TITLE}
                    lede={
                        <p>
                            A protein juice box is a regular-size juice box with protein mixed in. Here is how much protein kids
                            actually need, where the protein in a drink comes from, and how the common lunchbox drinks compare,
                            per serving, with the sources.
                        </p>
                    }
                />

                <Section>
                    <H2>What counts as a protein juice box</H2>
                    <p className="mt-3 text-lg">
                        Most juice boxes are juice, water and sometimes sugar. They carry almost no protein: 100% apple juice
                        has less than 1 gram in an 8.4 fl oz serving, according to USDA FoodData Central. A protein juice box
                        adds a protein ingredient so the box carries a few grams or more, while still drinking like juice.
                    </p>
                    <p className="mt-3 text-lg">The protein usually comes from one of two places:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-6 text-lg">
                        <li><strong>Milk proteins</strong> such as whey, which means the drink contains dairy.</li>
                        <li><strong>Plant proteins</strong> such as pea protein, which keep the drink dairy free.</li>
                    </ul>
                    <p className="mt-3 text-lg">
                        Wonderade uses pea protein: 8 grams per box, with no dairy. See the{" "}
                        <TextLink href="/nutrition">full nutrition facts</TextLink>.
                    </p>
                </Section>

                <Section tone="cream">
                    <H2>How much protein kids need</H2>
                    <p className="mt-3 text-lg">{GUIDANCE.proteinRda.text}</p>
                    <DataTable
                        caption="Protein RDA by age, and what one 8 g serving covers"
                        head={["Age", "Protein a day (RDA)", "8 g is about"]}
                        rows={[
                            ["1 to 3 years", "13 g", "about 60% of the day"],
                            ["4 to 8 years", "19 g", "about 40% of the day"],
                            ["9 to 13 years", "34 g", "about 25% of the day"],
                        ]}
                        note="Percentages are simple math on the RDA (8 divided by 13, 19 and 34), rounded. Many kids already meet the RDA from meals; a drink is one small part of the day."
                    />
                    <p className="mt-4 text-lg">
                        Protein needs scale with body weight, and most kids who eat a mix of foods get enough. A protein drink
                        is more useful for the kid who skips milk, eats like a bird at lunch, or comes home hungry. For more
                        on that, read <TextLink href="/blog/protein-drinks-for-kids">Protein drinks for kids: what parents should
                        know</TextLink> and <TextLink href="/blog/kid-wont-drink-milk">My kid won&apos;t drink milk</TextLink>.
                    </p>
                </Section>

                <Section>
                    <H2>Protein in kids&apos; drinks, compared</H2>
                    <p className="mt-3 text-lg">
                        Same serving for every drink: 8.4 fl oz, the size of one Wonderade box. Milk is the classic protein
                        drink, at about 8 grams a serving. Juice and fruit punch have close to none.
                    </p>
                    <DrinksTable caption="Protein, sugar and calcium per 8.4 fl oz" cols={["protein", "sugar", "addedSugar", "calcium"]} includeWater={false} />
                </Section>

                <Section tone="cream">
                    <H2>What to check on the label</H2>
                    <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg">
                        <li><strong>Protein per box.</strong> Look at grams, not the front-of-pack wording.</li>
                        <li><strong>Total sugars and added sugars.</strong> Protein doesn&apos;t cancel out sugar. Check the &quot;Includes Added Sugars&quot; line.</li>
                        <li><strong>Protein source.</strong> Milk proteins mean dairy. Pea, soy or other plant proteins matter if your kid has an allergy.</li>
                        <li><strong>Serving size.</strong> Compare per box, and make sure the box is one serving.</li>
                        <li><strong>Who it&apos;s for.</strong> Many protein shakes are built for adults, with far more protein per bottle than a kid needs at once. Pick one sized for a kid.</li>
                    </ol>
                </Section>

                <Section>
                    <H2>Questions parents ask</H2>
                    <FaqList items={FAQ} />
                    <p className="mt-6 text-lg">
                        Related: <TextLink href="/juice-box-sugar">sugar in juice boxes, compared</TextLink>,{" "}
                        <TextLink href="/lunchbox-drinks">lunchbox drinks, compared</TextLink> and{" "}
                        <TextLink href="/flavors">the Wonderade flavors</TextLink>.
                    </p>
                </Section>

                <Section tone="cream">
                    <H2>Sources</H2>
                    <GuideSources
                        items={[
                            GUIDANCE.proteinRda,
                            { source: "USDA FoodData Central (drink nutrient values; FDC IDs in the table)", url: FDC_URL },
                            GUIDANCE.fdaAddedSugar,
                        ]}
                    />
                </Section>

                <ProductCta />
            </main>
            <Footer />
        </>
    )
}
