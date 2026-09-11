// app/write-for-us/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Write For Us — Guest Posts on Creator & Adult Platforms",
  description:
    "Submit a guest post to Daily Crave Hive — creator economy, adult platforms, earning guides and platform reviews. Free and sponsored options. 18+ niche.",
};

const TOPICS_YES = [
  "Creator & adult platform reviews and comparisons",
  "OnlyFans, Fansly, Fanvue & creator platform guides",
  "Selling content online — pricing, promotion, safety",
  "Feet pic & niche marketplace selling guides",
  "Creator economy trends and monetization",
  "Payout, fees and platform policy breakdowns",
  "Digital privacy & anonymity for creators",
  "Scam awareness and buyer red flags",
];

const TOPICS_NO = [
  "Gambling, casino or crypto promotion",
  "Pharma or supplement content",
  "AI-generated, spun or plagiarized content",
  "Anything illegal or involving minors — zero tolerance",
  "Explicit/graphic content (we cover platforms, not adult content itself)",
  "Link schemes, PBN or off-topic links",
];

const PLANS = [
  {
    name: "Free Guest Post",
    price: "$0",
    popular: false,
    features: [
      "1,000+ word original article",
      "1 relevant backlink (editorial discretion)",
      "Author bio with link",
      "Editorial review & feedback",
      "Published within 7–14 days if approved",
    ],
  },
  {
    name: "Standard Placement",
    price: "$79",
    popular: true,
    features: [
      "1,200+ word article (yours, reviewed by us)",
      "Up to 2 relevant links (labeled per Google guidelines)",
      "Published within 5 business days",
      "Author bio with photo & links",
      "Share on our X profile",
      "Permanent placement",
    ],
  },
  {
    name: "Premium Placement",
    price: "$149",
    popular: false,
    features: [
      "1,500+ word in-depth article",
      "Up to 3 relevant links (labeled per Google guidelines)",
      "Priority publishing (48–72 hours)",
      "Internal links from 2 related articles",
      "Social promotion (X + Pinterest)",
      "Permanent placement",
    ],
  },
];

const BENEFITS = [
  {
    emoji: "🎯",
    title: "Targeted Niche Audience",
    desc: "Readers here are actively researching creator platforms, fees and payouts — not random traffic.",
  },
  {
    emoji: "🔗",
    title: "Real Editorial Standards",
    desc: "We test platforms hands-on. Publishing here signals credibility, not a link farm.",
  },
  {
    emoji: "♾️",
    title: "Permanent Placement",
    desc: "Approved posts stay live. No 90-day removals. Your content keeps working.",
  },
  {
    emoji: "🤝",
    title: "Fair Attribution",
    desc: "Full author bio with your links and photo on every published post.",
  },
];

const GUIDELINES = [
  ["📝 Word count", "1,000+ words minimum. Well-researched beats long."],
  ["✍️ Originality", "100% original. We check every submission — AI-generated or previously published content is rejected."],
  ["🔗 Links", "Relevant links only, per your plan. No gambling, pharma or off-topic links. We may adjust link attributes."],
  ["📸 Images", "2–3 royalty-free images with credits, or we add our own."],
  ["📋 Formatting", "Proper H2/H3 headings, short paragraphs, honest claims with sources."],
  ["🔞 Compliance", "18+ niche. Everything must be legal, verified and non-explicit — we cover platforms, not adult content itself."],
];

export default function WriteForUsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="py-16"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #fce4ec 0%, #f06292 60%, #ffffff 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8505B] bg-white/80 px-4 py-1 text-xs font-semibold tracking-wide text-[#E8505B]">
            ✍️ GUEST POSTS OPEN
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-[#1a1a2e] md:text-4xl">
            Write For Us — Creator &amp; Adult Platform Guest Posts
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#1a1a2e] md:text-lg">
            Share your expertise with a fast-growing audience of creators
            researching platforms, fees, payouts and safety. Free and sponsored
            options available. 18+ niche.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            
              <a href="#submit"
              className="rounded-full bg-[#E8505B] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c93842]"
            >
              Submit a Post ↓
            </a>
            
              <a href="#pricing"
              className="rounded-full bg-[#1a1a2e] px-7 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              View Options ↓
            </a>
          </div>
        </div>
      </section>

      {/* Why publish */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="border-l-4 border-[#E8505B] pl-4 text-[24px] font-bold text-[#1a1a2e]">
          Why Publish on Daily Crave Hive?
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-[#f0d5dc] bg-[#FDF6F8] p-5"
            >
              <span className="text-2xl">{b.emoji}</span>
              <h3 className="mt-2 text-[16px] font-bold text-[#1a1a2e]">
                {b.title}
              </h3>
              <p className="mt-1 text-[14px] leading-relaxed text-[#6b6b78]">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="bg-[#F7F4F2] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="border-l-4 border-[#E8505B] pl-4 text-[24px] font-bold text-[#1a1a2e]">
            Topics We Accept
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-[17px] font-bold text-[#16a34a]">
                We welcome
              </h3>
              <ul className="space-y-2">
                {TOPICS_YES.map((t) => (
                  <li key={t} className="text-[15px] text-[#1a1a2e]">
                    ✅ {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-[17px] font-bold text-[#E8505B]">
                We reject
              </h3>
              <ul className="space-y-2">
                {TOPICS_NO.map((t) => (
                  <li key={t} className="text-[15px] text-[#1a1a2e]">
                    ❌ {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="border-l-4 border-[#E8505B] pl-4 text-[24px] font-bold text-[#1a1a2e]">
          Guest Post Options
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.popular
                  ? "relative rounded-2xl border-2 border-[#E8505B] bg-white p-6 shadow-[0_12px_30px_-10px_rgba(232,80,91,0.3)]"
                  : "relative rounded-2xl border-2 border-[#f0d5dc] bg-white p-6"
              }
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#E8505B] px-4 py-1 text-[11px] font-bold uppercase text-white">
                  Popular
                </span>
              )}
              <h3 className="text-[18px] font-bold text-[#1a1a2e]">
                {plan.name}
              </h3>
              <p className="mt-1 text-[32px] font-extrabold text-[#E8505B]">
                {plan.price}
              </p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-[14px] leading-relaxed text-[#444]">
                    ✓ {f}
                  </li>
                ))}
              </ul>
              
                <a href="#submit"
                className={
                  plan.popular
                    ? "mt-6 block rounded-full bg-[#E8505B] px-5 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#c93842]"
                    : "mt-6 block rounded-full border-2 border-[#E8505B] px-5 py-2.5 text-center text-sm font-bold text-[#E8505B] transition hover:bg-[#FDF0F1]"
                }
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-[#8a8a98]">
          Sponsored and paid placements are disclosed and labeled in line with
          FTC and Google guidelines. We reserve the right to edit, reject, or
          adjust link attributes on any submission.
        </p>
      </section>

      {/* Guidelines */}
      <section className="bg-[#F7F4F2] py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="border-l-4 border-[#E8505B] pl-4 text-[24px] font-bold text-[#1a1a2e]">
            Guidelines &amp; Requirements
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDELINES.map(([title, desc]) => (
              <div
                key={title}
                className="rounded-2xl border border-[#f0d5dc] bg-white p-5"
              >
                <h3 className="text-[15px] font-bold text-[#1a1a2e]">{title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-[#6b6b78]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit */}
      <section id="submit" className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-[26px] font-bold text-[#1a1a2e]">
          Submit Your Guest Post
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#6b6b78]">
          Email your pitch or full draft with the subject line{" "}
          <strong>&ldquo;Guest Post — [Your Topic]&rdquo;</strong>. Include your
          proposed title, a short outline or Google Doc link, your website, and
          which option you&apos;re interested in. We reply within 48 hours.
        </p>
        
         <a href="mailto:alma@dailycravehive.com?subject=Guest%20Post%20Submission"
          className="mt-6 inline-block rounded-full bg-[#E8505B] px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#c93842]"
        >
          📧 alma@dailycravehive.com
        </a>
        <p className="mt-4 text-[13px] text-[#8a8a98]">
          Or use our{" "}
          <a href="/contact-us" className="text-[#E8505B] underline">
            contact page
          </a>
          . Free submissions are reviewed but not guaranteed publication.
        </p>
      </section>
    </div>
  );
}