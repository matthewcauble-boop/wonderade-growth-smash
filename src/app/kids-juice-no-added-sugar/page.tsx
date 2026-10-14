import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, FaqList, ProductCta, TextLink, DataTable } from "@/components/seo/page-parts"
import { DrinksTable } from "@/components/seo/drinks-table"
import { GuideSources } from "@/components/seo/guide-sources"
import { GUIDANCE, FDC_URL } from "@/lib/drinks"
import { articleJsonLd, faqJsonLd, pageMeta } from "@/lib/site"

const PATH = "/kids-juice-no-added-sugar"
const TITLE = "Kids' Juice With No Added Sugar: What the Label Really Means"
const DESC =
    "\"No added sugar\", \"unsweetened\" and \"sugar free\" mean different things. The FDA rules in plain English, why 100% juice can still be high in sugar, and a label checklist."

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: "article" })

const FAQ = [
    {
        question: "What does no added sugar mean on juice?",
        answer: "No sugar or sugar-containing ingredient, including juice concentrate used as a sweetener, was added during processing. The fruit's own sugar is still there and still counts in Total Sugars.",
    },
    {
        question: "Is no added sugar the same as sugar free?",
        answer: "No. Under FDA rules, sugar free means less than 0.5 grams of sugar per serving. A no-added-sugar juice can still have 20 grams or more.",
    },
    {
        question: "Does 100% juice have added sugar?",
        answer: "Not by definition, but it has plenty of natural sugar: about 24 grams in 8.4 fl oz of apple juice and about 35 grams in grape juice, per USDA data.",
    },
    {
        question: "Does Wonderade have added sugar?",
        answer: "No. Wonderade has 0 grams of added sugar and 3 grams of total sugar per box. It has no artificial sweeteners.",
    },
]

export default function NoAddedSugarPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={[articleJsonLd({ headline: TITLE, description: DESC, path: PATH, date: "2026-10-14" }), faqJsonLd(FAQ)]} />
                <PageHero
                    crumbs={[{ name: "Guides", path: "/blog" }, { name: "No added sugar", path: PATH }]}
                    eyebrow="Guide"
                    title={TITLE}
                    lede={
                        <p>
                            &quot;No added sugar&quot; is a legal phrase with a narrow meaning. It tells you what went into the box
                            during processing, not how much sugar ends up in it. Here is what the common label words mean and how
                            to compare boxes in ten seconds.
                        </p>
                    }
                />

                <Section>
                    <H2>Label words, decoded</H2>
                    <DataTable
                        caption="What sugar claims on a juice label mean"
                        head={["On the label", "What it means", "What it doesn't mean"]}
                        rows={[
                            ["No added sugar / No sugar added", "No sugar, syrup, honey or juice concentrate was added as a sweetener during processing.", "Low in sugar. The fruit's own sugar remains."],
                            ["Sugar free", "Less than 0.5 g of sugar per serving (FDA definition).", "Free of sweeteners. Non-sugar sweeteners may be used."],
                            ["100% juice", "All of the drink is juice (it may be from concentrate).", "Low in sugar. 100% apple juice has about 24 g per 8.4 fl oz."],
                            ["Juice drink / juice beverage", "Contains some juice, plus water and usually other ingredients.", "Anything about sugar. Check the panel."],
                            ["Includes Added Sugars (panel line)", "Grams of sugar added during processing, including excess sugar from juice concentrates.", "Total sugar. That is the line above it."],
                        ]}
                        note="Definitions summarized from 21 CFR 101.60 and the FDA's Added Sugars guidance, linked below."
                    />
                </Section>

                <Section tone="cream">
                    <H2>The concentrate rule</H2>
                    <p className="mt-3 text-lg">{GUIDANCE.fdaNoAddedSugar.text}</p>
                    <p className="mt-3 text-lg">{GUIDANCE.fdaAddedSugar.text}</p>
                    <p className="mt-3 text-lg">
                        In practice: a juice sweetened with extra apple or grape concentrate shows that sugar on the Added Sugars
                        line. For the longer version, read{" "}
                        <TextLink href="/blog/no-added-sugar-juice-boxes">Juice boxes with no added sugar: what it really means</TextLink>.
                    </p>
                </Section>

                <Section>
                    <H2>No added sugar, compared</H2>
                    <p className="mt-3 text-lg">
                        Several drinks below have 0 grams of added sugar. Their total sugar still ranges from 0 to about 35 grams.
                    </p>
                    <DrinksTable caption="Added vs total sugar per 8.4 fl oz" cols={["addedSugar", "sugar", "calories"]} />
                </Section>

                <Section tone="cream">
                    <H2>A ten-second label check</H2>
                    <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg">
                        <li>Find <strong>Total Sugars</strong>. Divide by 4 for teaspoons.</li>
                        <li>Find <strong>Includes Added Sugars</strong> right under it.</li>
                        <li>Check the <strong>serving size</strong> matches the whole box.</li>
                        <li>Scan the ingredients for <strong>concentrates, syrups and sweeteners</strong> if either number surprises you.</li>
                        <li>Compare with the guidance: {GUIDANCE.ahaSugar.text}</li>
                    </ol>
                </Section>

                <Section>
                    <H2>Questions parents ask</H2>
                    <FaqList items={FAQ} />
                    <p className="mt-6 text-lg">
                        Related: <TextLink href="/juice-box-sugar">sugar in juice boxes, compared</TextLink>,{" "}
                        <TextLink href="/nutrition">Wonderade nutrition facts</TextLink> and{" "}
                        <TextLink href="/faq">the Wonderade FAQ</TextLink>.
                    </p>
                </Section>

                <Section tone="cream">
                    <H2>Sources</H2>
                    <GuideSources
                        items={[
                            GUIDANCE.fdaNoAddedSugar,
                            GUIDANCE.fdaAddedSugar,
                            GUIDANCE.ahaSugar,
                            { source: "USDA FoodData Central (drink nutrient values; FDC IDs in the table)", url: FDC_URL },
                        ]}
                    />
                </Section>

                <ProductCta />
            </main>
            <Footer />
        </>
    )
}
