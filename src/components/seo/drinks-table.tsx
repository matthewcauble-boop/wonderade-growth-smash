import { DataTable } from "@/components/seo/page-parts"
import { DRINKS, WONDERADE_ROW, COMPARISON_NOTE, FDC_URL, type DrinkRow } from "@/lib/drinks"

type Col = "calories" | "sugar" | "addedSugar" | "protein" | "fiber" | "calcium"

const LABELS: Record<Col, string> = {
    calories: "Calories",
    sugar: "Total sugar",
    addedSugar: "Added sugar",
    protein: "Protein",
    fiber: "Fiber",
    calcium: "Calcium",
}

// Kids' drinks side by side, one 8.4 fl oz serving each. Server-rendered so the numbers are in the HTML.
export function DrinksTable({
    caption = "Kids' drinks compared, per 8.4 fl oz serving",
    cols = ["calories", "sugar", "addedSugar", "protein", "fiber"],
    includeWater = true,
}: {
    caption?: string
    cols?: Col[]
    includeWater?: boolean
}) {
    const rows: DrinkRow[] = [...DRINKS.filter((d) => includeWater || d.name !== "Water"), WONDERADE_ROW]
    return (
        <DataTable
            caption={caption}
            head={["Drink", ...cols.map((c) => LABELS[c])]}
            rows={rows.map((r) => [r.fdcId ? `${r.name} (FDC ${r.fdcId})` : r.name, ...cols.map((c) => r[c])])}
            note={
                <>
                    {COMPARISON_NOTE} Look up any FDC ID at{" "}
                    <a className="underline" href={FDC_URL} rel="noopener">USDA FoodData Central</a>.
                </>
            }
        />
    )
}
