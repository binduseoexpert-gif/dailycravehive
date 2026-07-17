// components/Newsletter.tsx
// Newsletter replaced with a "Start Here" CTA banner (same spot, same gradient).
// When you're ready to run a real newsletter later, this file is the place to wire it up.

import Link from "next/link";

export default function Newsletter() {
  return (
    <section className="bg-gradient-to-b from-pink-100 to-pink-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-[24px] font-bold text-[#1a1a2e] md:text-[26px]">
            🐝 New Here? Start With Our Best Guides
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#555]">
            Honest, hands-on reviews — no hype, no sponsored rankings. These two
            guides are the fastest way to find the right AI tool for you.
          </p>
          <p className="mt-3 text-sm text-[#777]">
  Want a tool reviewed or have a question?{" "}
  <Link href="/contact-us" className="font-semibold text-[#E8505B] underline">
    Contact us →
  </Link>
</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
          <Link
            href="/best-ai-writing-tools"
            className="rounded-xl bg-[#E8505B] px-8 py-4 text-center text-[15px] font-bold text-white shadow-md transition hover:bg-[#c93842] hover:shadow-lg"
          >
            🏆 Best AI Writing Tools
          </Link>
          <Link
            href="/chatgpt-vs-claude"
            className="rounded-xl border-2 border-[#E8505B] bg-white px-8 py-4 text-center text-[15px] font-bold text-[#E8505B] shadow-md transition hover:bg-[#FDF0F1] hover:shadow-lg"
          >
            ⚔️ ChatGPT vs Claude
          </Link>
        </div>
      </div>
    </section>
  );
}
