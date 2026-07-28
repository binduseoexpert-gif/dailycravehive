// components/TrendingTools.tsx
// "Start Here by Goal" — with hover effects, entrance animation, shine sweep

import Link from "next/link";

const GOALS = [
  {
    emoji: "✍️",
    title: "I Want to Write Better Content",
    desc: "AI writing tools that actually produce usable content — tested, scored, and ranked.",
    cta: "See Best Writing Tools",
    href: "/best-ai-writing-tools",
    color: "#E8505B",
    bg: "from-[#E8505B]/15 to-[#E8505B]/5",
    glow: "hover:shadow-[0_12px_35px_-10px_rgba(232,80,91,0.4)]",
    ring: "hover:ring-[#E8505B]/60",
  },
  {
    emoji: "🖼️",
    title: "I Need to Create Images",
    desc: "Midjourney, DALL-E, FLUX and more — which AI image generator fits your style and budget.",
    cta: "See Best Image Tools",
    href: "/best-ai-image-generators",
    color: "#3b82f6",
    bg: "from-[#3b82f6]/15 to-[#3b82f6]/5",
    glow: "hover:shadow-[0_12px_35px_-10px_rgba(59,130,246,0.4)]",
    ring: "hover:ring-[#3b82f6]/60",
  },
  {
    emoji: "💰",
    title: "I Want to Earn Online",
    desc: "Honest platform reviews with real fees, verified payouts, and anti-scam guides.",
    cta: "See Earning Platforms",
    href: "/best-websites-to-sell-feet-pics-online",
    color: "#22c55e",
    bg: "from-[#22c55e]/15 to-[#22c55e]/5",
    glow: "hover:shadow-[0_12px_35px_-10px_rgba(34,197,94,0.4)]",
    ring: "hover:ring-[#22c55e]/60",
  },
  {
    emoji: "⚔️",
    title: "I'm Comparing Two Tools",
    desc: "Head-to-head breakdowns — same prompts, same tests, clear winner. No bias.",
    cta: "See All Comparisons",
    href: "/category/comparisons",
    color: "#f59e0b",
    bg: "from-[#f59e0b]/15 to-[#f59e0b]/5",
    glow: "hover:shadow-[0_12px_35px_-10px_rgba(245,158,11,0.4)]",
    ring: "hover:ring-[#f59e0b]/60",
  },
];

export default function TrendingTools() {
  return (
    <section className="relative overflow-hidden bg-[#f4f5f8]">
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-[#E8505B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-[#3b82f6]/10 blur-3xl" />

      {/* entrance animation */}
      <style>{`
        @keyframes goalFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .goal-card { animation: none !important; }
        }
      `}</style>

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-[24px] font-bold text-[#1a1a2e]">
            🧭 Start Here — What Are You Looking For?
          </h2>
          <p className="text-sm text-[#777]">Pick your goal — we&apos;ll point you to the right guide</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {GOALS.map((goal, i) => (
            <Link
              key={goal.href}
              href={goal.href}
              style={{ animation: `goalFadeUp 0.5s ease-out ${i * 0.1}s both` }}
              className={`goal-card group relative overflow-hidden rounded-2xl bg-gradient-to-br ${goal.bg} p-6 ring-2 ring-[#1a1a2e]/50 transition-all duration-300 hover:-translate-y-1.5 ${goal.glow} ${goal.ring}`}
            >
              {/* shine sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

              {/* top accent line */}
              <span
                className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: goal.color }}
              />

              {/* emoji with colored bg circle */}
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${goal.color}15` }}
              >
                {goal.emoji}
              </span>

              <h3 className="mt-3 text-[18px] font-bold text-[#1a1a2e] transition-colors duration-300 group-hover:text-[#E8505B]">
                {goal.title}
              </h3>

              <p className="mt-2 text-[14px] leading-relaxed text-[#555]">
                {goal.desc}
              </p>

              <span
                className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold"
                style={{ color: goal.color }}
              >
                {goal.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t-2 border-[#E8505B]" />
    </section>
  );
}