import Link from "next/link";

const categoryLinks = [
  { name: "Reviews", slug: "reviews" },
  { name: "Comparisons", slug: "comparisons" },
  { name: "Best Of", slug: "best-of" },
  { name: "Guides", slug: "guides" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2d2d3a] py-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-[2fr_0.7fr_0.7fr]">
        <div>
          <Link href="/">
            <img src="/images/logo.png" alt="DailyCraveHive" className="h-16 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/80">
            Honest reviews, comparisons and rankings of creator and adult platforms —
            real fees, verified payouts and scam checks, curated by real humans, not bots.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://x.com/DailyCraveHive"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X (Twitter)"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#E8505B]"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
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
              <Link href="/affiliate-disclosure" className="text-[13px] text-white hover:text-[#E8505B] transition">
                Affiliate Disclosure
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="text-[13px] text-white hover:text-[#E8505B] transition">
                Disclaimer
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

      {/* 18+ + affiliate + informational disclaimer */}
      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-white/10 px-6 pt-6">
        <p className="mx-auto max-w-3xl text-center text-[12px] leading-relaxed text-white/45">
          <strong className="text-white/70">18+ Only.</strong> This website contains
          information about adult-oriented and creator platforms and is intended solely
          for individuals aged 18 or older. DailyCraveHive does not host, produce, or
          sell adult content. Our articles may contain affiliate links, and we may earn a
          commission at no extra cost to you — this never influences our reviews. All
          content is for informational purposes only and is not legal or financial
          advice; always verify current details on the official platform before making
          any decision.
        </p>
      </div>

      <div className="mx-auto mt-6 w-full max-w-6xl px-6 text-center text-sm text-white/50">
        © 2026 DailyCraveHive.com — All Rights Reserved
      </div>
    </footer>
  );
}