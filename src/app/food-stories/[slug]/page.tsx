import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, FaqList, ProductCta, TextLink } from "@/components/seo/page-parts"
import { EPISODES, getEpisode, relatedEpisodes } from "@/lib/food-stories"
import { SITE, LOGO, YOUTUBE, faqJsonLd, pageMeta } from "@/lib/site"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
    return EPISODES.map((e) => ({ slug: e.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const { slug } = await params
    const e = getEpisode(slug)
    if (!e) return {}
    return pageMeta({
        title: e.seoTitle,
        description: e.description,
        path: `/food-stories/${e.slug}`,
        type: "article",
        publishedTime: e.datePublished,
        image: { url: e.poster, width: 1280, height: 720, alt: `Major Orange and Princess Punch in "${e.title}"` },
    })
}

function isoDuration(s: number) {
    return `PT${Math.floor(s / 60)}M${s % 60}S`
}

export default async function EpisodePage({ params }: { params: Promise<Params> }) {
    const { slug } = await params
    const e = getEpisode(slug)
    if (!e) notFound()
    const url = `${SITE}/food-stories/${e.slug}`
    const related = relatedEpisodes(e)

    const article = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: e.seoTitle,
        description: e.description,
        image: [`${SITE}${e.poster}`],
        datePublished: e.datePublished,
        dateModified: e.datePublished,
        author: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Wonderade", url: SITE },
        publisher: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Wonderade", logo: { "@type": "ImageObject", url: LOGO } },
        mainEntityOfPage: url,
        isPartOf: { "@type": "CreativeWorkSeries", name: "Food Stories", url: `${SITE}/food-stories` },
        ...(e.youtubeId ? { video: { "@id": `${url}#video` } } : {}),
    }
    const video = e.youtubeId
        ? {
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "@id": `${url}#video`,
              name: e.title,
              description: e.description,
              thumbnailUrl: [`https://i.ytimg.com/vi/${e.youtubeId}/hqdefault.jpg`, `${SITE}${e.poster}`],
              uploadDate: e.uploadDate,
              ...(e.durationSeconds ? { duration: isoDuration(e.durationSeconds) } : {}),
              embedUrl: `https://www.youtube.com/embed/${e.youtubeId}`,
              contentUrl: `https://www.youtube.com/watch?v=${e.youtubeId}`,
              publisher: { "@id": `${SITE}/#organization` },
              transcript: e.transcript.join(" "),
          }
        : null

    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={video ? [article, video, faqJsonLd(e.faq)] : [article, faqJsonLd(e.faq)]} />
                <PageHero
                    crumbs={[
                        { name: "Food Stories", path: "/food-stories" },
                        { name: e.title, path: `/food-stories/${e.slug}` },
                    ]}
                    eyebrow={`Food Stories · Episode ${Number(e.num)} · ${e.kind}`}
                    title={e.seoTitle}
                    lede={<p>{e.description}</p>}
                />

                <section className="px-4 py-10 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        {e.youtubeId ? (
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-[#374191]">
                                <iframe
                                    className="absolute inset-0 h-full w-full"
                                    src={`https://www.youtube-nocookie.com/embed/${e.youtubeId}`}
                                    title={`Food Stories: ${e.title}`}
                                    loading="lazy"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <figure>
                                <div className="relative overflow-hidden rounded-xl border-2 border-[#374191]">
                                    <Image
                                        src={e.poster}
                                        alt={`Major Orange and Princess Punch in the Food Stories episode "${e.title}"`}
                                        width={1280}
                                        height={720}
                                        priority
                                        sizes="(max-width: 768px) 92vw, 768px"
                                        className="h-auto w-full"
                                    />
                                    <span className="absolute left-3 top-3 bg-[#374191] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-white">
                                        Video coming soon
                                    </span>
                                </div>
                                <figcaption className="mt-2 text-sm text-[#1f2340]/70">
                                    A still from the episode. The video is coming soon to{" "}
                                    <a className="underline" href={YOUTUBE} rel="me noopener">YouTube @wonderadeusa</a>; the full
                                    transcript is below.
                                </figcaption>
                            </figure>
                        )}
                    </div>
                </section>

                <Section>
                    <H2>The short answer</H2>
                    <p className="mt-3 text-lg">{e.summary}</p>
                    <ul className="mt-4 list-disc space-y-1 pl-6 text-lg">
                        {e.keyFacts.map((f) => (
                            <li key={f}>{f}</li>
                        ))}
                    </ul>
                </Section>

                <Section tone="cream">
                    <H2 id="transcript">The story (transcript)</H2>
                    <p className="mt-2 text-sm text-[#1f2340]/70">Narration from the episode, as it is spoken.</p>
                    <div className="mt-4 space-y-3 text-lg">
                        {e.transcript.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </Section>

                <Section>
                    <H2>Questions people ask</H2>
                    <FaqList items={e.faq} />
                </Section>

                <Section tone="cream">
                    <H2 id="sources">Sources</H2>
                    <p className="mt-2 text-sm text-[#1f2340]/70">Each source is listed with the facts we took from it.</p>
                    <div className="post-body source-list mt-4 text-base" dangerouslySetInnerHTML={{ __html: e.sourcesHtml }} />
                    {e.notesHtml && (
                        <>
                            <h3 className="mt-8 font-display text-xl font-extrabold text-[#374191]">How we checked this</h3>
                            <p className="mt-1 text-sm text-[#1f2340]/70">What we simplified, hedged or left out, and why.</p>
                            <div className="post-body source-list mt-3 text-base" dangerouslySetInnerHTML={{ __html: e.notesHtml }} />
                        </>
                    )}
                    {!e.productLinks && (
                        <p className="mt-6 text-base">
                            This article is general information, not medical advice. For anything about a child&apos;s health, ask
                            a doctor or pharmacist.
                        </p>
                    )}
                </Section>

                <Section>
                    <H2>More Food Stories</H2>
                    <ul className="mt-4 space-y-2 text-lg">
                        {related.map((r) => (
                            <li key={r.slug}>
                                <TextLink href={`/food-stories/${r.slug}`}>{r.title}</TextLink>
                            </li>
                        ))}
                        <li>
                            <Link className="font-mono text-sm font-bold uppercase tracking-widest text-[#374191] hover:text-[#EF4B61]" href="/food-stories">
                                All episodes →
                            </Link>
                        </li>
                    </ul>
                </Section>

                {e.productLinks && <ProductCta heading="Brought to you by Wonderade" />}
            </main>
            <Footer />
        </>
    )
}
