import Image from "next/image"
import Link from "next/link"
import { FLAVORS, GUIDES } from "@/lib/site"
import { PRODUCT_SAFE_EPISODES } from "@/lib/food-stories"

// Homepage "explore" block: plain server-rendered links into every section of the site, so crawlers (and people) can
// reach the flavor, nutrition, guide and Food Stories pages from the homepage in one hop.
export function ExploreLinks() {
    const episodes = PRODUCT_SAFE_EPISODES.slice(0, 6)
    return (
        <section aria-labelledby="explore-heading" className="w-full border-b-2 border-[#374191] bg-[#F8F2D0] px-4 py-16 md:px-8">
            <div className="mx-auto max-w-6xl text-[#1f2340]">
                <h2 id="explore-heading" className="font-display text-3xl font-extrabold text-[#374191] md:text-5xl">
                    Explore Wonderade
                </h2>
                <div className="mt-10 grid gap-10 md:grid-cols-3">
                    <div>
                        <h3 className="font-display text-2xl font-extrabold text-[#374191]">The juice</h3>
                        <ul className="mt-4 space-y-3">
                            {FLAVORS.map((f) => (
                                <li key={f.slug} className="flex items-center gap-3">
                                    <span className="relative block h-16 w-7 shrink-0">
                                        <Image src={f.image} alt={f.imageAlt} fill sizes="28px" className="object-contain" />
                                    </span>
                                    <Link href={`/flavors/${f.slug}`} className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">
                                        {f.name}: {f.short.toLowerCase()} juice box
                                    </Link>
                                </li>
                            ))}
                            <li><Link href="/nutrition" className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">Nutrition facts per box</Link></li>
                            <li><Link href="/faq" className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">Wonderade FAQ</Link></li>
                            <li><Link href="/characters" className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">Meet Major Orange, Princess Punch and Pip</Link></li>
                            <li><Link href="/about" className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">About Wonderade</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-display text-2xl font-extrabold text-[#374191]">Guides for parents</h3>
                        <ul className="mt-4 space-y-3">
                            {GUIDES.map((g) => (
                                <li key={g.href}>
                                    <Link href={g.href} className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">{g.label}</Link>
                                </li>
                            ))}
                            <li><Link href="/blog" className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">All parent guides</Link></li>
                            <li><Link href="/punch-list" className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">The Punch List: weekend plans for 50 cities</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-display text-2xl font-extrabold text-[#374191]">Food Stories</h3>
                        <ul className="mt-4 space-y-3">
                            {episodes.map((e) => (
                                <li key={e.slug}>
                                    <Link href={`/food-stories/${e.slug}`} className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">{e.title}</Link>
                                </li>
                            ))}
                            <li><Link href="/food-stories" className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]">All Food Stories</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
