import Link from "next/link"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd } from "@/lib/site"

// Shared, server-rendered building blocks for the content pages (no client JS).

export type Crumb = { name: string; path: string }

// Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. "Home" is added automatically.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
    const all = [{ name: "Home", path: "/" }, ...items]
    return (
        <>
            <JsonLd data={breadcrumbJsonLd(all)} />
            <nav aria-label="Breadcrumb" className="font-mono text-xs font-bold uppercase tracking-widest text-[#374191]">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {all.map((c, i) => (
                        <li key={c.path} className="flex items-center gap-2">
                            {i > 0 && <span aria-hidden="true">/</span>}
                            {i < all.length - 1 ? (
                                <Link href={c.path} className="hover:text-[#EF4B61]">{c.name}</Link>
                            ) : (
                                <span aria-current="page">{c.name}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}

export function PageHero({
    crumbs,
    title,
    lede,
    children,
    eyebrow,
}: {
    crumbs: Crumb[]
    title: string
    lede?: React.ReactNode
    eyebrow?: string
    children?: React.ReactNode
}) {
    return (
        <section className="border-b-2 border-[#374191] bg-[#FBD02E] px-4 py-12 md:px-8 md:py-16">
            <div className="mx-auto max-w-3xl">
                <Breadcrumbs items={crumbs} />
                {eyebrow && (
                    <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/80">{eyebrow}</p>
                )}
                <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-[#374191] md:text-5xl">{title}</h1>
                {lede && <div className="mt-4 text-lg text-[#374191]">{lede}</div>}
                {children}
            </div>
        </section>
    )
}

export function Section({
    children,
    tone = "white",
    id,
}: {
    children: React.ReactNode
    tone?: "white" | "cream"
    id?: string
}) {
    return (
        <section
            id={id}
            className={`border-t-2 border-[#374191] px-4 py-12 md:px-8 ${tone === "cream" ? "bg-[#F8F2D0]" : "bg-white"}`}
        >
            <div className="mx-auto max-w-3xl text-[#1f2340]">{children}</div>
        </section>
    )
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
    return <h2 id={id} className="font-display text-3xl font-extrabold text-[#374191]">{children}</h2>
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
    const external = /^https?:/.test(href)
    if (external) {
        return (
            <a className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]" href={href} rel="noopener">
                {children}
            </a>
        )
    }
    return (
        <Link className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]" href={href}>
            {children}
        </Link>
    )
}

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
    return (
        <dl className="mt-6 space-y-6">
            {items.map((q) => (
                <div key={q.question}>
                    <dt className="font-display text-xl font-bold text-[#374191]">{q.question}</dt>
                    <dd className="mt-1 text-lg">{q.answer}</dd>
                </div>
            ))}
        </dl>
    )
}

// The pre-launch product call to action. Not used on standalone articles (see food-stories.ts productLinks).
export function ProductCta({ heading = "8g protein. 3g sugar. Real fruit." }: { heading?: string }) {
    return (
        <section className="border-t-2 border-[#374191] bg-[#374191] px-4 py-12 text-white md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-display text-2xl font-extrabold">{heading}</p>
                    <p className="text-white/80">
                        Wonderade is a kids&apos; juice box. See the{" "}
                        <Link href="/nutrition" className="underline">nutrition facts</Link> or meet the{" "}
                        <Link href="/flavors" className="underline">flavors</Link>.
                    </p>
                </div>
                <Link
                    href="/claim"
                    className="inline-block shrink-0 border-2 border-[#FBD02E] bg-[#FBD02E] px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-[#374191] transition-colors hover:bg-[#374191] hover:text-white"
                >
                    Join the founding families
                </Link>
            </div>
        </section>
    )
}

// A simple, accessible data table used by the comparison guides.
export function DataTable({
    caption,
    head,
    rows,
    note,
}: {
    caption: string
    head: string[]
    rows: (string | React.ReactNode)[][]
    note?: React.ReactNode
}) {
    return (
        <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-2 border-[#374191] text-left text-[#1f2340]">
                <caption className="caption-top pb-2 text-left font-display text-xl font-extrabold text-[#374191]">{caption}</caption>
                <thead>
                    <tr className="bg-[#374191] text-white">
                        {head.map((h) => (
                            <th key={h} scope="col" className="px-3 py-2 font-mono text-xs uppercase tracking-widest">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="border-b border-[#374191]/20">
                            {r.map((c, j) =>
                                j === 0 ? (
                                    <th key={j} scope="row" className="px-3 py-1.5 font-semibold">{c}</th>
                                ) : (
                                    <td key={j} className="px-3 py-1.5">{c}</td>
                                ),
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {note && <p className="mt-2 text-sm text-[#1f2340]/70">{note}</p>}
        </div>
    )
}
