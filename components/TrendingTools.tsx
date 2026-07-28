import Link from "next/link";

const GOALS = [
  {
    emoji: "✍️",
    title: "I Want to Write Better Content",
    desc: "AI writing tools that actually produce usable content — tested, scored, and ranked.",
    cta: "See Best Writing Tools",
    href: "/best-ai-writing-tools",
    accent: "#E8505B",
  },
  {
    emoji: "🖼️",
    title: "I Need to Create Images",
    desc: "Midjourney, DALL-E, FLUX and more — which AI image generator fits your style and budget.",
    cta: "See Best Image Tools",
    href: "/best-ai-image-generators",
    accent: "#3b82f6",
  },
  {
    emoji: "💰",
    title: "I Want to Earn Online",
    desc: "Honest platform reviews with real fees, verified payouts, and anti-scam guides.",
    cta: "See Earning Platforms",
    href: "/best-websites-to-sell-feet-pics-online",
    accent: "#22c55e",
  },
  {
    emoji: "⚔️",
    title: "I'm Comparing Two Tools",
    desc: "Head-to-head breakdowns — same prompts, same tests, clear winner. No bias.",
    cta: "See All Comparisons",
    href: "/category/comparisons",
    accent: "#f59e0b",
  },
];

export default function TrendingTools() {
  return (
    <section className="relative overflow-hidden bg-[#f4f5f8]">
      <div className="pointer-events-none absolute -left-20 top-10 h-60 w-60 rounded-full bg-[#E8505B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-[#3b82f6]/10 blur-3xl" />

      <style>{`
        @keyframes goalFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
              style={{ animation: `goalFadeUp 0.5s ease-out ${i * 0.1}s both`, borderLeftColor: goal.accent }}
              className="group relative overflow-hidden rounded-2xl border-l-4 bg-gradient-to-br from-[#1e1e30] to-[#14141f] p-6 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-12px_rgba(232,80,91,0.35)] hover:ring-white/25"
            >
              {/* shine sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

              {/* top accent line */}
              <span className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: goal.accent }} />

              {/* emoji */}
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${goal.accent}20` }}>
                {goal.emoji}
              </span>

              <h3 className="mt-3 text-[18px] font-bold text-white transition-colors duration-300 group-hover:text-[#E8505B]">
                {goal.title}
              </h3>

              <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
                {goal.desc}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold" style={{ color: goal.accent }}>
                {goal.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}