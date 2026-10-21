"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
    AGE_BANDS, CONCEPTS, DOING, DOING_LABELS, INTENT, INTENT_LABELS, KID_COUNTS, NUTRIENTS, RANK_SCREENS, THOUGHT,
    THOUGHT_LABELS, WORRY, WORRY_LABELS, type ConceptKey, type NutrientAnswer, type NutrientKey, type SurveyAnswer,
} from "@/lib/needs-survey"

type Nutrient = (typeof NUTRIENTS)[number]
type Step =
    | { kind: "worry" }
    | { kind: "nutrient"; index: number }
    | { kind: "rank"; index: number }
    | { kind: "concepts" }
    | { kind: "about" }

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

    // nutrient order, ranking screens and the order within them are shuffled once per visit to avoid position
    // bias; done after mount so the server render and the first client render match
    const [order, setOrder] = useState<{ nutrients: Nutrient[]; rank: Nutrient[][] } | null>(null)
    const [rank, setRank] = useState<{ best?: NutrientKey; worst?: NutrientKey }[]>([])
    useEffect(() => {
        const rankScreens = shuffle(RANK_SCREENS).map((s) => shuffle(s).map((i) => NUTRIENTS[i]))
        setOrder({ nutrients: shuffle([...NUTRIENTS]), rank: rankScreens })
        setRank(rankScreens.map(() => ({})))
    }, [])

    const steps: Step[] = useMemo(
        () =>
            order
                ? [
                      { kind: "worry" as const },
                      ...order.nutrients.map((_, index) => ({ kind: "nutrient" as const, index })),
                      ...order.rank.map((_, index) => ({ kind: "rank" as const, index })),
                      { kind: "concepts" as const },
                      { kind: "about" as const },
                  ]
                : [],
        [order]
    )

    const [stepIndex, setStepIndex] = useState(0)
    const [worry, setWorry] = useState("")
    const [nutrients, setNutrients] = useState<Partial<Record<NutrientKey, Partial<NutrientAnswer>>>>({})
    const [concepts, setConcepts] = useState<SurveyAnswer["concepts"]>({})
    const [ages, setAges] = useState<string[]>([])
    const [kids, setKids] = useState("")
    const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

    if (!order) return null

    const step = steps[stepIndex]
    const progress = Math.round((stepIndex / steps.length) * 100)
    const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1))

    const setNutrient = (key: NutrientKey, field: keyof NutrientAnswer, value: string) =>
        setNutrients((prev) => ({ ...prev, [key]: { ...prev[key], [field]: value } }))

    const pick = (screen: number, field: "best" | "worst", key: NutrientKey) => {
        setRank((prev) => {
            const copy = [...prev]
            const current = { ...copy[screen], [field]: key }
            // the same item can't be both most and least important
            if (field === "best" && current.worst === key) delete current.worst
            if (field === "worst" && current.best === key) delete current.best
            copy[screen] = current
            return copy
        })
    }

    const submit = async () => {
        setStatus("sending")
        const answer: SurveyAnswer = {
            worry: worry.slice(0, 500),
            nutrients: nutrients as SurveyAnswer["nutrients"],
            rank: rank.map((r) => ({ best: r.best as NutrientKey, worst: r.worst as NutrientKey })),
            concepts,
            ages,
            kids,
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
    const heading = "mb-5 font-sans text-2xl font-black uppercase leading-tight text-[#374191]"
    const option = (selected: boolean) =>
        `w-full rounded-xl border-2 border-[#374191] px-4 py-3 text-left font-semibold text-[#374191] transition ${
            selected ? "bg-[#FBD02E] shadow-[2px_2px_0px_#374191]" : "bg-white hover:bg-[#FFF6CC]"
        }`
    const chip = (selected: boolean) =>
        `rounded-full border-2 border-[#374191] px-4 py-2 text-sm font-semibold text-[#374191] ${selected ? "bg-[#FBD02E]" : "bg-white"}`
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

    if (status === "done") {
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

            {step.kind === "worry" && (
                <>
                    <h2 className={heading}>What, if anything, worries you about your kid&apos;s nutrition?</h2>
                    <textarea
                        value={worry}
                        onChange={(e) => setWorry(e.target.value)}
                        maxLength={500}
                        rows={4}
                        placeholder="In your own words. Or just tap Next if nothing comes to mind."
                        className="w-full rounded-xl border-2 border-[#374191] bg-white p-3 text-base text-[#374191] outline-none"
                    />
                    {nextButton(true, next)}
                </>
            )}

            {step.kind === "nutrient" && (() => {
                const n = order.nutrients[step.index]
                const a = nutrients[n.key] || {}
                const row = <T extends string>(
                    question: string,
                    values: readonly T[],
                    labels: Record<T, string>,
                    field: keyof NutrientAnswer
                ) => (
                    <div className="mb-5">
                        <p className="mb-2 font-semibold text-[#374191]">{question}</p>
                        <div className="flex flex-wrap gap-2">
                            {values.map((v) => (
                                <button key={v} type="button" className={chip(a[field] === v)} onClick={() => setNutrient(n.key, field, v)}>
                                    {labels[v]}
                                </button>
                            ))}
                        </div>
                    </div>
                )
                return (
                    <>
                        <p className="mb-1 font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/60">
                            {step.index + 1} of {order.nutrients.length}
                        </p>
                        <h2 className={heading}>{n.label}</h2>
                        {row(
                            n.key === "sugar"
                                ? "In the last month, have you thought about how much sugar your kid gets?"
                                : `In the last month, have you thought about whether your kid gets enough ${n.label.toLowerCase()}?`,
                            THOUGHT, THOUGHT_LABELS, "thought"
                        )}
                        {row("How worried are you about it?", WORRY, WORRY_LABELS, "worry")}
                        {row("What do you do about it today?", DOING, DOING_LABELS, "doing")}
                        {nextButton(!!a.thought && !!a.worry && !!a.doing, next)}
                    </>
                )
            })()}

            {step.kind === "rank" && (() => {
                const items = order.rank[step.index]
                const current = rank[step.index] || {}
                return (
                    <>
                        <p className="mb-1 font-mono text-xs font-bold uppercase tracking-widest text-[#374191]/60">
                            {step.index + 1} of {order.rank.length}
                        </p>
                        <h2 className={heading}>
                            Which matters <span className="text-[#F57D14]">most</span> to you for your kid?
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

            {step.kind === "concepts" && (
                <>
                    <h2 className={heading}>Would you buy these for your kid?</h2>
                    {CONCEPTS.map((c) => (
                        <div key={c.key} className="mb-5 rounded-xl border-2 border-[#374191] bg-white p-4">
                            <p className="font-semibold text-[#374191]">{c.label}</p>
                            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-[#F57D14]">{c.price}</p>
                            <div className="flex flex-wrap gap-2">
                                {INTENT.map((v) => (
                                    <button
                                        key={v}
                                        type="button"
                                        className={chip(concepts[c.key as ConceptKey] === v)}
                                        onClick={() => setConcepts((prev) => ({ ...prev, [c.key]: v }))}
                                    >
                                        {INTENT_LABELS[v]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {nextButton(CONCEPTS.every((c) => !!concepts[c.key as ConceptKey]), next)}
                </>
            )}

            {step.kind === "about" && (
                <>
                    <h2 className={heading}>How old are your kids?</h2>
                    <div className="flex flex-wrap gap-2">
                        {AGE_BANDS.map((band) => {
                            const on = ages.includes(band)
                            return (
                                <button key={band} type="button" className={chip(on)} onClick={() => setAges((prev) => (on ? prev.filter((a) => a !== band) : [...prev, band]))}>
                                    {band}
                                </button>
                            )
                        })}
                    </div>
                    <h3 className="mb-3 mt-6 font-sans text-xl font-black uppercase text-[#374191]">How many kids?</h3>
                    <div className="flex flex-wrap gap-2">
                        {KID_COUNTS.map((k) => (
                            <button key={k} type="button" className={chip(kids === k)} onClick={() => setKids(k)}>
                                {k}
                            </button>
                        ))}
                    </div>
                    {status === "error" && <p className="mt-3 font-mono text-xs font-bold uppercase text-red-500">Something went wrong. Please try again.</p>}
                    {nextButton(ages.length > 0 && !!kids && status !== "sending", submit, status === "sending" ? "Sending..." : "Finish")}
                </>
            )}
        </div>
    )
}
