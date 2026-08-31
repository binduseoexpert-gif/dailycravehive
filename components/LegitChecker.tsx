"use client";

// components/LegitChecker.tsx
// "Is It Legit?" instant checker. Receives reviewed platforms from the server
// (page.tsx passes them), so it auto-updates whenever a new review is published.

import { useState } from "react";

export type CheckedPlatform = { name: string; slug: string; blurb: string };

export default function LegitChecker({ platforms }: { platforms: CheckedPlatform[] }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<
    | { type: "idle" }
    | { type: "safe"; name: string; slug: string; blurb: string }
    | { type: "unknown"; name: string }
  >({ type: "idle" });

  function check(raw?: string) {
    const q = (raw ?? query).trim();
    if (!q) {
      setResult({ type: "idle" });
      return;
    }
    const norm = q.toLowerCase().replace(/\s+/g, "");
    const found = platforms.find((p) => {
      const pn = p.name.toLowerCase().replace(/\s+/g, "");
      return pn.includes(norm) || norm.includes(pn);
    });
    if (found) {
      setResult({ type: "safe", name: found.name, slug: found.slug, blurb: found.blurb });
    } else {
      setResult({ type: "unknown", name: q });
    }
  }

  function quick(name: string) {
    setQuery(name);
    check(name);
  }

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-[720px] rounded-2xl bg-[#1a1a2e] p-6 text-white md:p-9">
          <span className="mb-4 inline-block border-b-2 border-[#E8505B] pb-1 text-xs font-bold tracking-wider text-[#E8505B]">
            TRUST TOOL
          </span>
          <h2 className="text-[26px] font-extrabold text-white md:text-[28px]">
            Is That Platform Legit? Check Instantly
          </h2>
          <p className="mt-2 text-[15px] text-[#b8b8c8]">
            Type a platform name — we&apos;ll tell you if we&apos;ve tested it and whether it&apos;s safe.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder="e.g. FeetFinder, SmutFinder, Feetify..."
              className="w-full flex-1 rounded-lg border border-[#3a3a4d] bg-white px-4 py-3.5 text-[15px] text-[#1a1a2e] outline-none placeholder:text-[#9a9ab0] focus:border-[#E8505B]"
            />
            <button
              type="button"
              onClick={() => check()}
              className="shrink-0 rounded-lg bg-[#E8505B] px-7 py-3.5 font-bold text-white transition hover:bg-[#c93842]"
            >
              Check
            </button>
          </div>

          {result.type === "safe" && (
            <div className="mt-5 rounded-xl border border-[#2ecc71] bg-[rgba(46,204,113,0.15)] p-4 font-semibold text-[#7ee2a8]">
              ✓ TESTED &amp; LEGIT — We&apos;ve reviewed {result.name}. {result.blurb}{" "}
              <a href={`/${result.slug}`} className="text-white underline">
                → Read our review
              </a>
            </div>
          )}
          {result.type === "unknown" && (
            <div className="mt-5 rounded-xl border border-[#E8505B] bg-[rgba(232,80,91,0.15)] p-4 font-semibold text-[#ffa8b0]">
              ⚠️ We haven&apos;t tested &quot;{result.name}&quot; yet. Be cautious with unverified
              platforms — check for ID verification and on-platform payments before you pay.{" "}
              <a href="/contact-us" className="text-white underline">
                Request a review →
              </a>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mb-1 w-full text-[13px] text-[#888]">Popular checks:</span>
            {platforms.slice(0, 5).map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => quick(p.name)}
                className="rounded-full border border-[#3a3a4d] bg-[#2d2d3a] px-3.5 py-1.5 text-[13px] text-[#b8b8c8] transition hover:border-[#E8505B] hover:text-white"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}