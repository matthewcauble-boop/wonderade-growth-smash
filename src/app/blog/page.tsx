import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/v2/layout/header";
import { Footer } from "@/components/v2/layout/footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Learn | Wonderade",
  description:
    "Straight answers for parents on sugar, protein, lunchboxes and picky eaters — from the people making a juice with 8g of protein and 3g of sugar.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Learn | Wonderade", url: "/blog", type: "website" },
};

function fmt(d: string) {
  return new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="border-b-2 border-[#374191] bg-[#FBD02E] px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#374191]">Learn</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-[#374191] md:text-6xl">
              Straight answers for parents.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[#374191]">
              Sugar, protein, lunchboxes, picky eaters. No lectures — just what the label says and what to do about it.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-3xl divide-y-2 divide-[#374191]">
            {posts.length === 0 && (
              <p className="py-10 text-[#374191]">First posts are on their way.</p>
            )}
            {posts.map((p) => (
              <article key={p.slug} className="py-8">
                <p className="font-mono text-xs uppercase tracking-widest text-[#374191]/70">
                  {fmt(p.date)}
                  {p.status !== "published" && (
                    <span className="ml-3 rounded-sm bg-[#EF4B61] px-2 py-0.5 text-white">{p.status}</span>
                  )}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold leading-snug text-[#374191] md:text-3xl">
                  <Link href={`/blog/${p.slug}`} className="hover:text-[#EF4B61] transition-colors">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[#1f2340]">{p.description}</p>
                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-widest text-[#EF4B61] hover:text-[#374191]"
                >
                  Read →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
