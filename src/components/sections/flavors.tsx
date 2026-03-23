"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Flavor = "orange" | "punch"

export function Flavors() {
    const [activeFlavor, setActiveFlavor] = useState<Flavor>("orange")

    return (
        <section id="flavors" className="w-full border-b border-black bg-white py-20 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <h2 className="mb-12 text-left md:text-center font-serif text-5xl md:text-7xl">Flavors You Can Count On</h2>

                <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4 relative z-20">
                    <Button
                        onClick={() => setActiveFlavor("orange")}
                        className={`w-full md:w-auto border border-black px-8 py-4 transition-all ${activeFlavor === "orange"
                            ? "bg-[#FF8A00] text-white shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-black shadow-none hover:bg-gray-100"
                            }`}
                    >
                        MAJOR ORANGE
                    </Button>
                    <Button
                        onClick={() => setActiveFlavor("punch")}
                        className={`w-full md:w-auto border border-black px-8 py-4 transition-all ${activeFlavor === "punch"
                            ? "bg-[#FF007A] text-white shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-black shadow-none hover:bg-gray-100"
                            }`}
                    >
                        PRINCESS PUNCH
                    </Button>
                </div>

                {/* 3D Rotational Visual Swap Area */}
                <div className="relative mx-auto h-[400px] md:h-[600px] w-full max-w-4xl flex flex-col items-center justify-start pt-8">

                    {/* 3D Bottle Swap */}
                    <div className="relative z-10 w-[200px] h-[260px] md:w-[300px] md:h-[400px] mt-4 md:mt-24 perspective-1000">
                        {/* Princess Punch Bottle */}
                        <motion.div
                            animate={{
                                rotateY: activeFlavor === "punch" ? 0 : 45,
                                scale: activeFlavor === "punch" ? 1.1 : 0.85,
                                x: activeFlavor === "punch" ? 0 : 100,
                                z: activeFlavor === "punch" ? 10 : -10,
                                opacity: activeFlavor === "punch" ? 1 : 0.6,
                                zIndex: activeFlavor === "punch" ? 20 : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="absolute inset-0 origin-center"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Image
                                src="/princess-punch.png"
                                alt="Princess Punch Bottle"
                                fill
                                className="object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] mix-blend-multiply"
                            />
                        </motion.div>

                        {/* Major Orange Bottle */}
                        <motion.div
                            animate={{
                                rotateY: activeFlavor === "orange" ? 0 : -45,
                                scale: activeFlavor === "orange" ? 1.1 : 0.85,
                                x: activeFlavor === "orange" ? 0 : -100,
                                z: activeFlavor === "orange" ? 10 : -10,
                                opacity: activeFlavor === "orange" ? 1 : 0.6,
                                zIndex: activeFlavor === "orange" ? 20 : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="absolute inset-0 origin-center"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Image
                                src="/major-orange.png"
                                alt="Major Orange Bottle"
                                fill
                                className="object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] mix-blend-multiply"
                            />
                        </motion.div>
                    </div>
                    
                    {/* Flavor Description Container */}
                    <div className="relative w-full h-[80px] mt-8 flex items-center justify-center text-center px-4">
                        <AnimatePresence mode="wait">
                            {activeFlavor === "orange" && (
                                <motion.div
                                    key="orange-desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <p className="max-w-md font-mono text-sm md:text-lg uppercase leading-relaxed tracking-wider text-black/80">
                                        Organic OJ + 0-calorie super sweeteners from nature.
                                    </p>
                                </motion.div>
                            )}
                            {activeFlavor === "punch" && (
                                <motion.div
                                    key="punch-desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <p className="max-w-md font-mono text-sm md:text-lg uppercase leading-relaxed tracking-wider text-black/80">
                                        Organic Cherry Juice + 0-calorie super sweeteners from nature.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    )
}
