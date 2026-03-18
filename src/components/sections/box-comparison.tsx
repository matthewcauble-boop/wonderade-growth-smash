"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function BoxComparison() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [wonderadeError, setWonderadeError] = useState(false)
    const [produceError, setProduceError] = useState(false)

    return (
        <section ref={containerRef} id="compare" className="relative min-h-[80vh] w-full bg-white border-t border-black overflow-hidden flex flex-col justify-between">
            <div className="flex-1 flex flex-col w-full z-[100] relative bg-white">
                {/* Split Screen Header */}
                <div className="grid grid-cols-2 border-b border-black m-0 h-[80px]">
                    <div className="flex items-center justify-center border-r border-black h-full">
                        <h2 className="font-serif text-3xl md:text-5xl tracking-tight uppercase m-0 leading-none">One month = $30</h2>
                    </div>
                    <div className="flex items-center justify-center bg-[#F5F5F5] h-full">
                        <h2 className="font-serif text-3xl md:text-5xl tracking-tight uppercase text-black m-0 leading-none">One month = $85+</h2>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 grid grid-cols-2 relative h-full min-h-[400px]">
                    {/* Center Divider spans exact height of the grid content */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black -translate-x-1/2 z-20 pointer-events-none" />

                    {/* Left Side: Wonderade Box (Animated) */}
                    <div className="relative flex items-start justify-center h-full z-10 w-full pt-8 p-4">
                        <motion.div
                            initial={{ y: -200, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                            className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square flex items-center justify-center transform-gpu"
                        >
                            {!wonderadeError ? (
                                <Image
                                    src="/wonderade-box.png"
                                    alt="Wonderade 24-Pack Box"
                                    fill
                                    className="object-contain mix-blend-multiply drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transform-gpu"
                                    onError={() => setWonderadeError(true)}
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full border border-black bg-white flex items-center justify-center p-4 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                    <span className="font-mono text-xl md:text-2xl font-bold uppercase tracking-widest text-black">WONDERADE 24-PACK</span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Side: Produce Box (Static) */}
                    <div className="relative bg-[#F5F5F5] flex items-start justify-center h-full z-10 w-full pt-8 p-4">
                        <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square flex items-center justify-center">
                            {!produceError ? (
                                <Image
                                    src="/produce-box.png"
                                    alt="Produce Box"
                                    fill
                                    className="object-contain mix-blend-multiply drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transform-gpu"
                                    onError={() => setProduceError(true)}
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full border border-black bg-[#E5E5E5] flex items-center justify-center p-4 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                    <span className="font-mono text-xl md:text-2xl font-bold uppercase tracking-widest text-black">PRODUCE BOX</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Value Bar (Footer) */}
            <div className="z-[150] grid grid-cols-2 border-t border-black bg-white shadow-[0_-8px_0_rgba(0,0,0,1)] relative w-full h-[80px]">
                <div className="flex items-center justify-center border-r border-black bg-[#CCFF00] p-4 text-center">
                    <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-black m-0">
                        Concentrated Growth.<br className="md:hidden" /> Fits in your fridge door.
                    </p>
                </div>
                <div className="flex items-center justify-center bg-black text-white p-4 text-center">
                    <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#F5F5F5] m-0">
                        30+ lbs of groceries.<br className="md:hidden" /> Requires a second fridge.
                    </p>
                </div>
            </div>
        </section>
    )
}
