import Link from "next/link";

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <h1 className="text-center text-3xl font-bold text-[#1a1a2e]">
          Affiliate Disclosure
        </h1>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          <p>
            At Daily Crave Hive, transparency is one of our core values. We want
            you to know exactly how we make money and how it does (and
            doesn&apos;t) influence our content.
          </p>

          {/* How We Earn Revenue */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#1a1a2e]">
              How We Earn Revenue
            </h2>
            <div className="space-y-4">
              <p>
                Daily Crave Hive is a free resource. We don&apos;t charge
                readers to access our reviews, comparisons, or guides. To keep
                the site running, cover tool subscription costs, and continue
                producing honest content, we earn revenue through affiliate
                partnerships.
              </p>
              <p>
                <strong>What this means in practice:</strong> Some of the links
                in our articles are affiliate links. When you click on one of
                these links and make a purchase or sign up for a service, we may
                receive a small commission from the company at no additional cost
                to you. The price you pay remains exactly the same whether you
                use our link or go directly to the website.
              </p>
            </div>
          </div>

          {/* Our Editorial Independence */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#1a1a2e]">
              Our Editorial Independence
            </h2>
            <p className="mb-3">
              This is the part that matters most:{" "}
              <strong>
                affiliate partnerships never influence our ratings, rankings, or
                recommendations.
              </strong>
            </p>
            <p className="mb-3">
              {"Here's how we ensure editorial independence:"}
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Testing comes first.</strong> We evaluate every tool
                through our standard testing process before even checking if an
                affiliate programme exists.
              </li>
              <li>
                <strong>Scores are based on performance.</strong> Our ratings
                reflect actual testing results across output quality, ease of
                use, features, pricing value, and support.
              </li>
              <li>
                <strong>
                  We recommend tools without affiliate programmes too.
                </strong>{" "}
                If a tool performs well in testing, we&apos;ll recommend it
                regardless of whether we earn anything from it.
              </li>
              <li>
                <strong>We give honest negative reviews.</strong> If a tool with
                a generous affiliate programme performs poorly, we say so.
                Revenue never outweighs honesty.
              </li>
            </ul>
          </div>

          {/* Why This Model Works */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#1a1a2e]">
              Why This Model Works
            </h2>
            <p>
              The affiliate model allows us to remain independent while keeping
              our content free. We don&apos;t rely on tool companies to fund our
              reviews, and we don&apos;t accept payment for favourable coverage.
              This means our recommendations are based purely on what we&apos;ve
              experienced during testing.
            </p>
          </div>

          {/* Your Trust Matters */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-[#1a1a2e]">
              Your Trust Matters
            </h2>
            <p>
              We understand that trust is earned, not assumed. If you ever feel
              that a review seems biased or doesn&apos;t match your experience
              with a tool, we genuinely want to hear about it. Reach out through
              our{" "}
              <Link href="/contact-us" className="text-[#E8505B] hover:underline">Contact page</Link>
              {" "}and we&apos;ll look into it.
            </p>
            <p className="mt-4">
              Thank you for supporting DailyCraveHive by using our links. It
              directly helps us continue testing tools and publishing free,
              honest reviews.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}