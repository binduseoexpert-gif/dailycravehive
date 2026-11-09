import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Quicksand({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://www.dailycravehive.com"; 

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: SITE_URL,
  },

  title: {
    default:
      "Creator Platform Reviews: Fees Before You Join (2026)",
    template: "%s | Daily Crave Hive",
  },

  description:
    "See 2026 fees, payout rules and scam checks for creator platforms before you pay. Reviews, comparisons and guides, with no sponsored rankings. 18+.",

  authors: [{ name: "Daily Crave Hive", url: SITE_URL }],
  creator: "Daily Crave Hive",
  publisher: "Daily Crave Hive",

  formatDetection: {
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Daily Crave Hive",
    title: "Creator Platform Reviews: Fees Before You Join (2026)",
    description:
      "See 2026 fees, payout rules and scam checks for creator platforms before you pay. Reviews, comparisons and guides, with no sponsored rankings. 18+.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Daily Crave Hive — Creator & Adult Platform Reviews",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Creator Platform Reviews: Fees Before You Join (2026)",
    description:
      "See 2026 fees, payout rules and scam checks for creator platforms before you pay. Reviews, comparisons and guides, with no sponsored rankings. 18+.",
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
    other: {
      "p:domain_verify": "629e6f271ce93c4842ef75fdb9ed8ea9",
    },
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
    name: "Daily Crave Hive",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "Honest reviews, comparisons and rankings of creator and adult platforms — real fees, verified payouts and scam checks, based on published terms and reports.",
    sameAs: [
      "https://x.com/DailyCraveHive",
      "https://in.pinterest.com/dailycravehive/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "alma@dailycravehive.com",
      url: `${SITE_URL}/contact`,
    },
  };

  // WebSite Schema (no SearchAction — /search is noindex)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daily Crave Hive",
    url: SITE_URL,
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
                {/* Google Analytics */}
                <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-419ZP5ZLZV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-419ZP5ZLZV');
          `}
        </Script>
        <SiteNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}