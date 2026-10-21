import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/v2/layout/legal-page"

export const metadata: Metadata = { title: "SMS Terms | Wonderade", description: "Terms for Wonderade text messages." }

export default function SmsTermsPage() {
    return (
        <LegalPage title="SMS Terms" updated="October 6, 2026">
            <h2>The program</h2>
            <p>
                Wonderade Texts sends updates about Wonderade: launch and sample news, product updates and offers. You join by
                entering your mobile number and ticking the text box on our sample form. Ticking the box is never required to
                get a sample or to buy.
            </p>
            <h2>How often</h2>
            <p>Message frequency varies. Message and data rates may apply.</p>
            <h2>Stopping and help</h2>
            <ul>
                <li>Reply <strong>STOP</strong> to any message to stop getting texts. We will send one message confirming you are unsubscribed.</li>
                <li>Reply <strong>HELP</strong> for help, or reach us through our <Link href="/contact">contact page</Link>.</li>
            </ul>
            <h2>Carriers</h2>
            <p>Carriers are not liable for delayed or undelivered messages.</p>
            <h2>Your number</h2>
            <p>
                We never sell or share your mobile number or your consent to receive texts with third parties for their
                marketing. See our <Link href="/privacy">Privacy Policy</Link>.
            </p>
            <h2>Who we are</h2>
            <p>Wonderade Corporation, 1620 W 10th St, Austin, TX 78703.</p>
        </LegalPage>
    )
}
