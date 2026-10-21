import { NUTRITION, APPLE_JUICE_REF } from "@/lib/site"

// Nutrition facts as real text (crawlable, quotable by AI answers), not an image.
export function NutritionTable({ caption = "Nutrition facts, per box" }: { caption?: string }) {
    return (
        <table className="w-full border-2 border-[#374191] text-left text-[#1f2340]">
            <caption className="caption-top pb-2 text-left font-display text-xl font-extrabold text-[#374191]">{caption}</caption>
            <thead>
                <tr className="border-b-2 border-[#374191] bg-[#374191] text-white">
                    <th scope="col" className="px-3 py-2 font-mono text-xs uppercase tracking-widest">Nutrient</th>
                    <th scope="col" className="px-3 py-2 font-mono text-xs uppercase tracking-widest">Amount</th>
                    <th scope="col" className="px-3 py-2 font-mono text-xs uppercase tracking-widest">% Daily Value</th>
                </tr>
            </thead>
            <tbody>
                {NUTRITION.map((n) => (
                    <tr key={n.name} className="border-b border-[#374191]/20">
                        <th scope="row" className={`px-3 py-1.5 font-semibold ${n.indent ? "pl-8 font-normal" : ""}`}>{n.name}</th>
                        <td className="px-3 py-1.5">{n.amount}</td>
                        <td className="px-3 py-1.5">{n.dv ?? ""}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export function JuiceComparisonTable() {
    return (
        <div id="compare">
            <table className="w-full border-2 border-[#374191] text-left text-[#1f2340]">
                <caption className="caption-top pb-2 text-left font-display text-xl font-extrabold text-[#374191]">
                    Wonderade vs. 100% apple juice, same 8.4 fl oz serving
                </caption>
                <thead>
                    <tr className="border-b-2 border-[#374191] bg-[#374191] text-white">
                        <th scope="col" className="px-3 py-2 font-mono text-xs uppercase tracking-widest">Per serving</th>
                        <th scope="col" className="px-3 py-2 font-mono text-xs uppercase tracking-widest">Wonderade</th>
                        <th scope="col" className="px-3 py-2 font-mono text-xs uppercase tracking-widest">100% apple juice</th>
                    </tr>
                </thead>
                <tbody>
                    {APPLE_JUICE_REF.rows.map((r) => (
                        <tr key={r.name} className="border-b border-[#374191]/20">
                            <th scope="row" className="px-3 py-1.5 font-semibold">{r.name}</th>
                            <td className="px-3 py-1.5 font-bold text-[#374191]">{r.wonderade}</td>
                            <td className="px-3 py-1.5">{r.juice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-2 text-sm text-[#1f2340]/70">
                Apple juice figures: <a className="underline" href={APPLE_JUICE_REF.url} rel="noopener">{APPLE_JUICE_REF.source}</a>.
                Wonderade figures from its Nutrition Facts panel. Juices vary; check the label on yours.
            </p>
        </div>
    )
}
