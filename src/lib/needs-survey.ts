// Parent-needs survey (Oct 2026). Question it answers: do parents think about these nutrients at all, and would
// they buy something for them today? Taps only up front (per-nutrient awareness/worry/behaviour, a best-worst
// ranking, priced product concepts); the one free-text question is optional and comes last.

export const NUTRIENTS = [
    { key: "iron", label: "Iron" },
    { key: "protein", label: "Protein" },
    { key: "calcium", label: "Calcium" },
    { key: "fiber", label: "Fiber" },
    { key: "vitamin_d", label: "Vitamin D" },
    { key: "probiotics", label: "Probiotics / gut health" },
    { key: "veggies", label: "Vegetables" },
    { key: "sugar", label: "Too much sugar" },
] as const

export type NutrientKey = (typeof NUTRIENTS)[number]["key"]

export const THOUGHT = ["never", "once_or_twice", "often"] as const
export const WORRY = ["not_at_all", "a_little", "very"] as const
export const DOING = ["nothing", "food_choices", "buys_product"] as const

export const THOUGHT_LABELS: Record<(typeof THOUGHT)[number], string> = { never: "Never", once_or_twice: "Once or twice", often: "Often" }
export const WORRY_LABELS: Record<(typeof WORRY)[number], string> = { not_at_all: "Not at all", a_little: "A little", very: "Very" }
export const DOING_LABELS: Record<(typeof DOING)[number], string> = {
    nothing: "Nothing",
    food_choices: "Food choices",
    buys_product: "A supplement or special product",
}

export type NutrientAnswer = { thought: (typeof THOUGHT)[number]; worry: (typeof WORRY)[number]; doing: (typeof DOING)[number] }

// best-worst screens: indexes into NUTRIENTS, every nutrient shown exactly twice
export const RANK_SCREENS: number[][] = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 2, 4, 6],
    [1, 3, 5, 7],
]
export const RANK_APPEARANCES = 2

export const CONCEPTS = [
    { key: "iron_packet", label: "A tasteless iron + fiber packet you stir into their food", price: "99¢ a packet" },
    { key: "protein_box", label: "A protein juice box", price: "$2.49 a box" },
    { key: "fiber_vitamin_box", label: "A juice box with fiber + vitamins", price: "$1.50 a box" },
] as const

export type ConceptKey = (typeof CONCEPTS)[number]["key"]
export const INTENT = ["definitely", "probably", "not_sure", "no"] as const
export const INTENT_LABELS: Record<(typeof INTENT)[number], string> = {
    definitely: "Definitely",
    probably: "Probably",
    not_sure: "Not sure",
    no: "No",
}

export const AGE_BANDS = ["Under 5", "5-10", "Over 10"] as const
export const KID_COUNTS = ["1", "2", "3", "4+"] as const

export type SurveyAnswer = {
    worry: string
    nutrients: Partial<Record<NutrientKey, NutrientAnswer>>
    rank: { best: NutrientKey; worst: NutrientKey }[]
    concepts: Partial<Record<ConceptKey, (typeof INTENT)[number]>>
    ages: string[]
    kids: string
}

export function rankScores(rank: SurveyAnswer["rank"]): Record<NutrientKey, number> {
    const scores = Object.fromEntries(NUTRIENTS.map((n) => [n.key, 0])) as Record<NutrientKey, number>
    for (const r of rank) {
        if (r.best in scores) scores[r.best] += 1
        if (r.worst in scores) scores[r.worst] -= 1
    }
    for (const key of Object.keys(scores) as NutrientKey[]) scores[key] = Math.round((scores[key] / RANK_APPEARANCES) * 100) / 100
    return scores
}
