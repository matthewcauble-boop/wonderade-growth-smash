"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Flavor = "orange" | "punch"

export function Flavors() {
    const [activeFlavor, setActiveFlavor] = useState<Flavor>("orange")

    return (
        <section id="flavors" className="w-full border-b-2 border-[#374191] bg-white py-12 md:py-0 md:min-h-[100dvh] flex items-center justify-center overflow-hidden">
            <div className="relative mx-auto w-full max-w-6xl px-4 md:px-8 py-8 md:py-[4vh] flex flex-col items-center justify-center h-full">
                <h2 className="mb-8 md:mb-[4vh] text-center font-serif text-5xl md:text-[8vh] xl:text-[9vh] leading-none text-[#374191] tracking-tight">Flavors You Can Count On</h2>

                <div className="mb-6 md:mb-[3vh] flex flex-col md:flex-row items-center justify-center gap-4 relative z-20 w-full max-w-md md:max-w-none">
                    <Button
                        onClick={() => setActiveFlavor("orange")}
                        className={`w-full md:w-auto border-2 border-[#374191] px-8 py-4 md:py-[2.5vh] md:px-[3vw] md:text-[2vh] xl:text-[2.2vh] transition-all rounded-xl font-bold ${activeFlavor === "orange"
                            ? "bg-[#F57D14] text-[#374191] shadow-[6px_6px_0px_#374191]"
                            : "bg-white text-[#374191] shadow-none hover:bg-[#F8F2D0]"
                            }`}
                    >
                        MAJOR ORANGE
                    </Button>
                    <Button
                        onClick={() => setActiveFlavor("punch")}
                        className={`w-full md:w-auto border-2 border-[#374191] px-8 py-4 md:py-[2.5vh] md:px-[3vw] md:text-[2vh] xl:text-[2.2vh] transition-all rounded-xl font-bold ${activeFlavor === "punch"
                            ? "bg-[#ED0C7B] text-white shadow-[6px_6px_0px_#374191]"
                            : "bg-white text-[#374191] shadow-none hover:bg-[#F8F2D0]"
                            }`}
                    >
                        PRINCESS PUNCH
                    </Button>
                </div>

                {/* 3D Rotational Visual Swap Area */}
                <div className="relative mx-auto h-auto w-full max-w-4xl flex flex-col items-center justify-center pt-2 md:pt-[2vh]">

                    {/* 3D Bottle Swap — removed from all viewports */}
                    <div className="hidden">
                        {/* Princess Punch Bottle */}
                        <motion.div
                            animate={{
                                rotateY: activeFlavor === "punch" ? 0 : 45,
                                scale: activeFlavor === "punch" ? 1.1 : 0.85,
                                x: activeFlavor === "punch" ? 0 : 150,
                                z: activeFlavor === "punch" ? 10 : -10,
                                opacity: activeFlavor === "punch" ? 1 : 0.6,
                                zIndex: activeFlavor === "punch" ? 20 : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="absolute inset-0 origin-center"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Image
                                src="/assets/packaging/princess-punch-bottle.png"
                                alt="Princess Punch Bottle"
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Major Orange Bottle */}
                        <motion.div
                            animate={{
                                rotateY: activeFlavor === "orange" ? 0 : -45,
                                scale: activeFlavor === "orange" ? 1.1 : 0.85,
                                x: activeFlavor === "orange" ? 0 : -150,
                                z: activeFlavor === "orange" ? 10 : -10,
                                opacity: activeFlavor === "orange" ? 1 : 0.6,
                                zIndex: activeFlavor === "orange" ? 20 : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="absolute inset-0 origin-center"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <Image
                                src="/assets/packaging/major-orange-bottle.png"
                                alt="Major Orange Bottle"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                    
                    {/* Flavor Description Container */}
                    <div className="relative w-[90%] max-w-2xl mx-auto h-auto min-h-[180px] md:min-h-[18vh] mt-8 md:mt-[4vh] flex items-center justify-center text-center p-6 md:p-[3vh] border-[3px] border-[#374191] bg-[#FFFFFF] shadow-[8px_8px_0px_#374191] rounded-xl z-20">
                        <AnimatePresence mode="wait">
                            {activeFlavor === "orange" && (
                                <motion.div
                                    key="orange-desc"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 flex items-center justify-center p-6 md:p-[3vh]"
                                >
                                    <p className="max-w-xl font-mono text-xs md:text-[1.8vh] xl:text-[2vh] uppercase leading-relaxed md:leading-[1.6] tracking-widest text-[#374191]/90 font-bold">
                                        Major Orange is real fruit and real orange extract combined with super sweeteners from nature to deliver that classic orange juice vibe without any added sugars or fake sweeteners.
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
                                    className="absolute inset-0 flex items-center justify-center p-6 md:p-[3vh]"
                                >
                                    <p className="max-w-xl font-mono text-xs md:text-[1.8vh] xl:text-[2vh] uppercase leading-relaxed md:leading-[1.6] tracking-widest text-[#374191]/90 font-bold">
                                        Princess Punch is cherry juice and a blend of fruit flavors from the tropics to deliver a delightful fruit punch flavor that kids young and old seem to just love.
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
