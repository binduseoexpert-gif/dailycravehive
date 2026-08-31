// app/search/page.tsx
// Real search with relevance ranking: title matches rank highest, then slug, then excerpt/keywords.

import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search — DailyCraveHive",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);

  const posts = getAllPosts();

  // Score each post by where and how well the query matches.
  // Higher score = more relevant = shown first.
  function scorePost(p: (typeof posts)[number]): number {
    const title = p.title.toLowerCase();
    const slug = p.slug.toLowerCase();
    const excerpt = (p.excerpt || "").toLowerCase();
    const category = (p.category || "").toLowerCase();
    const keywords = (p.keywords || []).join(" ").toLowerCase();

    // A "compact" version ignores spaces so "feetfinder" matches "Feet Finder" / "FeetFinder".
    const titleCompact = title.replace(/\s+/g, "");
    const queryCompact = query.replace(/\s+/g, "");

    let score = 0;

    // Whole-query matches (strongest signals)
    if (title === query) score += 1000;                 // exact title match
    if (titleCompact === queryCompact) score += 800;    // exact ignoring spaces
    if (slug === queryCompact) score += 700;            // slug is exactly the query
    if (title.includes(query)) score += 300;            // query appears in title
    if (titleCompact.includes(queryCompact)) score += 250;
    if (slug.includes(queryCompact)) score += 200;      // query appears in slug
    if (excerpt.includes(query)) score += 40;
    if (keywords.includes(query)) score += 30;

    // Per-term matches (handles multi-word queries)
    for (const t of terms) {
      if (title.includes(t)) score += 60;
      if (slug.includes(t)) score += 40;
      if (keywords.includes(t)) score += 20;
      if (excerpt.includes(t)) score += 15;
      if (category.includes(t)) score += 10;
    }

    return score;
  }

  const results = query
    ? posts
        .map((p) => ({ post: p, score: scorePost(p) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score) // highest relevance first
        .map((r) => r.post)
    : [];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-[26px] font-bold text-[#1a1a2e]">
          {query ? (
            <>
              Search results for <span className="text-[#E8505B]">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            "Search"
          )}
        </h1>

        {/* Search box on the results page too */}
        <form action="/search" method="get" className="mt-6 flex max-w-xl overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm">
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Search platforms, reviews, comparisons…"
            className="w-full px-5 py-3 text-[15px] text-[#1a1a2e] outline-none"
          />
          <button
            type="submit"
            className="shrink-0 bg-[#E8505B] px-6 text-[14px] font-bold text-white transition hover:bg-[#c93842]"
          >
            Search
          </button>
        </form>

        {query && (
          <p className="mt-4 text-sm text-gray-500">
            {results.length} {results.length === 1 ? "result" : "results"} found
          </p>
        )}

        <div className="mt-8 space-y-6">
          {results.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex gap-5 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#E8505B] hover:shadow-md"
            >
              {p.thumbnail && (
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="hidden h-24 w-40 shrink-0 rounded-lg object-cover sm:block"
                />
              )}
              <div className="min-w-0">
                <span className="mb-1 inline-block rounded bg-[#E8505B] px-2 py-0.5 text-[11px] font-bold uppercase text-white">
                  {p.category}
                </span>
                <h2 className="text-[17px] font-bold leading-snug text-[#1a1a2e] transition group-hover:text-[#E8505B]">
                  {p.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-[#555]">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {query && results.length === 0 && (
          <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-[15px] text-[#555]">
              No results for &ldquo;{q}&rdquo;. Try a different keyword — like a platform
              name (&ldquo;FeetFinder&rdquo;, &ldquo;Feetify&rdquo;) or a category
              (&ldquo;reviews&rdquo;, &ldquo;comparisons&rdquo;).
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-lg bg-[#E8505B] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#c93842]"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}