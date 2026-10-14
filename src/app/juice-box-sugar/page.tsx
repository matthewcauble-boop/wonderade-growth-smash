import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, FaqList, ProductCta, TextLink, DataTable } from "@/components/seo/page-parts"
import { DrinksTable } from "@/components/seo/drinks-table"
import { GuideSources } from "@/components/seo/guide-sources"
import { GUIDANCE, FDC_URL } from "@/lib/drinks"
import { articleJsonLd, faqJsonLd, pageMeta } from "@/lib/site"

const PATH = "/juice-box-sugar"
const TITLE = "Juice Box Sugar: How Much Sugar Is in Kids' Drinks, Compared"
const DESC =
    "Sugar per 8.4 fl oz in apple juice, grape juice, fruit punch, milk, chocolate milk and more, in grams and teaspoons, next to the AAP and AHA guidance for kids."

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: "article" })

const FAQ = [
    {
        question: "How much sugar is in a typical juice box?",
        answer: "A 100% apple juice serving of 8.4 fl oz has about 24 grams of sugar (USDA). Grape juice has about 35 grams. Fruit punch drinks land around 28 grams, most of it added.",
    },
    {
        question: "Does sugar in 100% juice count as added sugar?",
        answer: "No. Sugar naturally in 100% juice is not added sugar on the label. It still counts in Total Sugars, and the AAP still limits juice by age.",
    },
    {
        question: "How many teaspoons of sugar are in a juice box?",
        answer: "One teaspoon of sugar is about 4 grams, so 24 grams is about 6 teaspoons. Check the Total Sugars line on the box and divide by 4.",
    },
    {
        question: "How much sugar is in Wonderade?",
        answer: "3 grams of total sugar per 8.4 fl oz box, with 0 grams added.",
    },
]

export default function JuiceBoxSugarPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={[articleJsonLd({ headline: TITLE, description: DESC, path: PATH, date: "2026-10-14" }), faqJsonLd(FAQ)]} />
                <PageHero
                    crumbs={[{ name: "Guides", path: "/blog" }, { name: "Juice box sugar", path: PATH }]}
                    eyebrow="Guide"
                    title={TITLE}
                    lede={
                        <p>
                            The quick way to compare kids&apos; drinks is the Total Sugars line, per serving. Below are the common
                            ones side by side at the same 8.4 fl oz serving, in grams and in teaspoons, with the guidance pediatric
                            and heart groups give for kids.
                        </p>
                    }
                />

                <Section>
                    <H2>Sugar per serving, side by side</H2>
                    <DrinksTable caption="Sugar per 8.4 fl oz serving" cols={["sugar", "addedSugar", "calories", "protein"]} />
                </Section>

                <Section tone="cream">
                    <H2>The same numbers in teaspoons</H2>
                    <p className="mt-3 text-lg">
                        A teaspoon of granulated sugar weighs about 4 grams. Dividing Total Sugars by 4 turns a label into
                        something you can picture.
                    </p>
                    <DataTable
                        caption="Total sugar in teaspoons, per 8.4 fl oz"
                        head={["Drink", "Total sugar", "About this many teaspoons"]}
                        rows={[
                            ["100% grape juice", "about 35 g", "9"],
                            ["Fruit punch drink", "about 28 g", "7"],
                            ["100% apple juice", "about 24 g", "6"],
                            ["Chocolate milk, reduced fat", "about 24 g", "6"],
                            ["2% milk", "about 13 g", "3"],
                            ["Wonderade", "3 g", "less than 1"],
                            ["Water", "0 g", "0"],
                        ]}
                        note="Grams divided by 4, rounded. Milk's sugar is lactose, which is naturally present, not added."
                    />
                </Section>

                <Section>
                    <H2>Total sugar vs added sugar</H2>
                    <p className="mt-3 text-lg">{GUIDANCE.fdaAddedSugar.text}</p>
                    <p className="mt-3 text-lg">
                        That is why a 100% juice box can say &quot;no added sugar&quot; and still carry 20-plus grams of sugar.
                        Both lines are worth reading. For a deeper walk through the label, see{" "}
                        <TextLink href="/blog/how-much-sugar-in-a-juice-box">How much sugar is actually in a juice box?</TextLink>{" "}
                        and <TextLink href="/kids-juice-no-added-sugar">what &quot;no added sugar&quot; means</TextLink>.
                    </p>
                </Section>

                <Section tone="cream">
                    <H2>What the guidance says</H2>
                    <ul className="mt-3 list-disc space-y-3 pl-6 text-lg">
                        <li><strong>Juice:</strong> {GUIDANCE.aapJuice.text}</li>
                        <li><strong>Added sugar:</strong> {GUIDANCE.ahaSugar.text}</li>
                    </ul>
                    <p className="mt-4 text-lg">
                        Water and plain milk are the everyday drinks. When a juice box is going in the lunchbox anyway, the label
                        tells you how much of the day&apos;s sugar comes with it.
                    </p>
                </Section>

                <Section>
                    <H2>Questions parents ask</H2>
                    <FaqList items={FAQ} />
                    <p className="mt-6 text-lg">
                        Related: <TextLink href="/lunchbox-drinks">lunchbox drinks, compared</TextLink>,{" "}
                        <TextLink href="/protein-juice-box">what is a protein juice box?</TextLink> and{" "}
                        <TextLink href="/nutrition">Wonderade nutrition facts</TextLink>. Curious why kids love sweet so much?
                        Watch the Food Story <TextLink href="/food-stories/why-do-kids-love-sweet">Why do kids love sweet?</TextLink>
                    </p>
                </Section>

                <Section tone="cream">
                    <H2>Sources</H2>
                    <GuideSources
                        items={[
                            { source: "USDA FoodData Central (drink nutrient values; FDC IDs in the table)", url: FDC_URL },
                            GUIDANCE.aapJuice,
                            GUIDANCE.ahaSugar,
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
