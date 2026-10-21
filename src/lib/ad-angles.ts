// Message test (Oct 2026): one landing page per parent need, all on the same offer, so Meta ad sets can be compared
// on cost per signup. Box angles state product facts; "veggies" is need-led and only promises a say in what we make
// next (the box has no vegetables); "iron" pitches the iron + fiber packet as a coming-soon reservation.

export type AngleKey = "protein" | "gut" | "vitamins" | "veggies" | "iron"

export type Angle = {
    key: AngleKey
    eyebrow: string
    headline: string
    accent: string
    subhead: string
    bullets: string[]
    cta: string
    // true when the page promises a vote on future products rather than claiming the current box delivers it
    needLed: boolean
    // the juice-box photo only belongs on pages about the box
    showBox: boolean
}

export const ANGLES: Record<AngleKey, Angle> = {
    protein: {
        key: "protein",
        eyebrow: "Big & Strong Juice",
        headline: "8 grams of protein.",
        accent: "In a juice box.",
        subhead: "Kids think it's a treat. Grown-ups know it's more.",
        bullets: ["8g plant protein in every box", "0g added sugar, only 3g sugar total", "Real fruit, no artificial anything"],
        cta: "Claim my first batch",
        needLed: false,
        showBox: true,
    },
    gut: {
        key: "gut",
        eyebrow: "Better Gut Too",
        headline: "A juice box that's",
        accent: "good for their gut.",
        subhead: "Prebiotic fiber feeds the good bacteria. They just taste the fruit.",
        bullets: ["4g prebiotic fiber in every box", "0g added sugar, only 3g sugar total", "Real fruit, no artificial anything"],
        cta: "Claim my first batch",
        needLed: false,
        showBox: true,
    },
    vitamins: {
        key: "vitamins",
        eyebrow: "Sick Day Defense",
        headline: "The multivitamin",
        accent: "they'll actually drink.",
        subhead: "No chewables, no bribes. Just a juice box they ask for.",
        bullets: ["Vitamins C, D and B12, plus zinc and calcium", "0g added sugar, only 3g sugar total", "Real fruit, no artificial anything"],
        cta: "Claim my first batch",
        needLed: false,
        showBox: true,
    },
    veggies: {
        key: "veggies",
        eyebrow: "For picky eaters",
        headline: "Still fighting",
        accent: "the vegetable battle?",
        subhead: "We're building the juice box around what parents actually need. Join the founding families and help decide what goes in it.",
        bullets: ["Founding families shape what we make next", "Our first box: 8g protein, 4g fiber, 0g added sugar", "Real fruit, no artificial anything"],
        cta: "Join the founding families",
        needLed: true,
        showBox: true,
    },
    iron: {
        key: "iron",
        eyebrow: "Coming soon",
        headline: "A tasteless iron packet",
        accent: "for picky eaters.",
        subhead: "Stir it into yogurt, applesauce or oatmeal. They won't taste it. Reserve a spot in the first batch.",
        bullets: ["7mg iron in a gentle, kid-friendly form", "3g fiber to keep tummies happy", "No taste, no chewables, no bribes"],
        cta: "Reserve mine",
        needLed: false,
        showBox: false,
    },
}

export const ANGLE_KEYS = Object.keys(ANGLES) as AngleKey[]

export function isAngle(value: string | null | undefined): value is AngleKey {
    return !!value && value in ANGLES
}
