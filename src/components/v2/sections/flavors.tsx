"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Flavor = "orange" | "punch"

export function Flavors() {
    const [activeFlavor, setActiveFlavor] = useState<Flavor>("orange")

    return (
        <section id="flavors" className="w-full border-b-2 border-[#374191] bg-white py-20 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 md:px-8">
                <h2 className="mb-12 text-left md:text-center font-serif text-5xl md:text-7xl text-[#374191]">Flavors You Can Count On</h2>

                <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4 relative z-20">
                    <Button
                        onClick={() => setActiveFlavor("orange")}
                        className={`w-full md:w-auto border-2 border-[#374191] px-8 py-4 transition-all rounded-xl font-bold ${activeFlavor === "orange"
                            ? "bg-[#F57D14] text-[#374191] shadow-[6px_6px_0px_#374191]"
                            : "bg-white text-[#374191] shadow-none hover:bg-[#F8F2D0]"
                            }`}
                    >
                        MAJOR ORANGE
                    </Button>
                    <Button
                        onClick={() => setActiveFlavor("punch")}
                        className={`w-full md:w-auto border-2 border-[#374191] px-8 py-4 transition-all rounded-xl font-bold ${activeFlavor === "punch"
                            ? "bg-[#ED0C7B] text-white shadow-[6px_6px_0px_#374191]"
                            : "bg-white text-[#374191] shadow-none hover:bg-[#F8F2D0]"
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
                                src="/assets/brand/Character/Princess%20Punch.svg"
                                alt="Princess Punch Vector"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(55,65,145,0.4)]"
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
                                src="/assets/brand/Character/Major%20Orange.svg"
                                alt="Major Orange Vector"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(55,65,145,0.4)]"
                            />
                        </motion.div>
                    </div>
                    
                    {/* Flavor Description Container */}
                    <div className="relative w-full h-auto min-h-[120px] mt-8 flex items-center justify-center text-center px-4">
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
                                    <p className="max-w-2xl font-mono text-xs md:text-sm lg:text-base uppercase leading-relaxed tracking-widest text-[#374191]/90 font-medium">
                                        Inspired by our love for fresh squeezed oranges and the candy-like juice we grew up on. Major Orange is real fruit and real orange extract combined with super sweeteners from nature to deliver that classic orange juice vibe without any added sugars or fake sweeteners.
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
                                    <p className="max-w-2xl font-mono text-xs md:text-sm lg:text-base uppercase leading-relaxed tracking-widest text-[#374191]/90 font-medium">
                                        Inspired by those tasty cans and boxes we all grew up on. Princess Punch is cherry juice and a blend of fruits from the tropics to deliver a delightful fruit punch flavor that kids young and old seem to just love.
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
