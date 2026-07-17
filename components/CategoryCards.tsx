// components/CategoryCards.tsx
// "Browse by Category" cards — real categories from the nav with live post counts.
// Counts update automatically on every deploy (no more hardcoded numbers).

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

// Pick which 4 categories to feature here (order matters).
// Swap any line to change the featured categories.
const FEATURED_CATEGORIES = [
  { label: "AI Writing Tools", slug: "ai-writing-tools", emoji: "✍️" },
  { label: "AI Image Tools", slug: "ai-image-tools", emoji: "🖌️" },
  { label: "Comparisons", slug: "comparisons", emoji: "⚔️" },
  { label: "Lifestyle", slug: "lifestyle", emoji: "🌟" },
];

export default function CategoryCards() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="mb-8 text-[26px] font-bold text-[#1a1a2e]">Browse by Category</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURED_CATEGORIES.map((cat) => {
        const count = posts.filter((p) => p.categorySlug === cat.slug).length;
        return (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group rounded-2xl bg-[#1a1a2e] p-8 text-center transition hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-xl border-2 border-[#E8505B] text-4xl transition group-hover:bg-[#E8505B]/10">
              {cat.emoji}
            </span>
            <h3 className="text-[17px] font-bold text-white transition group-hover:text-[#E8505B]">
              {cat.label}
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {count} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
      </div>
    </section>
  );
}