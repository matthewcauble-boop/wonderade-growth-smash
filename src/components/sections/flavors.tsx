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
                <h2 className="mb-12 text-center font-serif text-5xl md:text-7xl">Flavor Spotlight</h2>

                <div className="mb-12 flex justify-center gap-4 relative z-20">
                    <Button
                        onClick={() => setActiveFlavor("orange")}
                        className={`border border-black px-8 py-4 transition-all ${activeFlavor === "orange"
                            ? "bg-[#FF8A00] text-white shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-black shadow-none hover:bg-gray-100"
                            }`}
                    >
                        MAJOR ORANGE
                    </Button>
                    <Button
                        onClick={() => setActiveFlavor("punch")}
                        className={`border border-black px-8 py-4 transition-all ${activeFlavor === "punch"
                            ? "bg-[#FF007A] text-white shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-black shadow-none hover:bg-gray-100"
                            }`}
                    >
                        PRINCESS PUNCH
                    </Button>
                </div>

                {/* 3D Rotational Visual Swap Area */}
                <div className="relative mx-auto h-[600px] w-full max-w-4xl flex items-center justify-center pt-8">

                    {/* Static Info Background that crossfades */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                            {activeFlavor === "orange" && (
                                <motion.div
                                    key="orange-info"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex w-full flex-col items-center justify-center text-center p-8 absolute top-0"
                                >
                                    <h3 className="mb-4 font-serif text-5xl text-[#FF8A00] md:text-7xl text-shadow-sm">Major Orange</h3>
                                    <p className="max-w-md font-mono text-lg uppercase leading-relaxed tracking-wider">
                                        Organic OJ + 0-calorie super sweeteners from nature.
                                    </p>
                                </motion.div>
                            )}
                            {activeFlavor === "punch" && (
                                <motion.div
                                    key="punch-info"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex w-full flex-col items-center justify-center text-center p-8 absolute top-0"
                                >
                                    <h3 className="mb-4 font-serif text-5xl text-[#FF007A] md:text-7xl text-shadow-sm">Princess Punch</h3>
                                    <p className="max-w-md font-mono text-lg uppercase leading-relaxed tracking-wider">
                                        Organic Cherry Juice + 0-calorie super sweeteners from nature.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3D Bottle Swap */}
                    <div className="relative z-10 w-[300px] h-[400px] mt-32 perspective-1000">
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

                </div>
            </div>
        </section>
    )
}
