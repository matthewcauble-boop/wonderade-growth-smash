import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/v2/layout/header";
import { Footer } from "@/components/v2/layout/footer";
import { getAllPosts, getPost } from "@/lib/blog";

const SITE = "https://www.wonderade.us";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Wonderade`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.status === "published" ? undefined : { index: false, follow: false },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ["Wonderade"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

function fmt(d: string) {
  return new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Wonderade", url: SITE },
    publisher: { "@type": "Organization", name: "Wonderade", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/og.png` } },
    mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    image: [`${SITE}/og.png`],
    wordCount: post.wordCount,
  };
  const faq =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <Header />
      <main className="bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}

        <section className="border-b-2 border-[#374191] bg-[#FBD02E] px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#374191]">
              <Link href="/blog" className="hover:text-[#EF4B61]">Learn</Link>
              <span className="mx-2">/</span>
              {fmt(post.date)}
              {post.status !== "published" && (
                <span className="ml-3 rounded-sm bg-[#EF4B61] px-2 py-0.5 text-white">{post.status} — not indexed</span>
              )}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-[#374191] md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[#374191]">{post.description}</p>
          </div>
        </section>

        <article className="px-4 py-10 md:px-8 md:py-14">
          <div className="post-body mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <section className="border-t-2 border-[#374191] bg-[#374191] px-4 py-12 text-white md:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl font-extrabold">8g protein. 3g sugar. Real fruit.</p>
              <p className="text-white/80">Try Wonderade before you buy — free samples for founding families.</p>
            </div>
            <Link
              href="/claim"
              className="inline-block rounded-none border-2 border-[#FBD02E] bg-[#FBD02E] px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-[#374191] hover:bg-[#374191] hover:text-white transition-colors"
            >
              Claim your free sample
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
