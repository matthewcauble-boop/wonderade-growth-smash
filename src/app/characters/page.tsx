import Image from "next/image"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, TextLink } from "@/components/seo/page-parts"
import { CHARACTERS, FLAVORS, SITE, pageMeta } from "@/lib/site"
import { PRODUCT_SAFE_EPISODES } from "@/lib/food-stories"

export const metadata = pageMeta({
    title: "Meet the Wonderade Characters: Major Orange, Princess Punch and Pip",
    description:
        "Major Orange, Princess Punch and Pip are the Wonderade characters. Who they are, which juice box each one stars on, and where to watch them in Food Stories.",
    path: "/characters",
    image: { url: "/characters/major-orange.png", alt: "Major Orange, the Wonderade character" },
})

export default function CharactersPage() {
    const list = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Wonderade characters",
        itemListElement: CHARACTERS.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "Thing",
                "@id": `${SITE}/characters#${c.slug}`,
                name: c.name,
                description: c.description,
                image: `${SITE}${c.image}`,
            },
        })),
    }
    const featured = PRODUCT_SAFE_EPISODES.slice(0, 4)
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={list} />
                <PageHero
                    crumbs={[{ name: "Characters", path: "/characters" }]}
                    title="Meet the Wonderade characters"
                    lede={
                        <p>
                            Three characters live on and around the Wonderade box: Major Orange, Princess Punch and Pip. Kids
                            think it&apos;s a treat. Grown-ups know it&apos;s more.
                        </p>
                    }
                />

                {CHARACTERS.map((c, i) => {
                    const flavor = c.flavor ? FLAVORS.find((f) => f.slug === c.flavor) : undefined
                    return (
                        <Section key={c.slug} id={c.slug} tone={i % 2 ? "cream" : "white"}>
                            <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
                                <div className="relative mx-auto h-[240px] w-[200px]">
                                    <Image src={c.image} alt={c.imageAlt} fill sizes="200px" className="object-contain" />
                                </div>
                                <div>
                                    <H2>{c.name}</H2>
                                    <p className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/70">{c.role}</p>
                                    <p className="mt-3 text-lg">{c.description}</p>
                                    {flavor && (
                                        <p className="mt-3 text-lg">
                                            See the box: <TextLink href={`/flavors/${flavor.slug}`}>Wonderade {flavor.name}</TextLink>.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Section>
                    )
                })}

                <Section>
                    <H2>Watch them in Food Stories</H2>
                    <p className="mt-3 text-lg">
                        Major Orange and Princess Punch host Food Stories, short sourced videos about where foods come from.
                        A few to start with:
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-6 text-lg">
                        {featured.map((e) => (
                            <li key={e.slug}>
                                <TextLink href={`/food-stories/${e.slug}`}>{e.title}</TextLink>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-lg">
                        <TextLink href="/food-stories">All Food Stories</TextLink> · <TextLink href="/about">About Wonderade</TextLink>
                    </p>
                </Section>
            </main>
            <Footer />
        </>
    )
}
