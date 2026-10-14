import { pageMeta } from "@/lib/site"

// The contact page is a client component, so its metadata lives here.
export const metadata = pageMeta({
    title: "Contact Wonderade",
    description: "Questions about Wonderade, the kids' juice box with 8g protein and 3g sugar? Send us a message.",
    path: "/contact",
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
