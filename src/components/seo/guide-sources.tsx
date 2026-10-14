// Source list for the guide pages. Each item is one claim with the organization it came from.
export function GuideSources({ items }: { items: { source: string; url: string }[] }) {
    return (
        <ul className="source-list mt-4 list-disc space-y-2 pl-6 text-base">
            {items.map((s) => (
                <li key={s.url}>
                    <a className="font-semibold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]" href={s.url} rel="noopener">
                        {s.source}
                    </a>
                </li>
            ))}
        </ul>
    )
}
