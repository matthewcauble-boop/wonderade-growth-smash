import type { Metadata } from "next";
import { Quicksand, Baloo_2 } from "next/font/google";
import "./globals.css";

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

const SITE = "https://wonderade.us";
const TITLE = "Wonderade | Big and Strong Juice";
const DESC = "The juice you wish you had when you were growing up. 8g protein, 3g sugar, 4g fiber, real fruit. Zero junk.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Wonderade",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Wonderade Major Orange and Princess Punch juice boxes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
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
        {children}
      </body>
    </html>
  );
}
