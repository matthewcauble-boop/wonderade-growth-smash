"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const benefits = [
    "PROTEIN: 8G",
    "FIBER: 4G",
    "ELECTROLYTES: 100%",
    "IMMUNITY: VITAMIN C + D",
    "SUGAR: 0G ADDED",
    "NO JUNK",
    "REAL FRUIT"
]

export function BenefitFader() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % benefits.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative flex w-full items-center justify-center bg-black py-2.5 border-b-2 border-white overflow-hidden h-[42px] z-50">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-white text-center absolute"
                >
                    {benefits[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
