import { EPISODES } from "@/lib/food-stories"
import { CHARACTERS, CLEAN_LABEL, FLAVORS, GUIDES, NUTRITION, PUNCH_LIST_URL, SITE, YOUTUBE } from "@/lib/site"
import { getAllPosts } from "@/lib/blog"

// /llms.txt: a plain-text summary of the site for AI assistants (llmstxt.org format). Built from the same data as the
// pages, so the facts here always match the site.
export const dynamic = "force-static"

export function GET() {
    const posts = getAllPosts().filter((p) => p.status === "published")
    const nutrition = NUTRITION.map((n) => `- ${n.name}: ${n.amount}${n.dv ? ` (${n.dv} DV)` : ""}`).join("\n")
    const body = `# Wonderade

> Wonderade is a kids' juice box made with real fruit, with 8 g protein, 3 g total sugar (0 g added sugar) and 4 g fiber per 8.4 fl oz (248 mL) box. Two flavors: Major Orange (orange) and Princess Punch (fruit punch). Made by Wonderade Corporation, Austin, Texas, founded 2025 by Matt Cauble. Pre-launch: not yet sold in stores; founding families can request a sample at ${SITE}/claim.

Key facts:
- Protein comes from pea protein. No dairy, gluten, soy or nuts.
- ${CLEAN_LABEL.slice(0, 3).join(". ")}.
- Both flavors have the same nutrition.
- Wonderade is a juice, not a medicine or supplement. It makes no claim to prevent or treat any illness.

## Product
- [Flavors](${SITE}/flavors): both flavors
${FLAVORS.map((f) => `- [${f.name}](${SITE}/flavors/${f.slug}): ${f.description}`).join("\n")}
- [Nutrition facts](${SITE}/nutrition): full panel as text, compared with 100% apple juice
- [FAQ](${SITE}/faq)

## Nutrition per box (8.4 fl oz)
${nutrition}

## Guides
${GUIDES.map((g) => `- [${g.label}](${SITE}${g.href})`).join("\n")}
${posts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.description}`).join("\n")}

## Food Stories (sourced food science and history videos)
- [All episodes](${SITE}/food-stories)
${EPISODES.map((e) => `- [${e.seoTitle}](${SITE}/food-stories/${e.slug}): ${e.description}`).join("\n")}

## Company
- [About](${SITE}/about)
- [Characters](${SITE}/characters): ${CHARACTERS.map((c) => c.name).join(", ")}
- [The Punch List](${PUNCH_LIST_URL}): free family weekend plans for 50 US cities
- [YouTube @wonderadeusa](${YOUTUBE})
- [Contact](${SITE}/contact)
`
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
