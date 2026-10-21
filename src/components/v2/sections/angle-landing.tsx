"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import type { Angle } from "@/lib/ad-angles"

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]

export function AngleLanding({ angle }: { angle: Angle }) {
    const router = useRouter()
    const params = useSearchParams()
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")
    const [utm, setUtm] = useState<Record<string, string>>({})

    useEffect(() => {
        const found: Record<string, string> = {}
        for (const key of UTM_KEYS) {
            const value = params.get(key)
            if (value) found[key] = value.slice(0, 120)
        }
        setUtm(found)
    }, [params])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !email.includes("@")) {
            setErrorMessage("Please enter a valid email.")
            setStatus("error")
            return
        }
        setStatus("loading")
        setErrorMessage("")
        try {
            const response = await fetch("/api/klaviyo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "ad-test", angle: angle.key, utm })
            })
            if (!response.ok) throw new Error("Failed to subscribe")
            setStatus("success")
            setTimeout(() => {
                router.push(`/survey?email=${encodeURIComponent(email)}&angle=${angle.key}`)
            }, 800)
        } catch {
            setStatus("error")
            setErrorMessage("Network issue. Please try again.")
        }
    }

    return (
        <section className="relative bg-white">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
                <div className="flex flex-col">
                    <span className="mb-4 w-fit rounded-lg border-2 border-[#374191] bg-[#FBD02E] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#374191] shadow-[2px_2px_0px_#374191]">
                        {angle.eyebrow}
                    </span>
                    <h1 className="mb-4 font-sans text-[9vw] font-black uppercase leading-[1.05] tracking-tight text-[#374191] md:text-[3.25rem]">
                        {angle.headline} <span className="text-[#F57D14]">{angle.accent}</span>
                    </h1>
                    <p className="mb-6 max-w-lg text-lg text-[#374191]/80">{angle.subhead}</p>
                    <ul className="mb-8 flex flex-col gap-3">
                        {angle.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-[#374191]">
                                <span className="mt-1 h-4 w-4 flex-shrink-0 rounded-full border-2 border-[#374191] bg-[#FBD02E]" />
                                <span className="font-semibold">{bullet}</span>
                            </li>
                        ))}
                    </ul>

                    <form onSubmit={handleSubmit} className="flex max-w-lg overflow-hidden rounded-xl border-2 border-[#374191] bg-white shadow-[4px_4px_0px_#374191]">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading" || status === "success"}
                            placeholder="YOUR EMAIL"
                            className="w-full px-4 py-4 font-mono text-base font-bold uppercase tracking-widest text-[#374191] outline-none placeholder:font-normal placeholder:text-[#374191]/40 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="min-w-[120px] border-l-2 border-[#374191] bg-[#F57D14] px-5 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-[#F36318] disabled:opacity-80"
                        >
                            {status === "loading" ? "..." : status === "success" ? "Locked in" : angle.cta}
                        </button>
                    </form>
                    <p className="mt-2 max-w-lg font-mono text-[10px] leading-snug text-[#374191]/60">
                        By continuing you agree to get emails from Wonderade. Unsubscribe anytime. No commitment. Just first access.
                    </p>
                    {status === "error" && <p className="mt-2 font-mono text-xs font-bold uppercase text-red-500">{errorMessage}</p>}
                </div>

                <div className="relative mx-auto w-full max-w-md">
                    {angle.showBox ? (
                        <Image
                            src="/assets/brand/Product/wonderade-bottles-cropped.png"
                            alt="Wonderade Major Orange and Princess Punch juice boxes"
                            width={900}
                            height={900}
                            priority
                            className="h-auto w-full"
                        />
                    ) : (
                        <div className="rounded-3xl border-2 border-[#374191] bg-[#F8F2D0] p-8 text-center shadow-[8px_8px_0px_#374191]">
                            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#F57D14]">{angle.eyebrow}</p>
                            <p className="mt-3 font-sans text-3xl font-black uppercase leading-tight text-[#374191]">Iron + Fiber</p>
                            <p className="mt-2 text-[#374191]/80">One packet a day. Stir in. Done.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
