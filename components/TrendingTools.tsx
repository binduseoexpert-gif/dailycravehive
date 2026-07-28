// components/TrendingTools.tsx
// "Start Here by Goal" — evergreen, never needs updating.
// Guides visitors to the right content based on what they want to accomplish.

import Link from "next/link";

const GOALS = [
  {
    emoji: "✍️",
    title: "I Want to Write Better Content",
    desc: "AI writing tools that actually produce usable content — tested, scored, and ranked.",
    cta: "See Best Writing Tools",
    href: "/best-ai-writing-tools",
    gradient: "from-[#E8505B]/20 to-[#E8505B]/5",
    border: "hover:border-[#E8505B]",
  },
  {
    emoji: "🖼️",
    title: "I Need to Create Images",
    desc: "Midjourney, DALL-E, FLUX and more — which AI image generator fits your style and budget.",
    cta: "See Best Image Tools",
    href: "/best-ai-image-generators",
    gradient: "from-[#3b82f6]/20 to-[#3b82f6]/5",
    border: "hover:border-[#3b82f6]",
  },
  {
    emoji: "💰",
    title: "I Want to Earn Online",
    desc: "Honest platform reviews with real fees, verified payouts, and anti-scam guides.",
    cta: "See Earning Platforms",
    href: "/best-websites-to-sell-feet-pics-online",
    gradient: "from-[#22c55e]/20 to-[#22c55e]/5",
    border: "hover:border-[#22c55e]",
  },
  {
    emoji: "⚔️",
    title: "I'm Comparing Two Tools",
    desc: "Head-to-head breakdowns — same prompts, same tests, clear winner. No bias.",
    cta: "See All Comparisons",
    href: "/category/comparisons",
    gradient: "from-[#f59e0b]/20 to-[#f59e0b]/5",
    border: "hover:border-[#f59e0b]",
  },
];

export default function TrendingTools() {
  return (
    <section className="bg-[#f4f5f8]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-[24px] font-bold text-[#1a1a2e]">
            🧭 Start Here — What Are You Looking For?
          </h2>
          <p className="text-sm text-[#777]">Pick your goal — we'll point you to the right guide</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {GOALS.map((goal) => (
            <Link
              key={goal.href}
              href={goal.href}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${goal.gradient} border-2 border-transparent bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${goal.border}`}
            >
              <span className="text-3xl">{goal.emoji}</span>

              <h3 className="mt-3 text-[18px] font-bold text-[#1a1a2e]">
                {goal.title}
              </h3>

              <p className="mt-2 text-[14px] leading-relaxed text-[#555]">
                {goal.desc}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#E8505B]">
                {goal.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}