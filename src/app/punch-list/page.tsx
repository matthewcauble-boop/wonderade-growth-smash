import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { PageHero, Section, H2, TextLink } from "@/components/seo/page-parts"
import { PUNCH_LIST_CITIES, PUNCH_LIST_URL, SITE, pageMeta } from "@/lib/site"

export const metadata = pageMeta({
    title: "The Wonderade Punch List: Free Family Weekend Plans for 50 US Cities",
    description:
        "The Punch List is Wonderade's free family weekend guide: plans for 50 US cities every Friday, fitted to the weather, plus dinner ideas from local grocery deals.",
    path: "/punch-list",
})

const REGIONS = ["Northeast", "Midwest", "South", "West"] as const

export default function PunchListPage() {
    const site = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Wonderade Punch List",
        url: PUNCH_LIST_URL,
        description: "Free family weekend plans for 50 US cities, every Friday morning.",
        publisher: { "@id": `${SITE}/#organization` },
    }
    return (
        <>
            <Header />
            <main className="bg-white text-[#1f2340]">
                <JsonLd data={site} />
                <PageHero
                    crumbs={[{ name: "The Punch List", path: "/punch-list" }]}
                    title="The Wonderade Punch List"
                    lede={
                        <>
                            <p>
                                &quot;What should we do this weekend?&quot; The Punch List answers it for free, every Friday morning:
                                family weekend plans for your town, fitted to the weather, plus dinner from the grocery deals near
                                you. It covers 50 US cities.
                            </p>
                            <p className="mt-4">
                                <a
                                    href={PUNCH_LIST_URL}
                                    className="inline-block border-2 border-[#374191] bg-[#374191] px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#374191]"
                                >
                                    Open the Punch List
                                </a>
                            </p>
                        </>
                    }
                />
                {REGIONS.map((r, i) => (
                    <Section key={r} tone={i % 2 ? "cream" : "white"}>
                        <H2>{r}</H2>
                        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-lg sm:grid-cols-3">
                            {PUNCH_LIST_CITIES.filter((c) => c.region === r).map((c) => (
                                <li key={c.slug}>
                                    <a
                                        className="font-bold text-[#EF4B61] underline underline-offset-2 hover:text-[#374191]"
                                        href={`${PUNCH_LIST_URL}${c.slug}/`}
                                    >
                                        {c.name} weekend plans
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Section>
                ))}
                <Section>
                    <H2>Made by Wonderade</H2>
                    <p className="mt-3 text-lg">
                        The Punch List is made by Wonderade, the kids&apos; juice box with 8 g protein and 3 g sugar. Each city page
                        keeps an archive of past weekends. Want more to do at home? Try a{" "}
                        <TextLink href="/food-stories">Food Story</TextLink> with the kids.
                    </p>
                </Section>
            </main>
            <Footer />
        </>
    )
}
