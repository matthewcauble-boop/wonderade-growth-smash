import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/v2/layout/legal-page"

export const metadata: Metadata = { title: "Privacy Policy | Wonderade", description: "How Wonderade handles your information." }

export default function PrivacyPage() {
    return (
        <LegalPage title="Privacy Policy" updated="October 6, 2026">
            <p>
                This policy explains what Wonderade Corporation (&quot;Wonderade&quot;, &quot;we&quot;) collects on wonderade.us and
                what we do with it.
            </p>
            <h2>What we collect</h2>
            <ul>
                <li>What you give us: your email address, name and shipping address when you claim a sample, and your mobile number if you choose to add it.</li>
                <li>What you send through our contact form.</li>
                <li>Basic site analytics, such as pages visited and the device and browser used.</li>
            </ul>
            <h2>How we use it</h2>
            <ul>
                <li>To ship the samples and orders you ask for.</li>
                <li>To send you emails about Wonderade. Every email has an unsubscribe link.</li>
                <li>To send you texts, only if you ticked the text box. Reply STOP to any text to stop. See our <Link href="/sms-terms">SMS Terms</Link>.</li>
                <li>To answer your messages and to improve the site.</li>
            </ul>
            <h2>Who we share it with</h2>
            <p>
                We use service providers to run the site, send email and texts (Klaviyo) and ship packages. They use your
                information only to do that work for us. We do not sell your information. We never share your mobile number
                or your consent to receive texts with anyone for their own marketing.
            </p>
            <h2>Your choices</h2>
            <p>
                You can unsubscribe from emails or texts at any time, or ask us to see or delete the information we hold about
                you through our <Link href="/contact">contact page</Link>.
            </p>
            <h2>Children</h2>
            <p>The site is meant for parents and other adults. We do not knowingly collect information from children under 13.</p>
            <h2>Contact</h2>
            <p>Wonderade Corporation, 1620 W 10th St, Austin, TX 78703, or our <Link href="/contact">contact page</Link>.</p>
        </LegalPage>
    )
}
