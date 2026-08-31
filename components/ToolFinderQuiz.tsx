"use client";

// components/ToolFinderQuiz.tsx
// Interactive 2-question quiz that gives a personalized recommendation.

import { useState } from "react";

type Result = { emoji: string; title: string; desc: string; href: string };

const RESULTS: Record<string, Result> = {
  earn: {
    emoji: "💰",
    title: "Money Making Ideas 2026",
    desc: "Based on your answers, this is your best starting point — 35 ideas ranked by profit potential and safety.",
    href: "/top-money-making-ideas-start-earning-from-home",
  },
  write: {
    emoji: "✍️",
    title: "Best AI Writing Tools 2026",
    desc: "You'll want our hands-on ranking of AI writers — tested, scored, and compared on real output.",
    href: "/best-ai-writing-tools",
  },
  reviews: {
    emoji: "🔍",
    title: "Our Latest Honest Reviews",
    desc: "You'll get the most from our in-depth, tested reviews — real fees, safety checks, and honest verdicts.",
    href: "/category/reviews",
  },
};

export default function ToolFinderQuiz() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState<keyof typeof RESULTS | null>(null);

  const progress = step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  const result = goal ? RESULTS[goal] : null;

  function pickGoal(g: keyof typeof RESULTS) {
    setGoal(g);
    setStep(2);
  }
  function finish() {
    setStep(3);
  }
  function restart() {
    setGoal(null);
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
            Not Sure Where to Start? Take the 30-Second Quiz
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
                <button type="button" onClick={() => pickGoal("earn")} className={optClass}>
                  <span className="text-[22px]">💰</span> Earn money online
                </button>
                <button type="button" onClick={() => pickGoal("write")} className={optClass}>
                  <span className="text-[22px]">✍️</span> Create better content with AI
                </button>
                <button type="button" onClick={() => pickGoal("reviews")} className={optClass}>
                  <span className="text-[22px]">🔍</span> Read honest platform reviews
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
                <button type="button" onClick={finish} className={optClass}>
                  <span className="text-[22px]">🆓</span> Lowest cost / free options
                </button>
                <button type="button" onClick={finish} className={optClass}>
                  <span className="text-[22px]">⚡</span> Fastest results
                </button>
                <button type="button" onClick={finish} className={optClass}>
                  <span className="text-[22px]">🛡️</span> Safety &amp; trust
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