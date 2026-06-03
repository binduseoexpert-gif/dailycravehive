import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = "https://dailycravehive.com";

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
      authors: ["DailyCraveHive"],
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

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-12 border-b border-[#E8505B] pb-3 text-[22px] font-bold text-[#E8505B]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-8 text-[18px] font-bold text-white"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mb-2 mt-6 text-[16px] font-bold text-white"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 text-[15px] leading-[1.85] text-[#c0c0c0] prose-inherit" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-[15px] leading-[1.85] text-[#b0b0b0]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-[15px] leading-[1.85] text-[#b0b0b0]" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.85]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-white" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#E8505B] underline hover:text-[#ff6b73]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-[#E8505B] bg-[#1a1a2e] py-5 pl-6 pr-5 text-[15px] leading-[1.8] text-[#d0d0d0] rounded-r-lg"
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-t border-[#2a2a3a]" {...props} />
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

  // 1. Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "DailyCraveHive",
      url: SITE_URL,
    },
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

      {/* Article Header - OUTSIDE dark box, white background */}
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pt-8">
          <h1 className="text-[28px] font-bold leading-tight text-[#1a1a2e] md:text-[36px]">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 pb-5 text-[13px] text-[#888]">
            <span className="flex items-center gap-2">
              <span className="inline-block h-6 w-6 rounded-full bg-[#E8505B] text-center text-xs leading-6 text-white">D</span>
              <span className="font-medium text-[#555]">DailyCraveHive</span>
            </span>
            <span>Last Updated: {post.date}</span>
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

      {/* Dark Content Area - only article body */}
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pb-10">
          <div className="rounded-2xl bg-[#0f0f17] p-6 md:p-10 shadow-xl">

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
                      <div key={tool.name} style={{ border: "1px solid #2a2a3a", borderRadius: "12px", backgroundColor: "#12121c", padding: "24px", textAlign: "center" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#E8505B", marginBottom: "12px" }}>{tool.label}</p>
                        <h4 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: "8px 0" }}>{tool.name}</h4>
                        <p style={{ fontSize: "15px", fontWeight: 600, color: "#E8505B", margin: "8px 0" }}>Score: {tool.score}</p>
                        <p style={{ fontSize: "14px", color: "#b0b0b0", lineHeight: 1.6, margin: "12px 0 20px" }}>{tool.desc}</p>
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
                      <div key={tool.name} style={{ border: "1px solid #2a2a3a", borderRadius: "12px", backgroundColor: "#12121c", padding: "24px", textAlign: "center" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#E8505B", marginBottom: "12px" }}>{tool.label}</p>
                        <h4 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: "8px 0" }}>{tool.name}</h4>
                        <p style={{ fontSize: "15px", fontWeight: 600, color: "#E8505B", margin: "8px 0" }}>Score: {tool.score}</p>
                        <p style={{ fontSize: "14px", color: "#b0b0b0", lineHeight: 1.6, margin: "12px 0 20px" }}>{tool.desc}</p>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#E8505B", color: "#fff", padding: "10px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>{tool.cta}</a>
                      </div>
                    ))}
                  </div>
                  <MDXRemote source={"## How We Tested" + post.content.split("## How We Tested")[1]} components={components} />
                </>
              ) : (
                <MDXRemote source={post.content} components={components} />
              )}

              <div className="mt-10 rounded-lg border border-[#1a1a2e] bg-[#1a1a2e] p-5 text-[13px] leading-relaxed text-[#888]">
                <strong className="text-white">Disclosure:</strong> This article
                may contain affiliate links. We only recommend products we&apos;ve
                personally tested. Pricing and features were verified from the
                official website as of {post.date} and may change. Always check the
                official site for the most current information.
              </div>
            </article>

          </div>
          {/* Related posts OUTSIDE the dark box */}
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
                        {rp.date} /// No Comments
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