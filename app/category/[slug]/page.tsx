import { getPostsByCategory, getAllCategories, formatDate } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = "https://www.dailycravehive.com";

const categoryMeta: Record<string, { name: string; description: string; keywords: string[] }> = {
  "ai-writing-tools": {
    name: "AI Writing Tools",
    description: "Expert reviews and comparisons of the best AI writing tools in 2026. Jasper, ChatGPT, Claude, Copy.ai and more — tested and ranked.",
    keywords: ["AI writing tools", "best AI writer", "AI content generator", "AI copywriting"],
  },
  "ai-image-tools": {
    name: "AI Image Tools",
    description: "In-depth reviews of the best AI image generators in 2026. Midjourney, DALL-E, FLUX, Firefly — real tests, honest scores.",
    keywords: ["AI image generators", "AI art generator", "best AI image tools", "AI image creation"],
  },
  "ai-video-tools": {
    name: "AI Video Tools",
    description: "Reviews and rankings of the best AI video generation tools in 2026. Sora, Runway, Kling and more — tested with real projects.",
    keywords: ["AI video tools", "AI video generator", "best AI video maker"],
  },
  "ai-coding-tools": {
    name: "AI Coding Tools",
    description: "Reviews and comparisons of the best AI coding assistants in 2026. Cursor, GitHub Copilot, Claude Code and more — developer tested.",
    keywords: ["AI coding tools", "AI code assistant", "best AI for coding"],
  },
  comparisons: {
    name: "Comparisons",
    description: "Head-to-head AI tool comparisons with real testing. ChatGPT vs Claude, Grammarly vs ChatGPT, Frase vs Surfer SEO and more.",
    keywords: ["AI tool comparisons", "ChatGPT vs Claude", "AI tools compared", "which AI tool is best"],
  },
  "best-of": {
    name: "Best Of",
    description: "Curated rankings of the best AI tools in 2026. Writing tools, image generators, and more — tested, scored, and ranked by category.",
    keywords: ["best AI tools 2026", "top AI tools", "AI tools ranked", "best AI software"],
  },
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoryMeta[slug] || { name: slug, description: "Browse articles on Daily Crave Hive.", keywords: [] };
  const categoryUrl = `${SITE_URL}/category/${slug}`;

  return {
    title: `${meta.name} — AI Tools Reviews & Rankings 2026`,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      type: "website",
      title: `${meta.name} — DailyCraveHive`,
      description: meta.description,
      url: categoryUrl,
      siteName: "DailyCraveHive",
      images: [
        {
          url: `${SITE_URL}/images/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${meta.name} — DailyCraveHive`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.name} — DailyCraveHive`,
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
  const meta = categoryMeta[slug] || { name: slug, description: "", keywords: [] };

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
      name: "DailyCraveHive",
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
          {meta.name}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#1a1a2e]/70">
          {meta.description}
        </p>
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
                        {"Read Review →"}
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