import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, TextLink } from "@/components/seo/page-parts"
import { EPISODES, type EpisodeKind } from "@/lib/food-stories"
import { SITE, YOUTUBE, pageMeta } from "@/lib/site"

export const metadata = pageMeta({
    title: "Food Stories: Sourced Food Science and History for Families",
    description:
        "Short videos with Major Orange and Princess Punch about where foods come from and how they work: carrots, cilantro, brain freeze, bananas, vanilla, ketchup and more. Every fact sourced.",
    path: "/food-stories",
    image: { url: "/food-stories/04-bananas.jpg", width: 1280, height: 720, alt: "Major Orange and Princess Punch in a Food Stories episode about bananas" },
})

const KINDS: { kind: EpisodeKind; blurb: string }[] = [
    { kind: "Why does...?", blurb: "Food science questions kids actually ask." },
    { kind: "Ingredient origin", blurb: "Where a familiar food came from, and who figured it out." },
    { kind: "Food brand history", blurb: "The legend a famous food tells about itself, and what the record shows." },
]

export default function FoodStoriesHub() {
    const list = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Food Stories",
        url: `${SITE}/food-stories`,
        publisher: { "@id": `${SITE}/#organization` },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: EPISODES.map((e, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE}/food-stories/${e.slug}`,
                name: e.seoTitle,
            })),
        },
    }
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={list} />
                <PageHero
                    crumbs={[{ name: "Food Stories", path: "/food-stories" }]}
                    title="Food Stories"
                    lede={
                        <>
                            <p>
                                Short videos with Major Orange and Princess Punch about where foods come from and how they work.
                                Each one starts with a question, checks the popular story against the record, and lists its
                                sources. Every episode below has the full transcript, the sources, and notes on what we
                                simplified or left out.
                            </p>
                            <p className="mt-3">
                                New episodes go up on YouTube at{" "}
                                <a className="font-bold underline" href={YOUTUBE} rel="me noopener">@wonderadeusa</a>.
                            </p>
                        </>
                    }
                />

                {KINDS.map(({ kind, blurb }) => (
                    <Section key={kind}>
                        <H2>{kind}</H2>
                        <p className="mt-2 text-lg">{blurb}</p>
                        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                            {EPISODES.filter((e) => e.kind === kind).map((e) => (
                                <li key={e.slug}>
                                    <Link
                                        href={`/food-stories/${e.slug}`}
                                        className="group block overflow-hidden rounded-xl border-2 border-[#374191] shadow-[6px_6px_0px_#374191] transition-transform hover:-translate-y-1"
                                    >
                                        <Image
                                            src={e.poster}
                                            alt={`Food Stories episode ${Number(e.num)}: ${e.title}`}
                                            width={1280}
                                            height={720}
                                            sizes="(max-width: 640px) 92vw, 360px"
                                            className="h-auto w-full"
                                        />
                                        <div className="p-4">
                                            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/70">
                                                Episode {Number(e.num)}
                                                {e.youtubeId ? " · Watch now" : " · Video coming soon"}
                                            </p>
                                            <h3 className="mt-1 font-display text-xl font-extrabold text-[#374191] group-hover:text-[#EF4B61]">
                                                {e.title}
                                            </h3>
                                            <p className="mt-1 text-sm">{e.description}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Section>
                ))}

                <Section tone="cream">
                    <H2>How we make these</H2>
                    <p className="mt-3 text-lg">
                        Every factual line in an episode is checked against a primary or reputable source before it is
                        narrated: government agencies, peer-reviewed papers, museums, libraries and university archives.
                        When a popular story is disputed, the episode says so instead of presenting the legend as fact.
                        Brand names appear only as facts of history; none of the companies mentioned are partners of
                        Wonderade or endorse it.
                    </p>
                    <p className="mt-3 text-lg">
                        For questions about kids&apos; drinks, see our <TextLink href="/blog">parent guides</TextLink>.
                    </p>
                </Section>
            </main>
            <Footer />
        </>
    )
}
