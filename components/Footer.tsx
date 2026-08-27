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
            Honest reviews, comparisons and rankings of AI tools, apps and
            websites — curated by real humans, not bots.
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

            <a
              href="https://www.reddit.com/user/dailycravehive/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Reddit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#E8505B]"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .462c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
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
      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-white/10 pt-6 text-center text-sm text-white/50">
        © 2026 DailyCraveHive.com — All Rights Reserved
      </div>
    </footer>
  );
}