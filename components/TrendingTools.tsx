// components/TrendingTools.tsx
// "Editor's Top Picks" — replaces the static trending list.
// Every card links to one of your own posts. To update picks later,
// just edit the PICKS array below (name, score, tag, blurb, href).

import Link from "next/link";

const PICKS = [
  {
    rank: 1,
    name: "Claude",
    tag: "Best AI Writer",
    score: "9.3",
    blurb: "The most human-sounding writing of any AI tool we tested.",
    href: "/chatgpt-vs-claude",
  },
  {
    rank: 2,
    name: "Midjourney V7",
    tag: "Best AI Images",
    score: "9.2",
    blurb: "Unmatched artistic quality — cinematic visuals every time.",
    href: "/best-ai-image-generators",
  },
  {
    rank: 3,
    name: "Jasper AI",
    tag: "Best for Marketing",
    score: "9.0",
    blurb: "Brand voice and content pipelines built for teams at scale.",
    href: "/jasper-ai-review",
  },
  {
    rank: 4,
    name: "Surfer SEO",
    tag: "Best for SEO",
    score: "8.5",
    blurb: "Real-time SEO scoring that helps content actually rank.",
    href: "/frase-vs-surfer-seo",
  },
];

export default function TrendingTools() {
  return (
    <section className="bg-[#f4f5f8]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-[24px] font-bold text-[#1a1a2e]">
            🏆 Editor&apos;s Top Picks
          </h2>
          <p className="text-sm text-[#777]">Tested by us — not sponsored</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PICKS.map((pick) => (
            <Link
              key={pick.rank}
              href={pick.href}
              className="group relative overflow-hidden rounded-2xl bg-[#1a1a2e] p-6 transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* big faint rank number in the background */}
              <span className="pointer-events-none absolute -right-2 -top-6 text-[90px] font-black leading-none text-white/5">
                {pick.rank}
              </span>

              <span className="inline-block rounded-full bg-[#E8505B]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#E8505B]">
                {pick.tag}
              </span>

              <div className="mt-4 flex items-baseline justify-between gap-2">
                <h3 className="text-[19px] font-bold text-white transition group-hover:text-[#E8505B]">
                  {pick.name}
                </h3>
                <span className="shrink-0 text-[20px] font-black text-[#E8505B]">
                  {pick.score}
                  <span className="text-[12px] font-semibold text-gray-500">/10</span>
                </span>
              </div>

              <p className="mt-2 text-[13px] leading-relaxed text-gray-400">
                {pick.blurb}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#E8505B]">
                Read review
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}