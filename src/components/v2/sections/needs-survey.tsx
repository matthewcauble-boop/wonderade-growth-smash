"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AGE_BANDS, NEEDS, SCREENS, TRADEOFFS, type NeedKey, type SurveyAnswer, type TradeoffKey } from "@/lib/needs-survey"

type Step = { kind: "screen"; index: number } | { kind: "tradeoff"; index: number } | { kind: "about" } | { kind: "done" }

function shuffle<T>(items: T[]): T[] {
    const copy = [...items]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

export function NeedsSurvey() {
    const params = useSearchParams()
    const email = params.get("email") || ""
    const angle = params.get("angle") || ""

    // screen order and the order of needs on each screen are shuffled once per visit to avoid position bias;
    // done after mount so the server render and the first client render match
    const [screens, setScreens] = useState<(typeof NEEDS)[number][][]>([])
    const [picks, setPicks] = useState<{ best?: NeedKey; worst?: NeedKey }[]>([])
    useEffect(() => {
        const shuffled = shuffle(SCREENS).map((s) => shuffle(s).map((i) => NEEDS[i]))
        setScreens(shuffled)
        setPicks(shuffled.map(() => ({})))
    }, [])
    const steps: Step[] = useMemo(
        () => [
            ...screens.map((_, index) => ({ kind: "screen" as const, index })),
            ...TRADEOFFS.map((_, index) => ({ kind: "tradeoff" as const, index })),
            { kind: "about" as const },
        ],
        [screens]
    )

    const [stepIndex, setStepIndex] = useState(0)
    const [tradeoffs, setTradeoffs] = useState<SurveyAnswer["tradeoffs"]>({})
    const [ages, setAges] = useState<string[]>([])
    const [worry, setWorry] = useState("")
    const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

    if (screens.length === 0) return null

    const step: Step = status === "done" ? { kind: "done" } : steps[stepIndex]
    const progress = Math.round((stepIndex / steps.length) * 100)

    const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1))

    const pick = (screen: number, field: "best" | "worst", key: NeedKey) => {
        setPicks((prev) => {
            const copy = [...prev]
            const current = { ...copy[screen], [field]: key }
            // the same need can't be both most and least important
            if (field === "best" && current.worst === key) delete current.worst
            if (field === "worst" && current.best === key) delete current.best
            copy[screen] = current
            return copy
        })
    }

    const submit = async () => {
        setStatus("sending")
        const answer: SurveyAnswer = {
            screens: picks.map((p) => ({ best: p.best as NeedKey, worst: p.worst as NeedKey })),
            tradeoffs,
            ages,
            worry: worry.slice(0, 500),
        }
        try {
            const res = await fetch("/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, angle, answer }),
            })
            if (!res.ok) throw new Error("failed")
            setStatus("done")
        } catch {
            setStatus("error")
        }
    }

    const card = "rounded-3xl border-2 border-[#374191] bg-[#F8F2D0] p-6 shadow-[8px_8px_0px_#374191] md:p-8"
    const option = (selected: boolean) =>
        `w-full rounded-xl border-2 border-[#374191] px-4 py-3 text-left font-semibold text-[#374191] transition ${
            selected ? "bg-[#FBD02E] shadow-[2px_2px_0px_#374191]" : "bg-white hover:bg-[#FFF6CC]"
        }`
    const nextButton = (enabled: boolean, onClick: () => void, label = "Next") => (
        <button
            type="button"
            disabled={!enabled}
            onClick={onClick}
            className="mt-6 w-full rounded-xl border-2 border-[#374191] bg-[#F57D14] px-6 py-4 font-mono text-sm font-bold uppercase tracking-widest text-white disabled:opacity-40"
        >
            {label}
        </button>
    )

    if (step.kind === "done") {
        return (
            <div className={card}>
                <h2 className="mb-3 font-sans text-3xl font-black uppercase text-[#374191]">Thank you!</h2>
                <p className="mb-6 text-[#374191]/80">Your answers go straight into what we make next.</p>
                <Link
                    href={email ? `/claim?email=${encodeURIComponent(email)}` : "/#checkout"}
                    className="block w-full rounded-xl border-2 border-[#374191] bg-[#F57D14] px-6 py-4 text-center font-mono text-sm font-bold uppercase tracking-widest text-white"
                >
                    Claim your free sample
                </Link>
            </div>
        )
    }

    return (
        <div className={card}>
            <div className="mb-6 h-2 w-full overflow-hidden rounded-full border border-[#374191] bg-white">
                <div className="h-full bg-[#F57D14] transition-all" style={{ width: `${progress}%` }} />
            </div>

            {step.kind === "screen" && (() => {
                const items = screens[step.index]
                const current = picks[step.index]
                return (
                    <>
                        <p className="mb-1 font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/60">
                            {step.index + 1} of {screens.length}
                        </p>
                        <h2 className="mb-5 font-sans text-2xl font-black uppercase leading-tight text-[#374191]">
                            For your kid&apos;s drink, which matters <span className="text-[#F57D14]">most</span>?
                        </h2>
                        <div className="flex flex-col gap-2">
                            {items.map((n) => (
                                <button key={n.key} type="button" className={option(current.best === n.key)} onClick={() => pick(step.index, "best", n.key)}>
                                    {n.label}
                                </button>
                            ))}
                        </div>
                        <h3 className="mb-3 mt-6 font-sans text-xl font-black uppercase text-[#374191]">
                            And which matters <span className="text-[#F57D14]">least</span>?
                        </h3>
                        <div className="flex flex-col gap-2">
                            {items.map((n) => (
                                <button
                                    key={n.key}
                                    type="button"
                                    disabled={current.best === n.key}
                                    className={`${option(current.worst === n.key)} disabled:opacity-30`}
                                    onClick={() => pick(step.index, "worst", n.key)}
                                >
                                    {n.label}
                                </button>
                            ))}
                        </div>
                        {nextButton(!!current.best && !!current.worst, next)}
                    </>
                )
            })()}

            {step.kind === "tradeoff" && (() => {
                const t = TRADEOFFS[step.index]
                const chosen = tradeoffs[t.key as TradeoffKey]
                return (
                    <>
                        <h2 className="mb-5 font-sans text-2xl font-black uppercase leading-tight text-[#374191]">{t.question}</h2>
                        <div className="flex flex-col gap-3">
                            {(["a", "b"] as const).map((side) => (
                                <button
                                    key={side}
                                    type="button"
                                    className={option(chosen === side)}
                                    onClick={() => setTradeoffs((prev) => ({ ...prev, [t.key]: side }))}
                                >
                                    {t[side]}
                                </button>
                            ))}
                        </div>
                        {nextButton(!!chosen, next)}
                    </>
                )
            })()}

            {step.kind === "about" && (
                <>
                    <h2 className="mb-4 font-sans text-2xl font-black uppercase leading-tight text-[#374191]">How old are your kids?</h2>
                    <div className="flex flex-wrap gap-2">
                        {AGE_BANDS.map((band) => {
                            const on = ages.includes(band)
                            return (
                                <button
                                    key={band}
                                    type="button"
                                    onClick={() => setAges((prev) => (on ? prev.filter((a) => a !== band) : [...prev, band]))}
                                    className={`rounded-full border-2 border-[#374191] px-4 py-2 font-semibold text-[#374191] ${on ? "bg-[#FBD02E]" : "bg-white"}`}
                                >
                                    {band}
                                </button>
                            )
                        })}
                    </div>
                    <h3 className="mb-3 mt-6 font-sans text-xl font-black uppercase text-[#374191]">
                        What&apos;s your biggest worry about what your kid eats or drinks?
                    </h3>
                    <textarea
                        value={worry}
                        onChange={(e) => setWorry(e.target.value)}
                        maxLength={500}
                        rows={3}
                        placeholder="Optional"
                        className="w-full rounded-xl border-2 border-[#374191] bg-white p-3 text-base text-[#374191] outline-none"
                    />
                    {status === "error" && <p className="mt-2 font-mono text-xs font-bold uppercase text-red-500">Something went wrong. Please try again.</p>}
                    {nextButton(ages.length > 0 && status !== "sending", submit, status === "sending" ? "Sending..." : "Finish")}
                </>
            )}
        </div>
    )
}
