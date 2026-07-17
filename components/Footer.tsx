import Link from "next/link";

const categoryLinks = [
  { name: "AI Writing Tools", slug: "ai-writing-tools" },
  { name: "AI Image Tools", slug: "ai-image-tools" },
  { name: "AI Coding Tools", slug: "ai-coding-tools" },
  { name: "Comparisons", slug: "comparisons" },
  { name: "Best Of", slug: "best-of" },
  { name: "Lifestyle", slug: "lifestyle" },

];

export default function Footer() {
  return (
    <footer className="bg-[#2d2d3a] py-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-[2fr_0.7fr_0.7fr]">
        <div>
          <Link href="/">
            <img src="/images/logo.png" alt="DailyCraveHive" className="h-16 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/80">
            Your daily dose of the hottest AI tools. Honest reviews, viral
            picks, and trending tools — curated by real humans, not bots.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold text-[#E8505B]">
            Company
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/about-us" className="text-[13px] text-white hover:text-[#E8505B] transition">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="text-[13px] text-white hover:text-[#E8505B] transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-[13px] text-white hover:text-[#E8505B] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/affiliate-disclosure"
                className="text-[13px] text-white hover:text-[#E8505B] transition"
              >
                Affiliate Disclosure
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold text-[#E8505B]">
            Categories
          </h3>
          <ul className="space-y-3">
            {categoryLinks.map((link) => (
              <li key={link.slug}>
                <Link href={`/category/${link.slug}`} className="text-[13px] text-white hover:text-[#E8505B] transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-white/10 pt-8 text-center text-sm text-white/50">
        © 2026 DailyCraveHive.com — All Rights Reserved
      </div>
    </footer>
  );
}