// components/FeaturedPosts.tsx
// "Top Reads" — numbered list of featured posts.
// Auto-populated from posts with `featured: true` in frontmatter.
// Toggle "Featured post" in the admin panel to control what appears here.

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function FeaturedPosts() {
  const featured = getAllPosts()
    .filter((p) => p.featured)
    .slice(0, 3);

  // Render nothing until at least 2 posts are featured
  if (featured.length < 2) return null;

  return (
    <section className="relative overflow-hidden bg-[#FDF6F8]">
      <div className="pointer-events-none absolute -right-20 top-10 h-60 w-60 rounded-full bg-[#E8505B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* heading row */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <h2 className="border-l-4 border-[#E8505B] pl-4 text-[24px] font-bold text-[#1a1a2e]">
            🔥 Top Reads This Month
          </h2>
          <Link
            href="/category/reviews"
            className="text-[15px] font-semibold text-[#E8505B] transition hover:opacity-80"
          >
            See all →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {featured.map((post, i) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group flex items-center gap-6 rounded-2xl border border-[#f0d5dc] bg-white px-6 py-5 shadow-[0_2px_10px_rgba(26,26,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E8505B] hover:shadow-[0_12px_30px_-10px_rgba(232,80,91,0.3)]"
            >
              {/* big outlined number */}
              <span
                className="shrink-0 select-none text-[56px] font-extrabold leading-none text-transparent transition-colors duration-300 md:text-[64px]"
                style={{
                  WebkitTextStroke: "2px #E8505B",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* content */}
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded bg-[#E8505B] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                  {post.category}
                </span>
                <h3 className="mt-2 truncate-none text-[18px] font-bold leading-snug text-[#1a1a2e] transition-colors duration-300 group-hover:text-[#E8505B] md:text-[21px]">
                  {post.title}
                </h3>
              </div>

              {/* meta + arrow */}
              <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
                <span className="text-[13px] text-[#8a8a98]">⏱ {post.readingTime}</span>
                <span className="text-[14px] font-bold text-[#E8505B]">
                  Read
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}