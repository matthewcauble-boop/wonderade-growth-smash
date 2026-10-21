import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { FLAVORS, SITE, breadcrumbJsonLd, pageMeta } from "@/lib/site"

export const metadata = pageMeta({
    title: "Flavors: Major Orange and Princess Punch Protein Juice Boxes",
    description:
        "Two Wonderade flavors, one recipe for growing kids: 8 g protein, 3 g sugar (0 g added), 4 g fiber, real fruit. Meet Major Orange and Princess Punch.",
    path: "/flavors",
})

export default function FlavorsIndex() {
    const list = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: FLAVORS.map((f, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}/flavors/${f.slug}`,
            name: `Wonderade ${f.name}`,
        })),
    }
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={[list, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Flavors", path: "/flavors" }])]} />
                <section className="border-b-2 border-[#374191] bg-[#FBD02E] px-4 py-12 md:px-8 md:py-16">
                    <div className="mx-auto max-w-5xl">
                        <h1 className="font-display text-4xl font-extrabold leading-tight text-[#374191] md:text-6xl">Flavors</h1>
                        <p className="mt-4 max-w-xl text-lg text-[#374191]">
                            Kids think it&apos;s a treat. Grown-ups know it&apos;s more. Same nutrition in both boxes: 8 g protein,
                            3 g sugar with none added, 4 g fiber.
                        </p>
                    </div>
                </section>
                <section className="px-4 py-12 md:px-8">
                    <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
                        {FLAVORS.map((f) => (
                            <Link
                                key={f.slug}
                                href={`/flavors/${f.slug}`}
                                className="group flex flex-col items-center rounded-xl border-2 border-[#374191] p-6 shadow-[6px_6px_0px_#374191] transition-transform hover:-translate-y-1"
                            >
                                <div className="relative h-[320px] w-[130px]">
                                    <Image src={f.image} alt={f.imageAlt} fill sizes="130px" className="object-contain" />
                                </div>
                                <h2 className="mt-4 font-display text-3xl font-extrabold text-[#374191] group-hover:text-[#EF4B61]">{f.name}</h2>
                                <p className="mt-1 text-center">{f.short} juice box. 8g protein, 3g sugar.</p>
                            </Link>
                        ))}
                    </div>
                    <p className="mx-auto mt-10 max-w-5xl text-center">
                        <Link className="font-bold text-[#EF4B61] underline" href="/nutrition">Full nutrition facts and comparison</Link>
                        {" · "}
                        <Link className="font-bold text-[#EF4B61] underline" href="/characters">Meet the characters</Link>
                        {" · "}
                        <Link className="font-bold text-[#EF4B61] underline" href="/lunchbox-drinks">Lunchbox drinks, compared</Link>
                    </p>
                </section>
            </main>
            <Footer />
        </>
    )
}
