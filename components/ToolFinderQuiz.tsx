"use client";

// components/ToolFinderQuiz.tsx
// Interactive 2-question quiz that gives a personalized recommendation.

import { useState } from "react";

type Result = { emoji: string; title: string; desc: string; href: string };
type Goal = "sell" | "compare" | "legit";
type Priority = "fast" | "fees" | "safety";

const RESULTS: Record<Goal, Record<Priority, Result>> = {
  sell: {
    fast: {
      emoji: "⚡",
      title: "FeetFinder Review 2026",
      desc: "You want your first sale fast — start with the platform that has built-in buyer discovery, so buyers find you instead of the other way around.",
      href: "/feetfinder-review",
    },
    fees: {
      emoji: "💰",
      title: "Best Platforms to Sell On (2026)",
      desc: "You care about keeping more of what you earn — here's every major platform ranked by real fees, commissions, and payout minimums.",
      href: "/best-websites-to-sell-feet-pics-online",
    },
    safety: {
      emoji: "🛡️",
      title: "How to Sell Safely & Anonymously",
      desc: "Safety first — this guide covers verification, staying anonymous, spotting fake buyers, and keeping payments protected.",
      href: "/how-to-sell-feet-pics-and-make-money",
    },
  },
  compare: {
    fast: {
      emoji: "⚔️",
      title: "All Platform Comparisons",
      desc: "Head-to-head breakdowns with clear winners — same criteria, real numbers, no bias.",
      href: "/category/comparisons",
    },
    fees: {
      emoji: "⚔️",
      title: "All Platform Comparisons",
      desc: "We compare real fees, commissions, and payout terms side by side — so you can see exactly which platform costs less.",
      href: "/category/comparisons",
    },
    safety: {
      emoji: "⚔️",
      title: "All Platform Comparisons",
      desc: "We compare verification, buyer quality, and seller protection side by side — so you know which platform keeps you safer.",
      href: "/category/comparisons",
    },
  },
  legit: {
    fast: {
      emoji: "🚩",
      title: "Our Latest Honest Reviews",
      desc: "Every review runs the same checks — verification, payout proof, and real seller complaints. Get the honest verdict before you pay.",
      href: "/category/reviews",
    },
    fees: {
      emoji: "🚩",
      title: "Our Latest Honest Reviews",
      desc: "We break down the real fees most reviews get wrong — subscriptions, commissions, and hidden payout minimums.",
      href: "/category/reviews",
    },
    safety: {
      emoji: "🚩",
      title: "Our Latest Honest Reviews",
      desc: "We check verification, privacy, and scam reports on every platform — so you know it's safe before you sign up.",
      href: "/category/reviews",
    },
  },
};

export default function ToolFinderQuiz() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const progress = step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  const result = goal && priority ? RESULTS[goal][priority] : null;

  function pickGoal(g: Goal) {
    setGoal(g);
    setStep(2);
  }
  function pickPriority(p: Priority) {
    setPriority(p);
    setStep(3);
  }
  function restart() {
    setGoal(null);
    setPriority(null);
    setStep(1);
  }

  const optClass =
    "flex w-full items-center gap-3 rounded-xl border-2 border-[#e8e8f0] bg-white px-5 py-4 text-left text-[15px] font-semibold text-[#1a1a2e] transition-all hover:border-[#E8505B] hover:bg-[#FDF0F1] hover:shadow-[0_2px_10px_rgba(232,80,91,0.12)] cursor-pointer";

  return (
    <section className="bg-[#F7F4F2] py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <span className="mb-4 inline-block border-b-2 border-[#E8505B] pb-1 text-xs font-bold tracking-wider text-[#E8505B]">
            FIND YOUR MATCH
          </span>
          <h2 className="text-[26px] font-extrabold text-[#1a1a2e] md:text-[28px]">
            Not Sure Which Platform Is Right for You? Take the 30-Second Quiz
          </h2>
          <p className="mt-2 text-[15px] text-[#6b6b78]">
            Answer 2 quick questions, get a personalized recommendation.
          </p>
        </div>

        <div className="mx-auto mt-7 max-w-[560px] rounded-2xl border border-[#e8e8f0] bg-white p-6 shadow-[0_4px_20px_rgba(26,26,46,0.06)] md:p-8">
          <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-[#e8e8f0]">
            <div
              className="h-full rounded-full bg-[#E8505B] transition-all duration-300"
              style={{ width: progress }}
            />
          </div>

          {step === 1 && (
            <div>
              <span className="text-xs font-bold tracking-wide text-[#E8505B]">QUESTION 1 OF 2</span>
              <div className="mb-5 mt-1.5 text-[22px] font-extrabold text-[#1a1a2e]">
                What&apos;s your main goal?
              </div>
              <div className="grid gap-3">
                <button type="button" onClick={() => pickGoal("sell")} className={optClass}>
                  <span className="text-[22px]">💰</span> Start selling my content
                </button>
                <button type="button" onClick={() => pickGoal("compare")} className={optClass}>
                  <span className="text-[22px]">⚔️</span> Compare two platforms
                </button>
                <button type="button" onClick={() => pickGoal("legit")} className={optClass}>
                  <span className="text-[22px]">🚩</span> Check if a platform is legit
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <span className="text-xs font-bold tracking-wide text-[#E8505B]">QUESTION 2 OF 2</span>
              <div className="mb-5 mt-1.5 text-[22px] font-extrabold text-[#1a1a2e]">
                What matters most to you?
              </div>
              <div className="grid gap-3">
                <button type="button" onClick={() => pickPriority("fast")} className={optClass}>
                  <span className="text-[22px]">⚡</span> Fastest results
                </button>
                <button type="button" onClick={() => pickPriority("fees")} className={optClass}>
                  <span className="text-[22px]">🆓</span> Lowest fees &amp; costs
                </button>
                <button type="button" onClick={() => pickPriority("safety")} className={optClass}>
                  <span className="text-[22px]">🛡️</span> Safety &amp; anonymity
                </button>
              </div>
            </div>
          )}

          {step === 3 && result && (
            <div className="text-center">
              <span className="text-xs font-bold tracking-wide text-[#E8505B]">YOUR MATCH</span>
              <h3 className="my-2 text-[24px] font-extrabold text-[#1a1a2e]">
                {result.emoji} {result.title}
              </h3>
              <p className="mb-5 text-[15px] text-[#6b6b78]">{result.desc}</p>
              <a
                href={result.href}
                className="inline-block rounded-lg bg-[#E8505B] px-7 py-3 font-bold text-white transition hover:bg-[#c93842]"
              >
                See Your Recommendation →
              </a>
              <div>
                <button
                  type="button"
                  onClick={restart}
                  className="mt-4 text-[13px] text-[#6b6b78] underline hover:text-[#1a1a2e]"
                >
                  ↺ Retake quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}