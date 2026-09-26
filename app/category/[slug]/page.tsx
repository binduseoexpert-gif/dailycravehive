import { getPostsByCategory, getAllCategories, formatDate } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = "https://www.dailycravehive.com";

const categoryMeta: Record
  string,
  { name: string; h1: string; metaTitle: string; description: string; intro: string; keywords: string[] }
> = {
  reviews: {
    name: "Reviews",
    h1: "Creator & Adult Platform Reviews",
    metaTitle: "Creator Platform Reviews 2026: Fees, Payouts & Safety",
    description:
      "Honest reviews of creator and adult platforms like FeetFinder, Fanvue and Fansly — real fees, payout proof, safety checks and who each platform suits.",
    intro:
      "Every review here follows the same rule: we check the fees, the payout terms and the complaint patterns before telling you whether a platform deserves your content. No paid rankings, no recycled press releases — just what you'd want to know before signing up.",
    keywords: ["creator platform reviews", "adult platform reviews", "feetfinder review", "fanvue review", "platform reviews 2026"],
  },
  comparisons: {
    name: "Comparisons",
    h1: "Creator Platform Comparisons",
    metaTitle: "Creator Platform Comparisons 2026: Which Site Wins?",
    description:
      "Side-by-side comparisons of creator platforms like Fansly vs OnlyFans — fees, payout speed, discovery and features, with a clear winner for each type.",
    intro:
      "Choosing between two platforms is easier when someone puts their numbers side by side — so that's what these comparisons do. Fees, payout minimums, discovery, content rules: everything on the same scale, ending with an honest call on which platform wins for which kind of creator.",
    keywords: ["creator platform comparisons", "fansly vs onlyfans", "platform comparison 2026", "which platform is best for creators"],
  },
  "best-of": {
    name: "Best Of",
    h1: "Best Creator Platforms & Sites",
    metaTitle: "Best Creator Platforms 2026: Top Sites to Earn Online",
    description:
      "Our ranked picks for the best creator and adult platforms — from selling feet pics to fan subscriptions. Tested rankings matched to your goals for 2026.",
    intro:
      "Rankings without criteria are just opinions, so every list here is built on the same scorecard: fees, payout reliability, buyer traffic and beginner-friendliness. Platforms move up and down as the data changes — these lists get updated, not abandoned.",
    keywords: ["best creator platforms 2026", "best sites to sell feet pics", "best fan platforms", "top adult creator sites"],
  },
  guides: {
    name: "Guides",
    h1: "Creator Earning Guides",
    metaTitle: "Creator Guides: How to Earn on Fan & Feet Sites",
    description:
      "Step-by-step guides for creators — how to sell feet pics, set prices, avoid scams and grow earnings on fan platforms. Practical, honest tips for 2026.",
    intro:
      "These guides exist to shorten your learning curve: pricing that converts, photos that sell, scams to dodge and the promotion habits that actually decide income. Everything is step-by-step and beginner-safe — start with the basics, then work through pricing and safety as you grow.",
    keywords: ["how to sell feet pics", "creator earning guides", "feet pic pricing", "fan platform guides 2026"],
  },
};

const fallbackMeta = {
  name: "Articles",
  h1: "Articles",
  metaTitle: "Articles",
  description: "Browse articles on Daily Crave Hive.",
  intro: "",
  keywords: [] as string[],
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoryMeta[slug] || { ...fallbackMeta, name: slug, h1: slug, metaTitle: slug };
  const categoryUrl = `${SITE_URL}/category/${slug}`;

  return {
    title: meta.metaTitle,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      type: "website",
      title: meta.metaTitle,
      description: meta.description,
      url: categoryUrl,
      siteName: "Daily Crave Hive",
      images: [
        {
          url: `${SITE_URL}/images/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${meta.h1} — Daily Crave Hive`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.metaTitle,
      description: meta.description,
      images: [`${SITE_URL}/images/og-default.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  const meta = categoryMeta[slug] || { ...fallbackMeta, name: slug, h1: slug, metaTitle: slug };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: meta.name,
        item: `${SITE_URL}/category/${slug}`,
      },
    ],
  };

  // CollectionPage Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.name,
    description: meta.description,
    url: `${SITE_URL}/category/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Daily Crave Hive",
      url: SITE_URL,
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <nav className="mx-auto max-w-6xl px-4 pb-4 text-sm text-[#1a1a2e]/60">
          <Link href="/" className="hover:text-[#E8505B]">Home</Link>
          <span className="mx-2">»</span>
          <span>{meta.name}</span>
        </nav>
        <h1 className="text-center text-3xl font-bold text-[#1a1a2e]">
          {meta.h1}
        </h1>
        {meta.intro && (
          <p className="mx-auto mt-4 max-w-2xl px-4 text-center text-[15px] leading-relaxed text-[#1a1a2e]/75">
            {meta.intro}
          </p>
        )}
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            No posts found in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={"/" + post.slug} className="group">
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition hover:shadow-lg">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-r from-pink-200 to-pink-300">
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute bottom-3 left-3 rounded bg-[#E8505B] px-2 py-0.5 text-xs font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <h2 className="mb-2 text-lg font-semibold text-[#1a1a2e] group-hover:text-[#E8505B]">
                      {post.title}
                    </h2>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#E8505B]">
                        {"Read More →"}
                      </span>
                      <span className="text-gray-400">{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
          </section>
    </div>
  );
}