import type { Metadata } from "next"

// One source of truth for brand facts used by metadata, JSON-LD, llms.txt, the flavor pages and /nutrition.
//
// NUTRITION SOURCE: the Nutrition Facts panels dated 2026-04-02 (identical for both flavors), in the ops vault at
// packaging/WND-001-fruit-punch/nutrition-facts/ and packaging/WND-002-orange/nutrition-facts/.
// Those panels predate the 2026-04-28 formula revision. Re-check every number here against the new panel before it
// prints, and update this file only (everything else reads from it).
//
// Zinc: the panel prints 3 mg = 30% DV, but 3 / 11 mg (the FDA Daily Value) = 27%, which FDA rounding (nearest 5%
// between 10% and 50%) makes 25%. Until the label is corrected we publish zinc in milligrams only, no %DV.

export const SITE = "https://www.wonderade.us"
export const BRAND = "Wonderade"
export const LEGAL_NAME = "Wonderade Corporation"
export const TAGLINE = "The juice you wish you had when you were growing up."
export const YOUTUBE = "https://www.youtube.com/@wonderadeusa"
export const LOGO = `${SITE}/wonderade-logo.png`

export type NutrientRow = { name: string; amount: string; dv?: string; indent?: boolean }

// Per box, from the 2026-04-02 panel.
export const NUTRITION: NutrientRow[] = [
    { name: "Calories", amount: "70" },
    { name: "Total Fat", amount: "1 g", dv: "1%" },
    { name: "Saturated Fat", amount: "1 g", dv: "5%", indent: true },
    { name: "Trans Fat", amount: "0 g", indent: true },
    { name: "Cholesterol", amount: "0 mg", dv: "0%" },
    { name: "Sodium", amount: "70 mg", dv: "3%" },
    { name: "Total Carbohydrate", amount: "9 g", dv: "3%" },
    { name: "Dietary Fiber", amount: "4 g", dv: "15%", indent: true },
    { name: "Total Sugars", amount: "3 g", indent: true },
    { name: "Includes Added Sugars", amount: "0 g", dv: "0%", indent: true },
    { name: "Protein", amount: "8 g" },
    { name: "Vitamin D", amount: "2.6 mcg", dv: "15%" },
    { name: "Calcium", amount: "300 mg", dv: "25%" },
    { name: "Iron", amount: "0.3 mg", dv: "2%" },
    { name: "Potassium", amount: "500 mg", dv: "10%" },
    { name: "Vitamin A", amount: "150 mcg RAE", dv: "15%" },
    { name: "Vitamin C", amount: "72 mg", dv: "80%" },
    { name: "Riboflavin (B2)", amount: "0.41 mg", dv: "30%" },
    { name: "Vitamin B12", amount: "1.21 mcg", dv: "50%" },
    { name: "Phosphorus", amount: "250 mg", dv: "20%" },
    { name: "Magnesium", amount: "30 mg", dv: "8%" },
    { name: "Zinc", amount: "3 mg" },
]

export const HEADLINE_FACTS = [
    "8 g protein",
    "3 g total sugar, 0 g added sugar",
    "4 g fiber",
    "70 calories",
    "80% DV vitamin C",
    "25% DV calcium",
]

export const CLEAN_LABEL = [
    "No artificial sweeteners",
    "No artificial colors",
    "No high fructose corn syrup",
    "No dairy, gluten, soy or nuts",
]

// Reference for comparisons: USDA FoodData Central #173933, "Apple juice, canned or bottled, unsweetened, without
// added ascorbic acid" (per 100 g: 46 kcal, 9.62 g sugars, 0.1 g protein, 0.2 g fiber, 8 mg calcium, 101 mg potassium),
// scaled to 248 g, the same serving as one Wonderade box. Rounded the way a label would round.
export const APPLE_JUICE_REF = {
    source: "USDA FoodData Central #173933 (100% apple juice, unsweetened), scaled to the same 8.4 fl oz serving",
    url: "https://fdc.nal.usda.gov/",
    rows: [
        { name: "Calories", wonderade: "70", juice: "about 110" },
        { name: "Total sugars", wonderade: "3 g", juice: "about 24 g" },
        { name: "Added sugars", wonderade: "0 g", juice: "0 g" },
        { name: "Protein", wonderade: "8 g", juice: "less than 1 g" },
        { name: "Fiber", wonderade: "4 g", juice: "less than 1 g" },
        { name: "Calcium", wonderade: "300 mg", juice: "about 20 mg" },
        { name: "Potassium", wonderade: "500 mg", juice: "about 250 mg" },
    ],
}

export type Flavor = {
    slug: string
    name: string
    short: string
    image: string
    imageAlt: string
    description: string
    taste: string
    color: string
}

export const FLAVORS: Flavor[] = [
    {
        slug: "major-orange",
        name: "Major Orange",
        short: "Orange",
        image: "/assets/packaging/major-orange-bottle.png",
        imageAlt: "Wonderade Major Orange juice box: 8 grams protein, 3 grams sugar, made with real fruit",
        description:
            "Major Orange is Wonderade's orange juice box for kids: real fruit and real orange extract, 8 g of protein, 3 g of total sugar with none added, and 4 g of fiber in a single-serve box.",
        taste:
            "Real fruit and real orange extract, combined with sweeteners from nature, for that classic orange juice taste without added sugar or artificial sweeteners.",
        color: "#F68C1E",
    },
    {
        slug: "princess-punch",
        name: "Princess Punch",
        short: "Fruit punch",
        image: "/assets/packaging/princess-punch-bottle.png",
        imageAlt: "Wonderade Princess Punch juice box: 8 grams protein, 3 grams sugar, made with real fruit",
        description:
            "Princess Punch is Wonderade's fruit punch juice box for kids: made with real fruit, 8 g of protein, 3 g of total sugar with none added, and 4 g of fiber in a single-serve box.",
        taste: "A fruit punch made with real fruit and sweeteners from nature, with no added sugar and no artificial sweeteners.",
        color: "#ED1E7A",
    },
]

export const PRODUCT_FAQ: { question: string; answer: string }[] = [
    {
        question: "How much sugar is in a Wonderade?",
        answer: "3 grams of total sugar per box, and 0 grams of added sugar. The sweetness comes from real fruit and sweeteners from nature.",
    },
    {
        question: "How much protein is in a Wonderade?",
        answer: "8 grams per box, from pea protein. For scale, a cup of milk has about 8 grams of protein (USDA FoodData Central).",
    },
    {
        question: "Is Wonderade dairy free?",
        answer: "Yes. Wonderade has no dairy. It also has no gluten, soy or nuts. The protein comes from peas.",
    },
    {
        question: "Does Wonderade use artificial sweeteners or colors?",
        answer: "No. There are no artificial sweeteners, no artificial colors and no high fructose corn syrup.",
    },
    {
        question: "Is it juice or a protein shake?",
        answer: "It is a juice. It drinks like a juice box, straight from the box, with the protein, fiber and vitamins built in.",
    },
    {
        question: "Where can I buy Wonderade?",
        answer: "Wonderade is in pre-launch. Founding families can claim a free sample at wonderade.us/claim before it goes on sale.",
    },
]

export function jsonLd(data: unknown): string {
    // Escape "<" so a string in the data can never close the script tag.
    return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: BRAND,
        legalName: LEGAL_NAME,
        url: SITE,
        logo: LOGO,
        slogan: TAGLINE,
        description:
            "Wonderade makes kids' juice boxes with 8 g of protein, 3 g of sugar (0 g added) and 4 g of fiber, made with real fruit.",
        foundingDate: "2025-09-12",
        founder: { "@type": "Person", name: "Matt Cauble", jobTitle: "Founder" },
        address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
        sameAs: [YOUTUBE],
    }
}

export function websiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        name: BRAND,
        url: SITE,
        publisher: { "@id": `${SITE}/#organization` },
    }
}

// Pre-launch: no price and nothing on sale yet, so `offers` stays out until OFFER (below) is filled in. Google only shows
// product rich results with offers or reviews; Search Console will flag "missing offers" until then, which is expected.
export function productJsonLd(f: Flavor) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${SITE}/flavors/${f.slug}#product`,
        name: `${BRAND} ${f.name}`,
        description: f.description,
        image: [`${SITE}${f.image}`],
        url: `${SITE}/flavors/${f.slug}`,
        category: "Kids' juice",
        brand: { "@type": "Brand", name: BRAND },
        manufacturer: { "@id": `${SITE}/#organization` },
        ...(offerJsonLd() ? { offers: offerJsonLd() } : {}),
        size: "8.4 fl oz (248 mL) box",
        audience: { "@type": "PeopleAudience", audienceType: "Children" },
        additionalProperty: NUTRITION.filter((n) => !n.name.startsWith("Includes")).map((n) => ({
            "@type": "PropertyValue",
            name: n.name,
            value: n.dv ? `${n.amount} (${n.dv} DV)` : n.amount,
        })),
    }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${SITE}${it.path}`,
        })),
    }
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    }
}

// ---------------------------------------------------------------------------------------------------------------
// Page metadata. Next.js replaces (does not merge) openGraph/twitter objects from the root layout, so every page builds
// its full set here: one canonical, og:url that matches it, and an image on every share card.
// ---------------------------------------------------------------------------------------------------------------
export const DEFAULT_OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Wonderade Major Orange and Princess Punch juice boxes" }

export function pageMeta(opts: {
    title: string
    description: string
    path: string
    image?: { url: string; width?: number; height?: number; alt: string }
    type?: "website" | "article"
    publishedTime?: string
    absoluteTitle?: boolean
    noindex?: boolean
}): Metadata {
    const image = opts.image ?? DEFAULT_OG_IMAGE
    return {
        // Titles that already name the brand skip the "| Wonderade" suffix so they aren't cut off in results.
        title: opts.absoluteTitle || opts.title.includes(BRAND) ? { absolute: opts.title } : opts.title,
        description: opts.description,
        alternates: { canonical: opts.path },
        robots: opts.noindex ? { index: false, follow: true } : undefined,
        openGraph: {
            type: opts.type ?? "website",
            url: opts.path,
            siteName: BRAND,
            locale: "en_US",
            title: opts.title,
            description: opts.description,
            images: [image],
            ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: opts.title,
            description: opts.description,
            images: [{ url: image.url, alt: image.alt }],
        },
    }
}

// ---------------------------------------------------------------------------------------------------------------
// Offers. Wonderade is pre-launch: nothing is for sale, so Product JSON-LD carries no Offer. When checkout opens, fill
// this in (price per pack, the pack size in the name) and productJsonLd() starts emitting it. Never invent a price.
// ---------------------------------------------------------------------------------------------------------------
export const OFFER: null | { price: string; priceCurrency: "USD"; availability: "InStock" | "PreOrder" | "OutOfStock"; url: string } = null

export function offerJsonLd() {
    if (!OFFER) return undefined
    return {
        "@type": "Offer",
        price: OFFER.price,
        priceCurrency: OFFER.priceCurrency,
        availability: `https://schema.org/${OFFER.availability}`,
        url: OFFER.url,
        seller: { "@id": `${SITE}/#organization` },
    }
}

// ---------------------------------------------------------------------------------------------------------------
// The Wonderade characters. (Honey Bear belongs to Swapsies, a separate product: never list it here.)
// ---------------------------------------------------------------------------------------------------------------
export const CHARACTERS = [
    {
        slug: "major-orange",
        name: "Major Orange",
        image: "/characters/major-orange.png",
        imageAlt: "Major Orange, a muscly cartoon orange in green pants and purple boots, flexing",
        role: "The face of the orange flavor",
        description:
            "Major Orange is a muscly cartoon orange with green pants, a brown belt and purple boots with gold stars. He is usually flexing. He is the face of the Major Orange box and co-hosts Food Stories with Princess Punch.",
        flavor: "major-orange",
    },
    {
        slug: "princess-punch",
        name: "Princess Punch",
        image: "/characters/princess-punch.png",
        imageAlt: "Princess Punch, a unicorn with pink braided hair and purple boxing gloves",
        role: "The face of the fruit punch flavor",
        description:
            "Princess Punch is a unicorn with pink braided hair, a ruby horn, a yellow shirt and purple boxing gloves with gold stars. She is the face of the Princess Punch box and co-hosts Food Stories with Major Orange.",
        flavor: "princess-punch",
    },
    {
        slug: "pip",
        name: "Pip",
        image: "/characters/pip.png",
        imageAlt: "Pip, a small yellow star character",
        role: "The sidekick in the logo",
        description:
            "Pip is a small, friendly yellow star. Pip lives in the O of the Wonderade logo and pops up on its own around the brand.",
        flavor: null,
    },
] as const

// ---------------------------------------------------------------------------------------------------------------
// The Wonderade Punch List: free family weekend plans, a separate site at punchlist.wonderade.us.
// City list copied from https://punchlist.wonderade.us/ on 2026-10-14. If a city is added there, add it here.
// ---------------------------------------------------------------------------------------------------------------
export const PUNCH_LIST_URL = "https://punchlist.wonderade.us/"

export const PUNCH_LIST_CITIES: { slug: string; name: string; region: "Northeast" | "Midwest" | "South" | "West" }[] = [
    { slug: "hartford", name: "Hartford", region: "Northeast" },
    { slug: "boston", name: "Boston", region: "Northeast" },
    { slug: "new-york", name: "New York City", region: "Northeast" },
    { slug: "philadelphia", name: "Philadelphia", region: "Northeast" },
    { slug: "pittsburgh", name: "Pittsburgh", region: "Northeast" },
    { slug: "providence", name: "Providence", region: "Northeast" },
    { slug: "chicago", name: "Chicago", region: "Midwest" },
    { slug: "indianapolis", name: "Indianapolis", region: "Midwest" },
    { slug: "grand-rapids", name: "Grand Rapids", region: "Midwest" },
    { slug: "detroit", name: "Metro Detroit", region: "Midwest" },
    { slug: "minneapolis-st-paul", name: "Twin Cities", region: "Midwest" },
    { slug: "kansas-city", name: "Kansas City", region: "Midwest" },
    { slug: "st-louis", name: "St. Louis", region: "Midwest" },
    { slug: "cincinnati", name: "Cincinnati", region: "Midwest" },
    { slug: "cleveland", name: "Cleveland", region: "Midwest" },
    { slug: "columbus", name: "Columbus", region: "Midwest" },
    { slug: "milwaukee", name: "Milwaukee", region: "Midwest" },
    { slug: "birmingham", name: "Birmingham", region: "South" },
    { slug: "washington-dc", name: "Washington, DC", region: "South" },
    { slug: "jacksonville", name: "Jacksonville", region: "South" },
    { slug: "orlando", name: "Orlando", region: "South" },
    { slug: "miami", name: "South Florida", region: "South" },
    { slug: "tampa-bay", name: "Tampa Bay", region: "South" },
    { slug: "atlanta", name: "Atlanta", region: "South" },
    { slug: "louisville", name: "Louisville", region: "South" },
    { slug: "baltimore", name: "Baltimore", region: "South" },
    { slug: "charlotte", name: "Charlotte", region: "South" },
    { slug: "raleigh", name: "Raleigh", region: "South" },
    { slug: "oklahoma-city", name: "Oklahoma City", region: "South" },
    { slug: "memphis", name: "Memphis", region: "South" },
    { slug: "nashville", name: "Nashville", region: "South" },
    { slug: "austin", name: "Austin", region: "South" },
    { slug: "dallas-fort-worth", name: "Dallas-Fort Worth", region: "South" },
    { slug: "houston", name: "Houston", region: "South" },
    { slug: "san-antonio", name: "San Antonio", region: "South" },
    { slug: "hampton-roads", name: "Hampton Roads", region: "South" },
    { slug: "richmond", name: "Richmond", region: "South" },
    { slug: "phoenix", name: "Phoenix", region: "West" },
    { slug: "san-francisco", name: "Bay Area", region: "West" },
    { slug: "fresno", name: "Fresno", region: "West" },
    { slug: "inland-empire", name: "Inland Empire", region: "West" },
    { slug: "los-angeles", name: "Los Angeles", region: "West" },
    { slug: "sacramento", name: "Sacramento", region: "West" },
    { slug: "san-diego", name: "San Diego", region: "West" },
    { slug: "san-jose", name: "San Jose", region: "West" },
    { slug: "denver", name: "Denver", region: "West" },
    { slug: "las-vegas", name: "Las Vegas", region: "West" },
    { slug: "portland", name: "Portland", region: "West" },
    { slug: "salt-lake-city", name: "Salt Lake City", region: "West" },
    { slug: "seattle", name: "Seattle", region: "West" },
]

// ---------------------------------------------------------------------------------------------------------------
// Site links, shared by the header, footer, homepage and sitemap.
// ---------------------------------------------------------------------------------------------------------------
export const GUIDES = [
    { href: "/protein-juice-box", label: "What is a protein juice box?" },
    { href: "/juice-box-sugar", label: "Sugar in juice boxes, compared" },
    { href: "/lunchbox-drinks", label: "Lunchbox drinks, compared" },
    { href: "/kids-juice-no-added-sugar", label: "Kids' juice with no added sugar" },
]

export const FOOTER_LINKS = {
    product: [
        { href: "/flavors", label: "All flavors" },
        { href: "/flavors/major-orange", label: "Major Orange" },
        { href: "/flavors/princess-punch", label: "Princess Punch" },
        { href: "/nutrition", label: "Nutrition facts" },
        { href: "/claim", label: "Claim a sample" },
    ],
    learn: [
        { href: "/food-stories", label: "Food Stories" },
        { href: "/blog", label: "Parent guides" },
        ...GUIDES,
        { href: "/faq", label: "FAQ" },
    ],
    company: [
        { href: "/about", label: "About" },
        { href: "/characters", label: "Characters" },
        { href: "/punch-list", label: "The Punch List" },
        { href: "/contact", label: "Contact" },
    ],
}

export function articleJsonLd(a: { headline: string; description: string; path: string; date: string; image?: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.headline,
        description: a.description,
        datePublished: a.date,
        dateModified: a.date,
        author: { "@type": "Organization", "@id": `${SITE}/#organization`, name: BRAND, url: SITE },
        publisher: { "@type": "Organization", "@id": `${SITE}/#organization`, name: BRAND, logo: { "@type": "ImageObject", url: LOGO } },
        mainEntityOfPage: `${SITE}${a.path}`,
        image: [`${SITE}${a.image ?? "/og.png"}`],
    }
}
