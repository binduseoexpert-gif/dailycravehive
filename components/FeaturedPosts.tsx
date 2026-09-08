// components/FeaturedPosts.tsx
// Trending section — 1 hero card + 2 side cards.
// Auto-populated from posts with `featured: true` in frontmatter.
// Toggle "featured" in the admin panel to control what appears here.

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function FeaturedPosts() {
  const featured = getAllPosts()
    .filter((p) => p.featured)
    .slice(0, 3);

  // Render nothing until at least 2 posts are featured
  if (featured.length < 2) return null;

  const [hero, ...side] = featured;

  return (
    <section className="relative overflow-hidden bg-[#FDF6F8]">
      <div className="pointer-events-none absolute -right-20 top-10 h-60 w-60 rounded-full bg-[#E8505B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* heading row */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <h2 className="border-l-4 border-[#E8505B] pl-4 text-[24px] font-bold text-[#1a1a2e]">
            🔥 Trending Now — Most Read This Month
          </h2>
          <Link
            href="/category/reviews"
            className="text-[15px] font-semibold text-[#E8505B] transition hover:opacity-80"
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* ===== HERO CARD ===== */}
          <Link
            href={`/${hero.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-[#f0d5dc] bg-white shadow-[0_2px_12px_rgba(26,26,46,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8505B] hover:shadow-[0_16px_40px_-12px_rgba(232,80,91,0.25)]"
          >
            {hero.thumbnail && (
              <div className="overflow-hidden">
                <img
                  src={hero.thumbnail}
                  alt={hero.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-72"
                />
              </div>
            )}
            <div className="p-6">
              <span className="inline-block rounded bg-[#E8505B] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#1a1a2e]">
                {hero.category}
              </span>
              <h3 className="mt-3 text-[24px] font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#E8505B]">
                {hero.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#6b6b78]">
                {hero.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[15px] font-semibold text-[#E8505B]">
                Read More
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>

          {/* ===== SIDE CARDS ===== */}
          <div className="flex flex-col gap-6">
            {side.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="group relative flex-1 overflow-hidden rounded-2xl border border-[#f0d5dc] bg-white p-5 shadow-[0_2px_12px_rgba(26,26,46,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E8505B] hover:shadow-[0_16px_40px_-12px_rgba(232,80,91,0.25)]"
              >
                <div className="flex gap-4">
                  {post.thumbnail && (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-24 w-36 shrink-0 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="inline-block rounded bg-[#E8505B] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1a1a2e]">
                      {post.category}
                    </span>
                    <h3 className="mt-2 text-[17px] font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#E8505B]">
                      {post.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-[#6b6b78]">
                  {post.excerpt}
                </p>
                <span className="mt-3 block text-[13px] text-[#8a8a98]">
                  ⏱ {post.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}