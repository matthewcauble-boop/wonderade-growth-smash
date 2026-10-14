import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { NutritionTable, JuiceComparisonTable } from "@/components/seo/nutrition-table"
import {
    FLAVORS,
    CLEAN_LABEL,
    PRODUCT_FAQ,
    productJsonLd,
    breadcrumbJsonLd,
    pageMeta,
} from "@/lib/site"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
    return FLAVORS.map((f) => ({ slug: f.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params
    const f = FLAVORS.find((x) => x.slug === slug)
    if (!f) return {}
    const title = `${f.name} Kids' Juice Box: 8g Protein, 3g Sugar`
    const description = `${f.name} by Wonderade: a ${f.short.toLowerCase()} juice box for kids with 8 g protein, 3 g sugar (0 g added), 4 g fiber, and no dairy.`
    return pageMeta({
        title,
        description,
        path: `/flavors/${f.slug}`,
        image: { url: f.image, alt: f.imageAlt },
    })
}

export default async function FlavorPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params
    const f = FLAVORS.find((x) => x.slug === slug)
    if (!f) notFound()
    const other = FLAVORS.find((x) => x.slug !== f.slug)!

    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd
                    data={[
                        productJsonLd(f),
                        breadcrumbJsonLd([
                            { name: "Home", path: "/" },
                            { name: "Flavors", path: "/flavors" },
                            { name: f.name, path: `/flavors/${f.slug}` },
                        ]),
                    ]}
                />

                <section className="border-b-2 border-[#374191] bg-[#FBD02E] px-4 py-12 md:px-8 md:py-16">
                    <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1fr_280px]">
                        <div>
                            <nav aria-label="Breadcrumb" className="font-mono text-xs font-bold uppercase tracking-widest text-[#374191]">
                                <Link href="/" className="hover:text-[#EF4B61]">Home</Link>
                                <span className="mx-2">/</span>
                                <Link href="/flavors" className="hover:text-[#EF4B61]">Flavors</Link>
                                <span className="mx-2">/</span>
                                <span>{f.name}</span>
                            </nav>
                            <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-[#374191] md:text-6xl">
                                Wonderade {f.name}
                            </h1>
                            <p className="mt-2 font-display text-xl font-bold text-[#374191]">
                                {f.short} juice box for kids. 8g protein. 3g sugar. Real fruit.
                            </p>
                            <p className="mt-4 max-w-xl text-lg text-[#374191]">{f.description}</p>
                            <Link
                                href="/claim"
                                className="mt-6 inline-block border-2 border-[#374191] bg-[#374191] px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#374191]"
                            >
                                Claim your free sample
                            </Link>
                        </div>
                        <div className="relative mx-auto h-[360px] w-[150px] md:h-[440px] md:w-[180px]">
                            <Image src={f.image} alt={f.imageAlt} fill sizes="180px" className="object-contain" priority />
                        </div>
                    </div>
                </section>

                <section className="px-4 py-12 md:px-8">
                    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
                        <div>
                            <h2 className="font-display text-3xl font-extrabold text-[#374191]">What it tastes like</h2>
                            <p className="mt-3 text-lg">{f.taste}</p>

                            <h2 className="mt-10 font-display text-3xl font-extrabold text-[#374191]">What&apos;s in every box</h2>
                            <ul className="mt-3 list-disc space-y-1 pl-6 text-lg">
                                <li><strong>8 g protein</strong> from pea protein</li>
                                <li><strong>3 g total sugar, 0 g added sugar</strong></li>
                                <li><strong>4 g fiber</strong></li>
                                <li><strong>80% DV vitamin C</strong>, 25% DV calcium, 15% DV vitamin D</li>
                                <li><strong>70 calories</strong></li>
                            </ul>
                            <h3 className="mt-6 font-display text-xl font-extrabold text-[#374191]">Clean label</h3>
                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                {CLEAN_LABEL.map((c) => <li key={c}>{c}</li>)}
                            </ul>
                            <p className="mt-6">
                                Also try <Link className="font-bold text-[#EF4B61] underline" href={`/flavors/${other.slug}`}>{other.name}</Link>, or
                                see <Link className="font-bold text-[#EF4B61] underline" href="/nutrition">the full nutrition facts</Link>.
                            </p>
                        </div>
                        <div>
                            <NutritionTable />
                        </div>
                    </div>
                </section>

                <section className="border-t-2 border-[#374191] px-4 py-12 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <JuiceComparisonTable />
                    </div>
                </section>

                <section className="border-t-2 border-[#374191] bg-[#F8F2D0] px-4 py-12 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="font-display text-3xl font-extrabold text-[#374191]">Questions parents ask</h2>
                        <dl className="mt-6 space-y-6">
                            {PRODUCT_FAQ.map((q) => (
                                <div key={q.question}>
                                    <dt className="font-display text-xl font-bold text-[#374191]">{q.question}</dt>
                                    <dd className="mt-1 text-lg">{q.answer}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-8">
                            More reading: <Link className="font-bold text-[#EF4B61] underline" href="/blog/how-much-sugar-in-a-juice-box">How much sugar is in a juice box?</Link>{" "}
                            and <Link className="font-bold text-[#EF4B61] underline" href="/blog/protein-drinks-for-kids">Protein drinks for kids</Link>.
                            Comparing boxes? See <Link className="font-bold text-[#EF4B61] underline" href="/protein-juice-box">what a protein juice box is</Link>,{" "}
                            <Link className="font-bold text-[#EF4B61] underline" href="/juice-box-sugar">sugar in juice boxes</Link> and the{" "}
                            <Link className="font-bold text-[#EF4B61] underline" href="/faq">FAQ</Link>. Meet the{" "}
                            <Link className="font-bold text-[#EF4B61] underline" href="/characters#major-orange">characters</Link> behind the boxes.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
