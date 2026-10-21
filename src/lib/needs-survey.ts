// Parent-needs survey (Oct 2026). Best-worst scaling: each screen shows 4 needs and the parent picks the most and
// least important. 8 needs x 6 screens, each need shown 3 times, so score = (times best - times worst) / 3, in [-1, 1].

export const NEEDS = [
    { key: "protein", label: "More protein" },
    { key: "gut", label: "Gut health (fiber + probiotics)" },
    { key: "vitamins", label: "Daily vitamins" },
    { key: "veggies", label: "More vegetables" },
    { key: "iron", label: "More iron" },
    { key: "low_sugar", label: "Less sugar" },
    { key: "taste", label: "Taste they actually love" },
    { key: "clean", label: "No artificial ingredients" },
] as const

export type NeedKey = (typeof NEEDS)[number]["key"]

// indexes into NEEDS; every need appears exactly 3 times
export const SCREENS: number[][] = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 2, 4, 6],
    [1, 3, 5, 7],
    [0, 3, 5, 6],
    [1, 2, 4, 7],
]

export const TRADEOFFS = [
    {
        key: "price_vs_protein",
        question: "Which would you rather buy?",
        a: "8g protein, $2.50 a box",
        b: "3g protein, $2.00 a box",
    },
    {
        key: "protein_vs_gut",
        question: "If you could only pick one, which matters more?",
        a: "Extra protein",
        b: "Gut health (fiber + probiotics)",
    },
    {
        key: "sweet_vs_protein",
        question: "Which would your kid be more likely to finish?",
        a: "Sweeter, with less protein",
        b: "A little less sweet, with more protein",
    },
    {
        key: "box_vs_powder",
        question: "Which format fits your family better?",
        a: "Ready-to-drink juice box",
        b: "Powder you mix with water or milk",
    },
] as const

export type TradeoffKey = (typeof TRADEOFFS)[number]["key"]

export const AGE_BANDS = ["Under 2", "2-4", "5-8", "9-12", "13+"] as const

export type SurveyAnswer = {
    screens: { best: NeedKey; worst: NeedKey }[]
    tradeoffs: Partial<Record<TradeoffKey, "a" | "b">>
    ages: string[]
    worry: string
}

export function scoreNeeds(screens: SurveyAnswer["screens"]): Record<NeedKey, number> {
    const scores = Object.fromEntries(NEEDS.map((n) => [n.key, 0])) as Record<NeedKey, number>
    for (const s of screens) {
        if (s.best in scores) scores[s.best] += 1
        if (s.worst in scores) scores[s.worst] -= 1
    }
    for (const key of Object.keys(scores) as NeedKey[]) scores[key] = Math.round((scores[key] / 3) * 100) / 100
    return scores
}
