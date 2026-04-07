"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

export function Hero() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !email.includes('@')) {
            setErrorMessage("Please enter a valid email.")
            setStatus("error")
            return
        }
        setStatus("loading")
        setErrorMessage("")
        try {
            const response = await fetch("/api/omnisend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            if (!response.ok) throw new Error("Failed to subscribe")
            setStatus("success")
            setTimeout(() => {
                router.push(`/claim?email=${encodeURIComponent(email)}`)
            }, 800)
        } catch {
            setStatus("error")
            setErrorMessage("Network issue. Please try again.")
        }
    }
    return (
        <section
            className="relative min-h-[calc(100vh-5rem)] bg-white overflow-hidden"
        >

            <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-screen-2xl grid-cols-1 md:grid-cols-2 px-4 pt-2 md:py-12 lg:py-16 pb-16 md:gap-8">

                {/* Left Column wrapper */}
                <div className="contents order-2 md:order-none md:flex md:flex-col md:self-center md:justify-center md:py-10 md:px-8 lg:px-12 xl:px-16 relative z-10">

                    {/* Group 1: Headline (Mobile Order 2) */}
                    <div className="order-2 md:order-none flex flex-col items-start pt-2 md:pt-0 relative z-20">
                        <h1 className="mb-2 md:mb-4 font-sans text-[8vw] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-black uppercase leading-[1.05] tracking-tight text-[#374191] lg:mb-6">
                            The juice you wish you had when <span className="text-[#F57D14]">you were growing up.</span>
                        </h1>
                    </div>

                    {/* Group 2: Subhead (Mobile Order 3) */}
                    <div className="order-3 md:order-none relative z-10 flex flex-col pt-4 md:pt-6 mb-8 md:mb-12">
                        <ul className="flex flex-col gap-3 md:gap-4 max-w-lg">
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#FBD02E] border-2 border-[#374191] shadow-[2px_2px_0px_#374191]">
                                    <svg className="w-3.5 h-3.5 text-[#374191]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-sans text-base md:text-lg text-[#374191] font-bold leading-tight mt-0.5">
                                    <span className="text-[#F57D14] font-black">8g of protein</span> to grow big and strong
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#FBD02E] border-2 border-[#374191] shadow-[2px_2px_0px_#374191]">
                                    <svg className="w-3.5 h-3.5 text-[#374191]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-sans text-base md:text-lg text-[#374191] font-bold leading-tight mt-0.5">
                                    <span className="text-[#F57D14] font-black">3g of sugar</span> from real fruit
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#FBD02E] border-2 border-[#374191] shadow-[2px_2px_0px_#374191]">
                                    <svg className="w-3.5 h-3.5 text-[#374191]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-sans text-base md:text-lg text-[#374191] font-bold leading-tight mt-0.5">
                                    <span className="text-[#F57D14] font-black">4g of fiber</span> for healthy guts
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#FBD02E] border-2 border-[#374191] shadow-[2px_2px_0px_#374191]">
                                    <svg className="w-3.5 h-3.5 text-[#374191]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-sans text-base md:text-lg text-[#374191] font-bold leading-tight mt-0.5">
                                    <span className="text-[#F57D14] font-black">8 essential nutrients</span> to boost immunity and brain power
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Group 4: Pricing Box & CTA (Mobile Order 4) */}
                    <div className="order-4 md:order-none relative z-10 flex flex-col pt-4 md:pt-0 pb-8 md:pb-0 w-full">
                        <div className="w-full max-w-[420px] md:max-w-[480px] bg-white border-2 border-[#374191] p-5 sm:p-6 shadow-[8px_8px_0px_#374191] flex flex-col rounded-xl relative">
                            {/* Decorative Star Overhang */}
                            <div className="absolute -top-6 -right-6 w-12 h-12 z-20">
                                <Image src="/assets/brand/Stickers/shimmer.svg" alt="Sparkle" fill className="object-contain" />
                            </div>

                            <div className="flex items-center justify-center bg-[#FBD02E] border-2 border-[#374191] px-3 py-1.5 shadow-[2px_2px_0px_#374191] mb-4 w-fit rounded-lg">
                                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#374191] flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F57D14] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F57D14]"></span>
                                    </span>
                                    Limited Spots Available
                                </span>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F57D14] mb-1 leading-tight">Claim Your Free Sample</h3>
                            <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#374191]/60 mb-5">Try Wonderade before you buy.</p>

                            <form onSubmit={handleSubmit} className="flex border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191] focus-within:shadow-[2px_2px_0px_#374191] focus-within:-translate-y-0.5 transition-all rounded-xl overflow-hidden mb-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === "loading" || status === "success"}
                                    placeholder="ENTER YOUR EMAIL"
                                    className="w-full px-3 py-3 font-mono text-xs font-bold uppercase tracking-widest outline-none placeholder:text-[#374191]/40 placeholder:font-normal text-[#374191] disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className="border-l-2 border-[#374191] bg-[#F57D14] px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#F36318] disabled:opacity-80 flex items-center justify-center min-w-[80px]"
                                >
                                    {status === "loading" ? (
                                        <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                                    ) : status === "success" ? (
                                        "LOCKED IN"
                                    ) : (
                                        "CLAIM"
                                    )}
                                </button>
                            </form>

                            <div className="min-h-[1.25rem]">
                                {status === "error" ? (
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-red-500 font-bold animate-pulse">{errorMessage}</p>
                                ) : status === "success" ? (
                                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#374191] font-bold">Success! You&apos;ve claimed first access.</p>
                                ) : (
                                    <p className="font-mono text-[10px] sm:text-xs font-bold text-[#374191]/60 uppercase tracking-widest">No commitment. Just first access.</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Product Image (Mobile Order 1) */}
                <div className="hero-right-col order-1 md:order-none relative z-10 flex flex-col items-center justify-end md:justify-center w-full h-[45vh] min-h-[250px] md:min-h-0 md:h-full pt-4 pb-0 md:py-0">
                    <div className="hero-right-inner relative z-10 w-full h-full mx-auto flex justify-center max-w-[480px] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] mt-0">
                        {/* Product Bottles Vector Image */}
                        <motion.div 
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full h-full z-0 origin-center"
                        >
                            <motion.div 
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="relative w-full h-full origin-center"
                            >
                                <div className="relative w-full h-[85%] md:h-[95%] lg:h-full flex justify-center items-center mx-auto scale-[1.05] sm:scale-[1.1] md:scale-[0.95] lg:scale-[0.90] xl:scale-[0.95] 2xl:scale-[1.0] hover:scale-[1.10] sm:hover:scale-[1.15] md:hover:scale-100 lg:hover:scale-[0.95] xl:hover:scale-[1.0] 2xl:hover:scale-[1.05] transition-transform duration-500 origin-center">
                                    <Image
                                        src="/assets/brand/Product/wonderade-bottles-cropped.png"
                                        alt="Wonderade Bottles"
                                        fill
                                        className="object-contain object-bottom md:object-center"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    )
}
