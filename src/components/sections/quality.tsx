import { ShieldCheck, CheckCircle2 } from "lucide-react"

export function Quality() {
    return (
        <section className="w-full border-b border-black bg-[#CCFF00] py-16 md:py-24 px-4 overflow-hidden relative">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <ShieldCheck size={64} strokeWidth={1.5} className="text-black mb-6" />
                <h2 className="mb-6 font-serif text-4xl md:text-6xl text-black font-bold tracking-tight uppercase">Quality You Can Trust</h2>
                <p className="font-mono text-sm md:text-base lg:text-lg uppercase tracking-widest text-black/80 leading-relaxed max-w-3xl font-bold">
                    Wonderade is regularly tested to ensure all label claims are accurate and clear of contaminants, including pesticides, heavy metals, contaminants, and microbial.
                </p>
                <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
                    {["Pesticide", "Heavy Metal", "Microbial", "Contaminant"].map((claim) => (
                        <div key={claim} className="flex items-center gap-2 bg-white border border-black px-4 py-2 md:px-6 md:py-3 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                            <CheckCircle2 size={18} className="text-black" />
                            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest">{claim} Clear</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
