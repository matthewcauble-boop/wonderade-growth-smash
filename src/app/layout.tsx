import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Quicksand, Baloo_2 } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/site";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

// Headline / display font — matches the Shopify theme's --font-display (Baloo 2,
// the stand-in for the brand "Alphabet Soup" face).
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE = "https://www.wonderade.us";
const TITLE = "Wonderade: Kids' Juice Box With 8g Protein and 3g Sugar";
const DESC = "The juice you wish you had when you were growing up. A kids' juice box with 8g protein, 3g sugar (0g added), 4g fiber and real fruit. No dairy, no artificial sweeteners.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  verification: { google: "YvsN_k2L23Q4L_TViSagobzwSVopPCwXJpI5DoKfaeE" },
  title: { default: TITLE, template: "%s | Wonderade" },
  applicationName: "Wonderade",
  description: DESC,
  alternates: {
    types: { "text/plain": [{ url: "/llms.txt", title: "Wonderade facts for AI assistants" }] },
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Wonderade",
    title: TITLE,
    description: DESC,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Wonderade Major Orange and Princess Punch juice boxes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og.png", alt: "Wonderade Major Orange and Princess Punch juice boxes" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://static.klaviyo.com/onsite/js/XwRkYR/klaviyo.js?company_id=XwRkYR" />
      </head>
      <body
        className={`${quicksand.variable} ${baloo.variable} antialiased`}
      >
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
