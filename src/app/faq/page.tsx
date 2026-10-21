import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, FaqList, ProductCta, TextLink } from "@/components/seo/page-parts"
import { PRODUCT_FAQ, faqJsonLd, pageMeta } from "@/lib/site"

export const metadata = pageMeta({
    title: "Wonderade FAQ: Sugar, Protein, Ingredients and Availability",
    description:
        "Answers about Wonderade: 3 g sugar with 0 g added, 8 g pea protein, 4 g fiber, no dairy, the two flavors, box size, who it's for, and how to get a sample before launch.",
    path: "/faq",
})

const GROUPS: { heading: string; items: { question: string; answer: string }[] }[] = [
    {
        heading: "The basics",
        items: [
            {
                question: "What is Wonderade?",
                answer: "Wonderade is a kids' juice box made with real fruit, with 8 grams of protein, 3 grams of total sugar (0 grams added) and 4 grams of fiber per box. It comes in two flavors, Major Orange and Princess Punch.",
            },
            {
                question: "How big is a box?",
                answer: "One box is one serving: 8.4 fl oz (248 mL). It is made to drink straight from the box.",
            },
            {
                question: "What flavors are there?",
                answer: "Major Orange (orange) and Princess Punch (fruit punch). Both have the same nutrition.",
            },
            {
                question: "Who makes Wonderade?",
                answer: "Wonderade Corporation, founded in 2025 and based in Austin, Texas, by founder Matt Cauble.",
            },
        ],
    },
    {
        heading: "Nutrition and ingredients",
        items: [
            ...PRODUCT_FAQ.filter((q) => !q.question.startsWith("Where can I buy")),
            {
                question: "How many calories are in a box?",
                answer: "70 calories per box.",
            },
            {
                question: "What vitamins and minerals does it have?",
                answer: "Per box: 80% DV vitamin C, 25% DV calcium, 15% DV vitamin D, 15% DV vitamin A, 50% DV vitamin B12, 30% DV riboflavin, 20% DV phosphorus, 10% DV potassium and 8% DV magnesium, plus 3 mg of zinc.",
            },
        ],
    },
    {
        heading: "Buying and samples",
        items: [
            ...PRODUCT_FAQ.filter((q) => q.question.startsWith("Where can I buy")),
            {
                question: "Is Wonderade sold in stores?",
                answer: "Not yet. Wonderade is in pre-launch. Join the founding families list at wonderade.us/claim to hear first.",
            },
        ],
    },
]

export default function FaqPage() {
    const all = GROUPS.flatMap((g) => g.items)
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={faqJsonLd(all)} />
                <PageHero
                    crumbs={[{ name: "FAQ", path: "/faq" }]}
                    title="Wonderade FAQ"
                    lede={
                        <p>
                            Straight answers about what is in the box. For the full panel, see the{" "}
                            <TextLink href="/nutrition">nutrition facts</TextLink>.
                        </p>
                    }
                />
                {GROUPS.map((g, i) => (
                    <Section key={g.heading} tone={i % 2 ? "cream" : "white"}>
                        <H2>{g.heading}</H2>
                        <FaqList items={g.items} />
                    </Section>
                ))}
                <Section>
                    <H2>More reading</H2>
                    <ul className="mt-3 list-disc space-y-1 pl-6 text-lg">
                        <li><TextLink href="/protein-juice-box">What is a protein juice box?</TextLink></li>
                        <li><TextLink href="/juice-box-sugar">Sugar in juice boxes, compared</TextLink></li>
                        <li><TextLink href="/kids-juice-no-added-sugar">What &quot;no added sugar&quot; means</TextLink></li>
                        <li><TextLink href="/lunchbox-drinks">Lunchbox drinks, compared</TextLink></li>
                        <li><TextLink href="/contact">Still have a question? Contact us</TextLink></li>
                    </ul>
                </Section>
                <ProductCta />
            </main>
            <Footer />
        </>
    )
}
