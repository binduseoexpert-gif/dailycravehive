import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { AUTHOR } from "@/lib/author";
import AuthorBox from "@/components/AuthorBox";

const SITE_URL = "https://www.dailycravehive.com";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const postUrl = `${SITE_URL}/${slug}`;
  const ogImage = post.thumbnail
    ? `${SITE_URL}${post.thumbnail}`
    : `${SITE_URL}/images/og-default.png`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords || [],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "DailyCraveHive",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.date,
      section: post.category,
      authors: [AUTHOR.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Helper: Extract FAQ items from MDX content for FAQ Schema
function extractFAQs(content: string) {
  const faqs: { question: string; answer: string }[] = [];
  const faqRegex =
    /<summary>(.*?)<\/summary>\s*<p>(.*?)<\/p>/gs;
  let match;
  while ((match = faqRegex.exec(content)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }
  return faqs;
}

// Helper: Extract "Final Score: X.X / 10" from review content
function extractScore(content: string): string | null {
  const match = content.match(/Final Score:\s*\**\s*([\d.]+)\s*\/\s*10/i);
  return match ? match[1] : null;
}

// Helper: Extract ranked tools from best-of content ("### 1. Tool Name — ...")
function extractRankedItems(content: string): { position: number; name: string }[] {
  const items: { position: number; name: string }[] = [];
  const regex = /^###\s+(\d+)\.\s+(.+?)(?:\s+[—–-]{1,2}\s+.*)?$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({ position: parseInt(match[1], 10), name: match[2].trim() });
  }
  return items;
}

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-12 border-b border-[#E8505B] pb-3 text-[22px] font-bold text-[#E8505B]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-8 text-[18px] font-bold text-[#1a1a2e]"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mb-2 mt-6 text-[16px] font-bold text-[#1a1a2e]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 text-[16px] leading-[1.85] text-[#1a1a2e] text-justify prose-inherit" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-[16px] leading-[1.85] text-[#1a1a2e]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-[16px] leading-[1.85] text-[#1a1a2e]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.85]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-[#1a1a2e]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#E8505B] underline hover:text-[#c93842]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-[#E8505B] bg-[#FDF0F1] py-5 pl-6 pr-5 text-[16px] leading-[1.8] text-[#444450] rounded-r-lg"
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-t border-[#e8e8f0]" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      className="my-6 w-full rounded-lg border border-gray-200 shadow-sm"
      loading="lazy"
      {...props}
    />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const postUrl = `${SITE_URL}/${slug}`;
  const ogImage = post.thumbnail
    ? `${SITE_URL}${post.thumbnail}`
    : `${SITE_URL}/images/og-default.png`;

  // --- Structured Data Schemas ---

  const personSchema = {
    "@type": "Person",
    name: AUTHOR.name,
    description: AUTHOR.bio,
    url: AUTHOR.url,
    jobTitle: AUTHOR.role,
  };

  // 1. Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: personSchema,
    publisher: {
      "@type": "Organization",
      name: "DailyCraveHive",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  // 2. BreadcrumbList Schema
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
        name: post.category,
        item: `${SITE_URL}/category/${post.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  // 3. FAQ Schema (auto-extracted from content)
  const faqs = extractFAQs(post.content);
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // 4. Review Schema (only for review posts that have a "Final Score: X/10")
  const score = extractScore(post.content);
  const isReviewPost = /\breview\b/i.test(post.title);
  const toolName = isReviewPost ? post.title.split(/\s+Review/i)[0].trim() : null;
  const reviewSchema =
    isReviewPost && score && toolName
      ? {
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: {
            "@type": "SoftwareApplication",
            name: toolName,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
          },
          author: personSchema,
          reviewRating: {
            "@type": "Rating",
            ratingValue: score,
            bestRating: "10",
            worstRating: "1",
          },
          publisher: {
            "@type": "Organization",
            name: "DailyCraveHive",
            url: SITE_URL,
          },
          datePublished: post.date,
          url: postUrl,
        }
      : null;

  // 5. ItemList Schema (only for best-of / ranked list posts)
  const rankedItems =
    post.categorySlug === "best-of" ? extractRankedItems(post.content) : [];
  const itemListSchema =
    rankedItems.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: post.title,
          url: postUrl,
          numberOfItems: rankedItems.length,
          itemListElement: rankedItems.map((item) => ({
            "@type": "ListItem",
            position: item.position,
            name: item.name,
          })),
        }
      : null;

  return (
    <div className="bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#E8505B]">Home</Link>
            <span>»</span>
            <Link href={"/category/" + post.categorySlug} className="hover:text-[#E8505B]">
              {post.category}
            </Link>
          </nav>
        </div>
      </div>

      {/* Article Header - white background */}
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pt-8">
          <h1 className="text-[28px] font-bold leading-tight text-[#1a1a2e] md:text-[36px]">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 pb-5 text-[13px] text-[#888]">
            <span className="flex items-center gap-2">
              <span className="inline-block h-6 w-6 rounded-full bg-[#E8505B] text-center text-xs leading-6 text-white">
                {AUTHOR.name.charAt(0)}
              </span>
              <span className="font-medium text-[#555]">{AUTHOR.name}</span>
            </span>
            <span>Last Updated: {formatDate(post.date)}</span>
            <span>⏳ No Comments</span>
          </div>

          {post.thumbnail && (
            <div className="mb-8">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Light Content Area - article body card */}
      <div className="bg-[#F7F4F2]">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-white p-6 md:p-10 shadow-sm ring-1 ring-gray-200">

            {/* Article Body */}
            <article className="mx-auto max-w-3xl px-4 py-10">
              {slug === "best-ai-writing-tools" ? (
                <>
                  <MDXRemote source={post.content.split("## How We Tested")[0]} components={components} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", margin: "32px 0" }}>
                    {[
                      { label: "BEST OVERALL", name: "Jasper AI", score: "9.0/10", desc: "Best for marketing teams. Brand voice that actually works.", link: "https://www.jasper.ai/", cta: "Try Jasper AI →" },
                      { label: "BEST FREE OPTION", name: "ChatGPT", score: "9.2/10", desc: "Most versatile. Free tier handles everyday writing well.", link: "https://chat.openai.com", cta: "Try ChatGPT →" },
                      { label: "MOST NATURAL WRITING", name: "Claude", score: "9.3/10", desc: "Writes like a human. Best tone control of any AI tool.", link: "https://claude.ai", cta: "Try Claude →" },
                    ].map((tool) => (
                      <div key={tool.name} style={{ border: "1px solid #e8e8f0", borderRadius: "12px", backgroundColor: "#ffffff", padding: "24px", textAlign: "center", boxShadow: "0 1px 3px rgba(26, 26, 46, 0.06)" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#E8505B", marginBottom: "12px" }}>{tool.label}</p>
                        <h4 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: "8px 0" }}>{tool.name}</h4>
                        <p style={{ fontSize: "15px", fontWeight: 600, color: "#E8505B", margin: "8px 0" }}>Score: {tool.score}</p>
                        <p style={{ fontSize: "14px", color: "#555560", lineHeight: 1.6, margin: "12px 0 20px" }}>{tool.desc}</p>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#E8505B", color: "#fff", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>{tool.cta}</a>
                      </div>
                    ))}
                  </div>
                  <MDXRemote source={"## How We Tested" + post.content.split("## How We Tested")[1]} components={components} />
                </>
              ) : slug === "best-ai-image-generators" ? (
                <>
                  <MDXRemote source={post.content.split("## How We Tested")[0]} components={components} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", margin: "32px 0" }}>
                    {[
                      { label: "BEST OVERALL", name: "Midjourney V7", score: "9.2/10", desc: "Unmatched artistic quality. Cinematic visuals that stop you mid-scroll.", link: "https://www.midjourney.com/", cta: "Try Midjourney →" },
                      { label: "SMARTEST GENERATOR", name: "GPT Image 1.5", score: "9.0/10", desc: "Best text rendering & prompt understanding. Free tier available.", link: "https://chatgpt.com", cta: "Try ChatGPT →" },
                      { label: "PHOTOREALISM KING", name: "FLUX.2", score: "8.8/10", desc: "Best photorealistic output. Open-source & pay-per-use.", link: "https://blackforestlabs.ai/", cta: "Try FLUX.2 →" },
                    ].map((tool) => (
                      <div key={tool.name} style={{ border: "1px solid #e8e8f0", borderRadius: "12px", backgroundColor: "#ffffff", padding: "24px", textAlign: "center", boxShadow: "0 1px 3px rgba(26, 26, 46, 0.06)" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#E8505B", marginBottom: "12px" }}>{tool.label}</p>
                        <h4 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: "8px 0" }}>{tool.name}</h4>
                        <p style={{ fontSize: "15px", fontWeight: 600, color: "#E8505B", margin: "8px 0" }}>Score: {tool.score}</p>
                        <p style={{ fontSize: "14px", color: "#555560", lineHeight: 1.6, margin: "12px 0 20px" }}>{tool.desc}</p>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#E8505B", color: "#fff", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>{tool.cta}</a>
                      </div>
                    ))}
                  </div>
                  <MDXRemote source={"## How We Tested" + post.content.split("## How We Tested")[1]} components={components} />
                </>
              ) : (
                <MDXRemote source={post.content} components={components} />
              )}

              <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5 text-[13px] leading-relaxed text-[#666]">
                <strong className="text-[#1a1a2e]">Disclosure:</strong> This article may contain affiliate links, which means we may earn a commission if you make a purchase — at no extra cost to you. This never influences our research or opinions. Pricing and details may change over time; always verify on the official website before making a decision.
              </div>

              <AuthorBox />
            </article>

          </div>
          {/* Related posts OUTSIDE the card */}
          {(() => {
            const relatedPosts = getAllPosts()
              .filter((p) => p.categorySlug === post.categorySlug && p.slug !== slug)
              .slice(0, 3);

            if (relatedPosts.length === 0) return null;

            return (
              <div className="mx-auto max-w-4xl px-4 py-10">
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#E8505B", marginBottom: "24px", borderBottom: "2px solid #E8505B", paddingBottom: "12px" }}>
                  You May Also Like:
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                  {relatedPosts.map((rp) => (
                    <div key={rp.slug}>
                      {rp.thumbnail && (
                        <Link href={`/${rp.slug}`}>
                          <img
                            src={rp.thumbnail}
                            alt={rp.title}
                            style={{ width: "100%", borderRadius: "8px", marginBottom: "12px", aspectRatio: "16/9", objectFit: "cover" }}
                          />
                        </Link>
                      )}
                      <Link href={`/${rp.slug}`} style={{ textDecoration: "none" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.4, marginBottom: "8px" }}>
                          {rp.title}
                        </h3>
                      </Link>
                      <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
                      {formatDate(rp.date)} /// No Comments
                      </p>
                      <Link href={`/${rp.slug}`} style={{ fontSize: "14px", color: "#E8505B", textDecoration: "none", fontWeight: 600 }}>
                        Read More »
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}