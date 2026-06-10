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

export const metadata: Metadata = {
  title: "Wonderade | Big and Strong Juice",
  description: "The Power of Milk. The Taste of Candy.",
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
