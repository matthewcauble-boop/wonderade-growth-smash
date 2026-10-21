import Link from "next/link"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { NutritionTable, JuiceComparisonTable } from "@/components/seo/nutrition-table"
import { CLEAN_LABEL, FLAVORS, PRODUCT_FAQ, breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/site"

// A plain, citable fact page: the page AI answers and parents can quote. Numbers come from src/lib/site.ts.
export const metadata = pageMeta({
    title: "Wonderade Nutrition Facts: 8g Protein, 3g Sugar, 4g Fiber",
    description:
        "Full Wonderade nutrition facts per box: 70 calories, 8 g protein, 3 g total sugar (0 g added), 4 g fiber, 80% DV vitamin C, 25% DV calcium. Compared with apple juice.",
    path: "/nutrition",
})

export default function NutritionPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd
                    data={[
                        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Nutrition facts", path: "/nutrition" }]),
                        faqJsonLd(PRODUCT_FAQ),
                    ]}
                />
                <section className="border-b-2 border-[#374191] bg-[#FBD02E] px-4 py-12 md:px-8 md:py-16">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="font-display text-4xl font-extrabold leading-tight text-[#374191] md:text-6xl">
                            Wonderade nutrition facts
                        </h1>
                        <p className="mt-4 text-lg text-[#374191]">
                            One box of Wonderade has 70 calories, 8 grams of protein, 3 grams of total sugar with 0 grams added,
                            and 4 grams of fiber. Both flavors,{" "}
                            {FLAVORS.map((f, i) => (
                                <span key={f.slug}>
                                    {i > 0 && " and "}
                                    <Link className="font-bold underline" href={`/flavors/${f.slug}`}>{f.name}</Link>
                                </span>
                            ))}
                            , have the same nutrition.
                        </p>
                    </div>
                </section>

                <section className="px-4 py-12 md:px-8">
                    <div className="mx-auto max-w-3xl space-y-12">
                        <NutritionTable />

                        <div>
                            <h2 className="font-display text-3xl font-extrabold text-[#374191]">Clean label</h2>
                            <ul className="mt-3 list-disc space-y-1 pl-6 text-lg">
                                {CLEAN_LABEL.map((c) => <li key={c}>{c}</li>)}
                            </ul>
                        </div>

                        <JuiceComparisonTable />

                        <div>
                            <h2 className="font-display text-3xl font-extrabold text-[#374191]">Where a juice box fits</h2>
                            <p className="mt-3 text-lg">
                                Water and plain milk come first for kids. The American Academy of Pediatrics suggests no juice
                                before age 1, up to 4 oz a day for ages 1 to 3, 4 to 6 oz for ages 4 to 6, and up to 8 oz for ages
                                7 to 18 (<a className="underline" rel="noopener" href="https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Where-We-Stand-Fruit-Juice.aspx">HealthyChildren.org</a>).
                                Wonderade is built for the box a kid is going to drink anyway: less sugar, more protein and fiber.
                            </p>
                            <p className="mt-3 text-lg">
                                More side-by-side numbers:{" "}
                                <Link className="font-bold text-[#EF4B61] underline" href="/juice-box-sugar">sugar in juice boxes, compared</Link>,{" "}
                                <Link className="font-bold text-[#EF4B61] underline" href="/protein-juice-box">protein juice boxes</Link>,{" "}
                                <Link className="font-bold text-[#EF4B61] underline" href="/kids-juice-no-added-sugar">what &quot;no added sugar&quot; means</Link> and{" "}
                                <Link className="font-bold text-[#EF4B61] underline" href="/lunchbox-drinks">lunchbox drinks</Link>. Have another question? See the{" "}
                                <Link className="font-bold text-[#EF4B61] underline" href="/faq">FAQ</Link>.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-display text-3xl font-extrabold text-[#374191]">Questions parents ask</h2>
                            <dl className="mt-6 space-y-6">
                                {PRODUCT_FAQ.map((q) => (
                                    <div key={q.question}>
                                        <dt className="font-display text-xl font-bold text-[#374191]">{q.question}</dt>
                                        <dd className="mt-1 text-lg">{q.answer}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
