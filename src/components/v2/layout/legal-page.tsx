import { Header } from "@/components/v2/layout/header"
import { Footer } from "@/components/v2/layout/footer"

// Plain reading layout for the policy pages (privacy, SMS terms).
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
    return (
        <main className="relative min-h-screen bg-white font-sans flex flex-col">
            <Header />
            <article className="mx-auto w-full max-w-2xl flex-grow px-4 py-16 text-[#374191] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-black [&_h2]:uppercase [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1 [&_a]:underline">
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{title}</h1>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[#374191]/60 font-bold">Last updated {updated}</p>
                {children}
            </article>
            <Footer />
        </main>
    )
}
