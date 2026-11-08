"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SearchEntry } from "@/lib/types";

function scorePost(post: SearchEntry, query: string, terms: string[]): number {
  const title = post.title.toLowerCase();
  const slug = post.slug.toLowerCase();
  const excerpt = (post.excerpt || "").toLowerCase();
  const category = (post.category || "").toLowerCase();
  const keywords = (post.keywords || []).join(" ").toLowerCase();
  const titleCompact = title.replace(/\s+/g, "");
  const queryCompact = query.replace(/\s+/g, "");

  let score = 0;
  if (title === query) score += 1000;
  if (titleCompact === queryCompact) score += 800;
  if (slug === queryCompact) score += 700;
  if (title.includes(query)) score += 300;
  if (titleCompact.includes(queryCompact)) score += 250;
  if (slug.includes(queryCompact)) score += 200;
  if (excerpt.includes(query)) score += 40;
  if (keywords.includes(query)) score += 30;

  for (const term of terms) {
    if (title.includes(term)) score += 60;
    if (slug.includes(term)) score += 40;
    if (keywords.includes(term)) score += 20;
    if (excerpt.includes(term)) score += 15;
    if (category.includes(term)) score += 10;
  }

  return score;
}

export default function SearchResults({ posts }: { posts: SearchEntry[] }) {
  const [rawQuery, setRawQuery] = useState("");

  useEffect(() => {
    const sync = () => {
      setRawQuery(new URLSearchParams(window.location.search).get("q") || "");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const query = rawQuery.trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  const results = query
    ? posts
        .map((post) => ({ post, score: scorePost(post, query, terms) }))
        .filter((row) => row.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((row) => row.post)
    : [];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-[26px] font-bold text-[#1a1a2e]">
          {query ? (
            <>
              Search results for <span className="text-[#E8505B]">&ldquo;{rawQuery}&rdquo;</span>
            </>
          ) : (
            "Search"
          )}
        </h1>

        <form action="/search" method="get" className="mt-6 flex max-w-xl overflow-hidden rounded-full border border-gray-300 bg-white shadow-sm">
          <input
            type="text"
            name="q"
            defaultValue={rawQuery}
            key={rawQuery}
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
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group flex gap-5 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-[#E8505B] hover:shadow-md"
            >
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="hidden h-24 w-40 shrink-0 rounded-lg object-cover sm:block"
                />
              )}
              <div className="min-w-0">
                <span className="mb-1 inline-block rounded bg-[#E8505B] px-2 py-0.5 text-[11px] font-bold uppercase text-white">
                  {post.category}
                </span>
                <h2 className="text-[17px] font-bold leading-snug text-[#1a1a2e] transition group-hover:text-[#E8505B]">
                  {post.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-[#555]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {query && results.length === 0 && (
          <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-[15px] text-[#555]">
              No results for &ldquo;{rawQuery}&rdquo;. Try a different keyword — like a platform
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
