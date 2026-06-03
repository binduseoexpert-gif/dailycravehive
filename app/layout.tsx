import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://dailycravehive.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DailyCraveHive — AI Tools Tested, Ranked & Reviewed (2026)",
    template: "%s | DailyCraveHive",
  },
  description:
    "Honest AI tool reviews, rankings, and head-to-head comparisons. We test AI writing tools, image generators, coding assistants & more — so you don't have to.",
  keywords: [
    "AI tools",
    "AI writing tools",
    "AI image generators",
    "best AI tools 2026",
    "AI tool reviews",
    "ChatGPT vs Claude",
    "Midjourney",
    "AI comparisons",
  ],
  authors: [{ name: "DailyCraveHive", url: SITE_URL }],
  creator: "DailyCraveHive",
  publisher: "DailyCraveHive",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DailyCraveHive",
    title: "DailyCraveHive — AI Tools Tested, Ranked & Reviewed",
    description:
      "Honest AI tool reviews, rankings, and head-to-head comparisons. We test AI writing tools, image generators & more.",
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
    title: "DailyCraveHive — AI Tools Tested, Ranked & Reviewed",
    description:
      "Honest AI tool reviews, rankings, and head-to-head comparisons.",
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
  alternates: {
    canonical: SITE_URL,
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
      "AI tools reviews, rankings, and comparisons — tested by real humans.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
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
      target: `${SITE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}