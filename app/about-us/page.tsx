import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      {/* Hero — same gradient as homepage */}
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E8505B] bg-white/80 px-4 py-1 text-xs font-semibold tracking-wide text-[#E8505B]">
            🐝 ABOUT US
          </span>
          <h1 className="mt-5 text-3xl font-bold text-[#1a1a2e] md:text-4xl">
            About Daily Crave Hive
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#1a1a2e]/70">
            Honest, hands-on reviews of AI tools, apps, websites and platforms —
            tested by real humans, never ranked by payment.
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
              Daily Crave Hive started with a simple frustration: every time we
              searched for an honest tool recommendation, we&apos;d land on a
              page that was either stuffed with affiliate links disguised as
              reviews, or written by someone who clearly hadn&apos;t spent five
              minutes actually using the product. We got tired of wasting money
              on tools that looked impressive in screenshots but fell apart
              during real work.
            </p>
            <p>So we built the site we wished existed.</p>
            <p>
              Daily Crave Hive is an independent review platform run by editor{" "}
              <strong>Alma Martin</strong>, who genuinely uses these tools every
              day. We test AI writing assistants, image generators, apps, earning
              platforms and trending websites — then tell you exactly what we
              found, without sugarcoating it.
            </p>
            <p>
            <p>
              We&apos;re independent, and our rankings can&apos;t be bought — no
              company can pay to score higher or land the top spot. When we
              recommend something, it&apos;s because we actually liked using it —
              and when something disappoints, we say that too. Any sponsored or
              featured content is always clearly labelled as such.
            </p>
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
              Every week, we pick up tools, apps and platforms that people are
              actually talking about — the ones trending on Reddit, blowing up on
              Twitter, or quietly gaining traction in niche communities. We sign
              up and run each one through a consistent set of real-world tests.
            </p>
            <p>
              For AI writing tools, that means generating blog posts, ad copy,
              emails, and product descriptions using identical prompts across
              every platform. For image tools, we compare output quality, style
              control, and speed. For apps, websites and earning platforms, we
              dig into real pricing, fees, safety, and whether they actually
              deliver what they promise.
            </p>
            <p>
              Once testing is done, we score each one across five areas: output
              quality, ease of use, features, pricing value, and how well it fits
              the people it&apos;s designed for. Those scores feed into our final
              rating, and the full breakdown goes into every review we publish.
            </p>
            <p>
              We also produce head-to-head comparison guides for tools that get
              frequently confused with each other — like Rytr vs Writesonic,
              ChatGPT vs Claude, Frase vs Surfer SEO — because sometimes the best
              way to choose is to see two options side by side.
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
            DailyCraveHive different:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                t: "We actually use what we review.",
                d: "Every tool gets real hands-on testing before we write a single word. We don't copy feature lists from pricing pages and call it a review.",
              },
              {
                t: "Rankings can't be bought.",
                d: "If something ranks high on our list, it earned that spot through performance — not payment. Any sponsored or featured content is always clearly labelled.",
              },
              {
                t: "We update regularly.",
                d: "Tools change fast. A tool that was great six months ago might have doubled its price. We revisit articles and update pricing, features and scores.",
              },
              {
                t: "We write for real people.",
                d: "Our readers are freelancers, small business owners, students and creators — not researchers. Simple language, actionable advice, honest opinions.",
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
              Daily Crave Hive is organised around what you&apos;re trying to do,
              not just what topic a tool falls under:
            </p>
            <p>
              <strong>Reviews</strong> — Hands-on, single-product reviews of AI
              tools, apps, websites and earning platforms like Jasper, Feetify,
              FeetFinder and more — real testing, real fees, honest verdicts.
            </p>
            <p>
              <strong>Comparisons</strong> — Detailed side-by-side breakdowns of
              tools people frequently confuse, tested with identical prompts —
              like ChatGPT vs Claude, Rytr vs Writesonic, Frase vs Surfer SEO.
            </p>
            <p>
              <strong>Best Of</strong> — Ranked roundups of the top tools, apps
              and platforms in each category, scored and updated as the market
              changes.
            </p>
            <p>
              <strong>Guides</strong> — Beginner-friendly explainers and how-tos:
              what a tool is, how it works, and how to actually use it.
            </p>
            <p>More categories are on the way as we expand our testing.</p>
          </div>
        </div>

        {/* Affiliate */}
        <div>
          <h2 className="mb-6 border-l-4 border-[#E8505B] pl-4 text-2xl font-bold text-[#1a1a2e]">
            A Note on Affiliate Links
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            <p>
              Some of our articles contain affiliate links. This means if you
              click a link and make a purchase, we may earn a small commission at
              no extra cost to you. This helps us keep the site running, pay for
              tool subscriptions, and continue producing free content.
            </p>
            <p>
              Important: affiliate partnerships never influence our ratings or
              recommendations. Our scores and rankings are decided before we ever
              look at whether a tool has an affiliate program. Editorial decisions
              are based entirely on testing and performance.
            </p>
          </div>
        </div>

        {/* Get in Touch — highlighted box like homepage's contact strip */}
        <div className="rounded-2xl bg-gradient-to-b from-pink-100 to-pink-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e]">Get in Touch</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-gray-700">
            Have a question? Want to suggest a tool for review? Found something we
            got wrong? We&apos;d love to hear from you — we typically reply within
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