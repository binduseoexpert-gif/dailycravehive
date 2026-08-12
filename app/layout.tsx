import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const inter = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://www.dailycravehive.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Daily Crave Hive — Honest Reviews, Comparisons & Best-Of Rankings (2026)",
    template: "%s | DailyCraveHive",
  },

  description:
"Honest reviews, head-to-head comparisons and best-of rankings of AI tools, apps, websites and platforms. Real testing, real fees, no sponsored picks.",
keywords: [
  "AI tool reviews",
  "honest reviews 2026",
  "AI tool comparisons",
  "best AI tools 2026",
  "ChatGPT vs Claude",
  "earning platform reviews",
  "app reviews",
  "best of rankings",
],

  authors: [{ name: "DailyCraveHive", url: SITE_URL }],
  creator: "DailyCraveHive",
  publisher: "DailyCraveHive",

  formatDetection: {
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DailyCraveHive",
    title: "DailyCraveHive — Honest Reviews, Comparisons & Rankings",
    description:
      "Honest reviews, comparisons and best-of rankings of AI tools, apps and earning platforms — real testing, no sponsored picks.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: "DailyCraveHive — AI Tools Reviews",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DailyCraveHive — Honest Reviews, Comparisons & Rankings",
    description:
      "Honest reviews, comparisons and best-of rankings of AI tools, apps and earning platforms.",
    images: [`${SITE_URL}/images/og-default.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "674pgShOTNhFo8L1-yOLtptM6e-pIUJOka8QrIcujoA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema — site-wide
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DailyCraveHive",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "Honest reviews, comparisons and rankings of AI tools, apps and earning platforms — tested by real humans.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "alma@dailycravehive.com",
      url: `${SITE_URL}/contact-us`,
    },
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DailyCraveHive",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="min-h-full bg-white font-sans text-[#1a1a2e]">
      <SiteNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}