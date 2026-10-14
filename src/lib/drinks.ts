// Kids' drink comparison data for the guide pages (/juice-box-sugar, /lunchbox-drinks, /protein-juice-box,
// /kids-juice-no-added-sugar).
//
// Every non-Wonderade row is a generic USDA FoodData Central (SR Legacy) entry, per 100 g, scaled to 248 g: the same
// 8.4 fl oz serving as one Wonderade box. Values are rounded and prefixed "about" because brands vary. No brand names.
// Wonderade figures come from NUTRITION in site.ts (the 2026-04-02 Nutrition Facts panel).

export const FDC_URL = "https://fdc.nal.usda.gov/"

export type DrinkRow = {
    name: string
    fdcId?: number
    calories: string
    sugar: string
    addedSugar: string
    protein: string
    fiber: string
    calcium: string
}

export const WONDERADE_ROW: DrinkRow = {
    name: "Wonderade (either flavor)",
    calories: "70",
    sugar: "3 g",
    addedSugar: "0 g",
    protein: "8 g",
    fiber: "4 g",
    calcium: "300 mg",
}

// Per 100 g (USDA SR Legacy): apple juice 173933: 46 kcal, 9.62 g sugars, 0.1 g protein, 0.2 g fiber, 8 mg Ca.
// Grape juice 173042: 60 kcal, 14.2 g sugars, 0.37 g protein, 0.2 g fiber, 11 mg Ca.
// Fruit punch drink, with added nutrients, canned 174151: 47 kcal, 11.3 g sugars, 0 g protein, 0.2 g fiber, 8 mg Ca.
// Milk, reduced fat 2% 171267: 50 kcal, 5.06 g sugars, 3.3 g protein, 0 g fiber, 120 mg Ca.
// Chocolate milk, reduced fat 170880: 76 kcal, 9.55 g sugars, 2.99 g protein, 0.7 g fiber, 109 mg Ca.
// Almond milk, unsweetened, shelf stable 174832: 15 kcal, 0.81 g sugars, 0.4 g protein, 0.2 g fiber, 184 mg Ca.
export const DRINKS: DrinkRow[] = [
    { name: "Water", calories: "0", sugar: "0 g", addedSugar: "0 g", protein: "0 g", fiber: "0 g", calcium: "varies" },
    { name: "100% apple juice", fdcId: 173933, calories: "about 115", sugar: "about 24 g", addedSugar: "0 g", protein: "less than 1 g", fiber: "less than 1 g", calcium: "about 20 mg" },
    { name: "100% grape juice", fdcId: 173042, calories: "about 150", sugar: "about 35 g", addedSugar: "0 g", protein: "about 1 g", fiber: "less than 1 g", calcium: "about 25 mg" },
    { name: "Fruit punch drink (not 100% juice)", fdcId: 174151, calories: "about 115", sugar: "about 28 g", addedSugar: "usually most of it", protein: "0 g", fiber: "less than 1 g", calcium: "about 20 mg" },
    { name: "2% milk", fdcId: 171267, calories: "about 125", sugar: "about 13 g", addedSugar: "0 g", protein: "about 8 g", fiber: "0 g", calcium: "about 300 mg" },
    { name: "Chocolate milk, reduced fat", fdcId: 170880, calories: "about 190", sugar: "about 24 g", addedSugar: "usually some", protein: "about 7 g", fiber: "about 2 g", calcium: "about 270 mg" },
    { name: "Almond milk, unsweetened", fdcId: 174832, calories: "about 35", sugar: "about 2 g", addedSugar: "0 g", protein: "about 1 g", fiber: "less than 1 g", calcium: "about 455 mg (fortified)" },
]

export const GUIDANCE = {
    aapJuice: {
        text: "The American Academy of Pediatrics advises no juice before age 1, no more than 4 oz a day for ages 1 to 3, 4 to 6 oz for ages 4 to 6, and no more than 8 oz for ages 7 to 18. It recommends whole fruit over juice.",
        source: "HealthyChildren.org (American Academy of Pediatrics), Where We Stand: Fruit Juice",
        url: "https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Where-We-Stand-Fruit-Juice.aspx",
    },
    ahaSugar: {
        text: "The American Heart Association recommends that children ages 2 to 18 have less than 25 grams (about 6 teaspoons) of added sugar a day, and none before age 2.",
        source: "Vos et al., Added Sugars and Cardiovascular Disease Risk in Children, Circulation 2017 (American Heart Association scientific statement)",
        url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000439",
    },
    proteinRda: {
        text: "The Recommended Dietary Allowance for protein is 13 g a day for ages 1 to 3, 19 g for ages 4 to 8, and 34 g for ages 9 to 13.",
        source: "Dietary Guidelines for Americans, 2020-2025, Appendix 1",
        url: "https://www.dietaryguidelines.gov/sites/default/files/2021-03/Dietary_Guidelines_for_Americans-2020-2025.pdf",
    },
    fdaAddedSugar: {
        text: "Since the updated Nutrition Facts label, packaged foods list \"Includes Added Sugars\" under Total Sugars. Added sugars include sugars added during processing, syrups and honey, and sugars from concentrated fruit or vegetable juices beyond what the same volume of 100% juice would contain.",
        source: "U.S. Food and Drug Administration, Added Sugars on the Nutrition Facts Label",
        url: "https://www.fda.gov/food/nutrition-facts-label/added-sugars-nutrition-facts-label",
    },
    fdaNoAddedSugar: {
        text: "Under FDA rules, a \"no added sugar\" claim means no sugar or sugar-containing ingredient (including juice concentrate used as a sweetener) was added during processing. It does not mean low in sugar: the fruit's own sugar still counts in Total Sugars.",
        source: "21 CFR 101.60(c)(2), Electronic Code of Federal Regulations",
        url: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-101/subpart-D/section-101.60",
    },
}

export const COMPARISON_NOTE =
    "Non-Wonderade rows: USDA FoodData Central (SR Legacy) generic entries, scaled from 100 g to 248 g (one 8.4 fl oz serving) and rounded; FDC IDs listed. Brands vary, so check the label on yours. Wonderade figures are from its Nutrition Facts panel."
