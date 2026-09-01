// app/disclaimer/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer for DailyCraveHive — informational content only, affiliate disclosure, 18+ notice, and no legal or financial advice.",
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  const updated = "September 1, 2026";

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1a1a2e] md:text-4xl">Disclaimer</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {updated}</p>

        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-[#333]">
          <section>
            <h2 className="mb-2 text-xl font-bold text-[#1a1a2e]">18+ Adult Content Notice</h2>
            <p>
              This website contains information, reviews, and discussion relating to
              adult-oriented and creator platforms. It is intended solely for individuals
              who are at least 18 years old (or the age of majority in their jurisdiction,
              whichever is higher). If you are under this age, please leave this site.
              DailyCraveHive does not host, produce, or sell any adult content — we only
              review and compare third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-[#1a1a2e]">Informational Purposes Only</h2>
            <p>
              All content on DailyCraveHive is provided for general informational and
              educational purposes only. While we test platforms and verify details to the
              best of our ability, we make no guarantees about the accuracy, completeness,
              or timeliness of any information. Platform fees, features, payout terms, and
              policies change frequently — always confirm current details directly on the
              official platform before making any decision or payment.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-[#1a1a2e]">No Professional Advice</h2>
            <p>
              Nothing on this website constitutes legal, financial, tax, or professional
              advice. Earnings figures, income examples, and estimates are illustrative
              only and are not a promise or guarantee of results. Your actual results
              depend on many factors, including your own effort, audience, and market
              conditions. For advice specific to your situation, consult a qualified
              professional.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-[#1a1a2e]">Affiliate Disclosure</h2>
            <p>
              Some links on this site are affiliate links, which means we may earn a
              commission if you sign up or make a purchase through them — at no extra cost
              to you. This never influences our reviews, rankings, or opinions. We only
              recommend platforms we believe offer genuine value. For more detail, see our{" "}
              <Link href="/affiliate-disclosure" className="text-[#E8505B] underline">
                Affiliate Disclosure
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-[#1a1a2e]">Third-Party Platforms & Links</h2>
            <p>
              DailyCraveHive is not affiliated with, endorsed by, or officially connected
              to the platforms we review unless explicitly stated. We are not responsible
              for the content, practices, payments, safety, or policies of any third-party
              website or platform. Any transaction you make with a third-party platform is
              solely between you and that platform.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-[#1a1a2e]">Limitation of Liability</h2>
            <p>
              You use this website and act on its information entirely at your own risk.
              DailyCraveHive and its authors will not be liable for any loss or damage —
              financial or otherwise — arising from your use of this site, reliance on its
              content, or your dealings with any third-party platform.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-[#1a1a2e]">Contact</h2>
            <p>
              Questions about this disclaimer? Reach us through our{" "}
              <Link href="/contact-us" className="text-[#E8505B] underline">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}