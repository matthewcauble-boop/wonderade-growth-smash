import { jsonLd } from "@/lib/site"

// Server-rendered structured data. Each object becomes its own <script type="application/ld+json">.
export function JsonLd({ data }: { data: unknown | unknown[] }) {
    const items = Array.isArray(data) ? data : [data]
    return (
        <>
            {items.map((d, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />
            ))}
        </>
    )
}
