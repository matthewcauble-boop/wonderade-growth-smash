import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, FaqList, ProductCta, TextLink, DataTable } from "@/components/seo/page-parts"
import { DrinksTable } from "@/components/seo/drinks-table"
import { GuideSources } from "@/components/seo/guide-sources"
import { GUIDANCE, FDC_URL } from "@/lib/drinks"
import { articleJsonLd, faqJsonLd, pageMeta } from "@/lib/site"

const PATH = "/lunchbox-drinks"
const TITLE = "Lunchbox Drinks for Kids: Options Compared, Sugar to Shelf Life"
const DESC =
    "School lunch drink options side by side: water, milk, 100% juice, fruit punch, plant milk and protein juice boxes. Sugar, protein, and whether each one needs a fridge."

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: "article" })

const FAQ = [
    {
        question: "What is a good drink for a school lunchbox?",
        answer: "Water is the everyday pick, and plain milk is the classic. If you pack a juice box, compare Total Sugars and Added Sugars per box, and check whether it needs to stay cold.",
    },
    {
        question: "Do juice boxes need to be refrigerated?",
        answer: "Unopened shelf-stable boxes don't. They are filled aseptically so they keep at room temperature until opened. Many taste better cold, so a frozen box can double as an ice pack.",
    },
    {
        question: "Are shelf-stable milk boxes safe in a lunchbox?",
        answer: "Shelf-stable (UHT) milk boxes keep unopened at room temperature. Once opened, treat them like fresh milk. Regular fresh milk needs an ice pack.",
    },
    {
        question: "Is Wonderade shelf stable?",
        answer: "Wonderade comes in a single-serve 8.4 fl oz box made to drink straight from the box. Wonderade is in pre-launch; check the box for storage directions when it ships.",
    },
]

export default function LunchboxDrinksPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={[articleJsonLd({ headline: TITLE, description: DESC, path: PATH, date: "2026-10-14" }), faqJsonLd(FAQ)]} />
                <PageHero
                    crumbs={[{ name: "Guides", path: "/blog" }, { name: "Lunchbox drinks", path: PATH }]}
                    eyebrow="Guide"
                    title={TITLE}
                    lede={
                        <p>
                            A lunchbox drink has two jobs: get drunk, and survive until lunch. Here are the usual options compared
                            on both, with sugar and protein per serving and sources.
                        </p>
                    }
                />

                <Section>
                    <H2>The options at a glance</H2>
                    <DataTable
                        caption="Lunchbox drinks: storage and what you get"
                        head={["Drink", "Needs to stay cold?", "Worth knowing"]}
                        rows={[
                            ["Water", "No", "The everyday drink. Freeze a bottle overnight to keep the rest of lunch cool."],
                            ["Fresh milk", "Yes, pack an ice pack", "About 8 g protein and about 300 mg calcium per 8.4 fl oz."],
                            ["Shelf-stable milk box", "Not until opened", "Same nutrition as milk; UHT-processed so it keeps unopened."],
                            ["100% juice box", "Not until opened", "No added sugar, but about 24 g of sugar in apple juice. The AAP limits juice by age."],
                            ["Fruit punch drink", "Not until opened", "Usually most of the sugar is added. Check the Added Sugars line."],
                            ["Plant milk box", "Depends on the box", "Unsweetened almond milk is low in sugar and protein; many are fortified with calcium."],
                            ["Protein juice box", "Depends on the box", "Juice-style drink with added protein. Compare protein and sugar per box."],
                        ]}
                        note="Storage depends on the product. Follow the directions on the package."
                    />
                </Section>

                <Section tone="cream">
                    <H2>The numbers, per serving</H2>
                    <DrinksTable caption="Lunchbox drinks per 8.4 fl oz" cols={["sugar", "addedSugar", "protein", "calcium"]} />
                </Section>

                <Section>
                    <H2>Packing tips that work</H2>
                    <ul className="mt-3 list-disc space-y-2 pl-6 text-lg">
                        <li><strong>Freeze it.</strong> A frozen water bottle or juice box works as the ice pack and thaws by lunch.</li>
                        <li><strong>Check the straw.</strong> Little hands squeeze. A box that is easy to open means less comes home full.</li>
                        <li><strong>Count the day, not the box.</strong> {GUIDANCE.aapJuice.text}</li>
                        <li><strong>Read two lines.</strong> Total Sugars tells you how sweet it is. Includes Added Sugars tells you how much was put in.</li>
                        <li><strong>Do the empties audit.</strong> What comes home full is information. For picky drinkers, read{" "}
                            <TextLink href="/blog/lunchbox-drinks-for-picky-eaters">the best lunchbox drinks for picky eaters</TextLink>.</li>
                    </ul>
                </Section>

                <Section tone="cream">
                    <H2>Questions parents ask</H2>
                    <FaqList items={FAQ} />
                    <p className="mt-6 text-lg">
                        Related: <TextLink href="/juice-box-sugar">sugar in juice boxes, compared</TextLink>,{" "}
                        <TextLink href="/protein-juice-box">what is a protein juice box?</TextLink> and the Food Story about{" "}
                        <TextLink href="/food-stories/who-invented-the-juice-box">who invented the juice box</TextLink>.
                    </p>
                </Section>

                <Section>
                    <H2>Sources</H2>
                    <GuideSources
                        items={[
                            { source: "USDA FoodData Central (drink nutrient values; FDC IDs in the table)", url: FDC_URL },
                            GUIDANCE.aapJuice,
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
