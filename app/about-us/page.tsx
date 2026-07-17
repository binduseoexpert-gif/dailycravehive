import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">About Daily Crave Hive</h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#555]">
            Honest, hands-on AI tool reviews — tested by real humans, never
            ranked by payment.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl space-y-12 px-4 py-12">
        <div>
          <h2 className="mb-6 w-full bg-[#E8505B] px-4 py-2 text-lg font-semibold text-white">
            Who We Are
          </h2>
          <div className="space-y-4 text-justify text-base leading-relaxed text-gray-700">
            <p>
              Daily Crave Hive started with a simple frustration: every time we
              searched for an honest AI tool recommendation, we&apos;d land on a
              page that was either stuffed with affiliate links disguised as
              reviews, or written by someone who clearly hadn&apos;t spent five
              minutes actually using the product. We got tired of wasting money
              on tools that looked impressive in screenshots but fell apart during
              real work.
            </p>
            <p>So we built the site we wished existed.</p>
            <p>
              Daily Crave Hive is an independent AI tools review platform run by
              a small team of writers, marketers, and tech enthusiasts who
              genuinely use these tools every day. We test AI writing assistants,
              image generators, and trending platforms — then tell you exactly
              what we found, without sugarcoating it.
            </p>
            <p>
              We&apos;re not backed by any AI company. We don&apos;t accept paid
              placements in our reviews. When we recommend something, it&apos;s
              because we actually liked using it — and when something disappoints,
              we say that too.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-6 w-full bg-[#E8505B] px-4 py-2 text-lg font-semibold text-white">
            What We Do
          </h2>
          <div className="space-y-4 text-justify text-base leading-relaxed text-gray-700">
            <p>
              Every week, our team picks up AI tools that people are actually
              talking about — the ones trending on Reddit, blowing up on Twitter,
              or quietly gaining traction in niche communities. We sign up, pay
              for the plans ourselves, and run each tool through a consistent set
              of real-world tests.
            </p>
            <p>
              For AI writing tools, that means generating blog posts, ad copy,
              emails, and product descriptions using identical prompts across
              every platform. For image tools, we compare output quality, style
              control, and speed. For niche platforms, we dig into real pricing,
              fees, safety, and whether they deliver what they promise.
            </p>
            <p>
              Once testing is done, we score each tool across five areas: output
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

        <div>
          <h2 className="mb-6 w-full bg-[#E8505B] px-4 py-2 text-lg font-semibold text-white">
            Why Trust Us?
          </h2>
          <div className="space-y-4 text-justify text-base leading-relaxed text-gray-700">
            <p>
              There are hundreds of AI review sites out there. Here&apos;s what
              makes DailyCraveHive different:
            </p>
            <p>
              ✅ <strong>We actually use what we review.</strong> Every tool gets
              real hands-on testing before we write a single word about it. We
              don&apos;t copy feature lists from pricing pages and call it a
              review.
            </p>
            <p>
              ✅ <strong>No paid rankings.</strong> Our reviews are never
              influenced by sponsorships or partnerships. If a tool ranks high on
              our list, it earned that spot through performance — not payment.
            </p>
            <p>
              ✅ <strong>We update regularly.</strong> AI tools change fast. A
              tool that was great six months ago might have doubled its price or
              gutted its free plan. We revisit our articles and update pricing,
              features, and scores as things evolve.
            </p>
            <p>
              ✅ <strong>We write for real people.</strong> Our readers include
              freelancers, small business owners, students, content creators, and
              marketing teams — not AI researchers. We keep our language simple,
              our advice actionable, and our opinions honest.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-6 w-full bg-[#E8505B] px-4 py-2 text-lg font-semibold text-white">
            What We Cover
          </h2>
          <div className="space-y-4 text-justify text-base leading-relaxed text-gray-700">
            <p>Daily Crave Hive currently focuses on five main areas:</p>
            <p>
              <strong>AI Writing Tools</strong> — Content generators, copywriting
              assistants, and editing tools like Jasper, ChatGPT, Claude,
              Writesonic, Rytr, and more.
            </p>
            <p>
              <strong>AI Image Tools</strong> — Image generators, editors, and
              enhancement tools including Midjourney, DALL-E, FLUX, and others.
            </p>
            <p>
              <strong>Head-to-Head Comparisons</strong> — Detailed side-by-side
              breakdowns of tools people frequently confuse, tested with
              identical prompts.
            </p>
            <p>
              <strong>Best Of Guides</strong> — Ranked roundups of the top tools
            in each category, scored and updated as the market changes.
            </p>
            <p>
              <strong>Lifestyle</strong> — Honest reviews of trending platforms,
              apps, and online marketplaces beyond the usual AI toolbox — with
              the same focus on real fees, safety, and whether they&apos;re
              actually worth your time.
            </p>
            <p>
              More categories — including AI video and AI coding tools — are on
              the way as we expand our testing.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-6 w-full bg-[#E8505B] px-4 py-2 text-lg font-semibold text-white">
            A Note on Affiliate Links
          </h2>
          <div className="space-y-4 text-justify text-base leading-relaxed text-gray-700">
            <p>
              Some of our articles contain affiliate links. This means if you
              click a link and make a purchase, we may earn a small commission at
              no extra cost to you. This helps us keep the site running, pay for
              tool subscriptions, and continue producing free content.
            </p>
            <p>
              Important: affiliate partnerships never influence our ratings or
              recommendations. We&apos;ve given low scores to tools with generous
              affiliate programs, and high scores to tools with no affiliate
              program at all. Our editorial decisions are based entirely on
              testing and performance.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-6 w-full bg-[#E8505B] px-4 py-2 text-lg font-semibold text-white">
            Get in Touch
          </h2>
          <div className="space-y-4 text-justify text-base leading-relaxed text-gray-700">
            <p>
              Have a question? Want to suggest a tool for review? Interested in
              pitching a guest post? Found something we got wrong?
            </p>
            <p>
              We&apos;d love to hear from you — we typically reply within 24–48
              hours.
            </p>
            <p className="text-center md:text-left">
              <Link
                href="/contact-us"
                className="inline-block rounded-lg bg-[#E8505B] px-8 py-3 font-semibold text-white transition hover:bg-[#d4454e]"
              >
                Contact Us →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}