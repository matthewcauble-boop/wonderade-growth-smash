export function Comparison() {
    return (
        <section className="w-full border-b border-black bg-[#F5F5F5] py-20">
            <div className="mx-auto max-w-5xl border border-black bg-white shadow-[12px_12px_0px_rgba(0,0,0,1)]">

                {/* Header Row */}
                <div className="grid grid-cols-3 border-b border-black">
                    <div className="flex items-center p-4 font-serif text-2xl md:p-8 md:text-4xl uppercase tracking-wider">The Duel</div>
                    <div className="border-l border-black bg-black p-4 text-center font-serif text-xl font-bold text-white md:p-8 md:text-3xl tracking-widest">WONDERADE</div>
                    <div className="border-l border-black p-4 text-center font-serif text-xl text-black/40 md:p-8 md:text-3xl uppercase tracking-widest">JUICE BOXES</div>
                </div>

                {/* Row 1: Protein */}
                <div className="grid grid-cols-3 border-b border-black font-mono text-sm md:text-base">
                    <div className="p-4 font-bold uppercase tracking-wider md:p-6 text-xs md:text-base">Protein</div>
                    <div className="border-l border-black bg-[#E8F5E9] p-4 text-center font-bold text-black md:p-6 text-lg md:text-2xl">8g</div>
                    <div className="border-l border-black p-4 text-center text-black/50 md:p-6 text-lg md:text-2xl">0g</div>
                </div>

                {/* Row 2: Added Sugar */}
                <div className="grid grid-cols-3 border-b border-black font-mono text-sm md:text-base">
                    <div className="p-4 font-bold uppercase tracking-wider md:p-6 text-xs md:text-base">Added Sugar</div>
                    <div className="border-l border-black bg-[#E8F5E9] p-4 text-center font-bold text-black md:p-6 text-lg md:text-2xl">0g</div>
                    <div className="border-l border-black p-4 text-center text-black/50 md:p-6 text-lg md:text-2xl">15g</div>
                </div>

                {/* Row 3: Total Sugars */}
                <div className="grid grid-cols-3 border-b border-black font-mono text-sm md:text-base">
                    <div className="p-4 font-bold uppercase tracking-wider md:p-6 text-xs md:text-base">Total Sugars</div>
                    <div className="border-l border-black bg-[#E8F5E9] p-4 text-center font-bold text-black md:p-6 text-lg md:text-2xl">3g</div>
                    <div className="border-l border-black p-4 text-center text-black/50 md:p-6 text-lg md:text-2xl">15g</div>
                </div>

                {/* Row 4: Vit D, Zinc, Iron */}
                <div className="grid grid-cols-3 font-mono text-sm md:text-base">
                    <div className="p-4 font-bold uppercase tracking-wider md:p-6 text-xs md:text-base flex items-center">Zinc / Iron / Vit D</div>
                    <div className="border-l border-black bg-[#E8F5E9] p-4 text-center font-bold text-black md:p-6 text-lg md:text-2xl flex items-center justify-center">10% DV</div>
                    <div className="border-l border-black p-4 text-center text-black/50 md:p-6 text-lg md:text-2xl flex items-center justify-center">0%</div>
                </div>

            </div>
        </section>
    )
}
