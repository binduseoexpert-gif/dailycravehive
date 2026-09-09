import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Daily Crave Hive | Honest Creator & Adult Platform Reviews",
  description:
    "Independent hands-on reviews of creator platforms — fees, payouts, scam checks. No paid rankings. 18+.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Hero — same gradient as homepage */}
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8505B] bg-white/80 px-4 py-1 text-xs font-semibold tracking-wide text-[#E8505B]">
            ABOUT US
          </span>
          <h1 className="mt-5 text-3xl font-bold text-[#1a1a2e] md:text-4xl">
            About Daily Crave Hive
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#1a1a2e]/70">
            Honest, hands-on reviews of creator and adult platforms — real fees,
            verified payouts, scam checks. Tested by humans. Rankings aren&apos;t
            for sale. 18+.
          </p>
        </div>
      </section>

      {/* Red accent divider — like homepage */}
      <div className="mx-auto my-0 max-w-6xl border-t-2 border-[#E8505B]" />

      <section className="mx-auto w-full max-w-3xl space-y-10 px-4 py-14">
        {/* Who We Are */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            Who We Are
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Daily Crave Hive started with a simple frustration: every search for
              &quot;is this platform legit?&quot; led to either hype-filled
              affiliate spam or a review clearly written by someone who never
              signed up, never paid a fee, and never waited on a payout.
            </p>
            <p>So we built the site we wished existed.</p>
            <p>
              Daily Crave Hive is an independent review site run by editor{" "}
              <strong>Alma Martin</strong>. We test creator platforms and niche
              marketplaces the way a new seller actually experiences them —
              signup, ID verification, fees, payout rules, safety tools, and
              support — then tell you what&apos;s real without sugarcoating it.
            </p>
            <p>
              We&apos;re independent. No company can pay to rank higher or buy a
              &quot;best of&quot; slot. When we recommend something, it&apos;s
              because the product earned it. When something disappoints, we say
              that too. Sponsored or featured content is always clearly labelled.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            What We Do
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Every week we pick platforms people are actually searching for —
              OnlyFans alternatives, Fansly, Fanvue, FeetFinder, and other earning
              marketplaces trending with creators. We sign up, pay real fees where
              required, and run each one through the same checks.
            </p>
            <p>
              For subscription platforms, that means commission splits, payout
              minimums and hold times, discovery (or the lack of it), content
              rules, and whether beginners can actually get found. For niche
              marketplaces, we dig into seller plans, service fees, buyer traffic,
              anonymity, and scam risk.
            </p>
            <p>
              Then we score each platform on fixed criteria: fees &amp; value,
              payouts, safety, results for new creators, and overall fit. Those
              scores feed the review. We also publish head-to-head comparisons
              (like Fansly vs OnlyFans) and practical guides on pricing,
              promotion, and staying anonymous.
            </p>
          </div>
        </div>

        {/* Why Trust Us — as cards, matching homepage's dark boxes */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            Why Trust Us?
          </h2>
          <p className="mb-6 text-base leading-relaxed text-gray-700">
            There are hundreds of review sites out there. Here&apos;s what makes
            Daily Crave Hive different:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                t: "We actually use what we review.",
                d: "Every platform gets hands-on testing before we write. We don't copy fee tables from pricing pages and call it a review.",
              },
              {
                t: "Rankings can't be bought.",
                d: "If something ranks high, it earned the spot through performance — not payment. Sponsored content is always labelled.",
              },
              {
                t: "We update when the product changes.",
                d: "Fees, payouts, and policies move fast. We revisit reviews and refresh numbers, dates, and verdicts so you're not reading stale advice.",
              },
              {
                t: "We write for real creators.",
                d: "Our readers need clear answers: Is it legit? What do I actually keep? How long until payout? Can I stay anonymous? Simple language, real numbers, honest opinions.",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="rounded-2xl bg-[#1a1a2e] p-5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="mb-2 flex items-center gap-2 text-[15px] font-bold text-white">
                  <span className="text-[#E8505B]">✅</span> {item.t}
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Cover */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            What We Cover
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Daily Crave Hive is organised around what you&apos;re trying to do —
              find a legit platform, compare fees, or learn how to sell safely:
            </p>
            <p>
              <strong>Reviews</strong> — Single-platform deep dives: fees,
              payouts, legitimacy, safety, and who it&apos;s for (and who should
              skip it).
            </p>
            <p>
              <strong>Comparisons</strong> — Side-by-side breakdowns of platforms
              people confuse — same criteria, clear winner by creator type.
            </p>
            <p>
              <strong>Best Of</strong> — Ranked roundups of platforms that are
              actually active and worth your time, updated as the market changes.
            </p>
            <p>
              <strong>Guides</strong> — How-tos on selling, pricing, promotion,
              and privacy — including niche guides for staying anonymous and
              getting paid.
            </p>
          </div>
        </div>

        {/* Meet the Editor */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            Meet the Editor
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              <strong>Alma Martin</strong> is the editor behind Daily Crave Hive.
              She signs up for creator platforms and niche marketplaces, verifies
              real fees and payout rules, and checks legitimacy and safety before
              anything gets published. Her focus is practical advice for adult
              creators: which platforms actually pay, how payouts work, and how to
              stay anonymous. Rankings aren&apos;t for sale.
            </p>
          </div>
        </div>

        {/* Affiliate */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            A Note on Affiliate Links
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Some articles contain affiliate links. If you click and sign up or
              purchase, we may earn a commission at no extra cost to you. That
              helps fund testing, subscriptions, and free content.
            </p>
            <p>
              Important: affiliate partnerships never change our scores or
              recommendations. Editorial decisions are based on testing and
              performance — not who pays a commission.
            </p>
          </div>
        </div>

        {/* 18+ */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            18+ Only
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Daily Crave Hive covers platforms used by adult creators. Content
              and recommendations are intended for readers aged 18 or over.
              Selling your own content is legal in most places when you&apos;re
              18+, verified, and following platform and local rules — always check
              your own country&apos;s laws.
            </p>
          </div>
        </div>

        {/* Get in Touch — highlighted box like homepage's contact strip */}
        <div className="rounded-2xl bg-gradient-to-b from-pink-100 to-pink-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e]">Get in Touch</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-gray-700">
            Have a question? Want a platform reviewed? Found something we got
            wrong? We&apos;d love to hear from you — we typically reply within
            24–48 hours.
          </p>
          <Link
            href="/contact-us"
            className="mt-6 inline-block rounded-full bg-[#E8505B] px-8 py-3 font-semibold text-white transition hover:bg-[#d4454e]"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </div>
  );
}
