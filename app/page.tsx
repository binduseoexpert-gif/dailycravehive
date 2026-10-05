import CategoryCards from "@/components/CategoryCards";
import Hero from "@/components/Hero";
import LatestReviews from "@/components/LatestReviews";
import Newsletter from "@/components/Newsletter";
import TrendingTools from "@/components/TrendingTools";
import ToolFinderQuiz from "@/components/ToolFinderQuiz";
import LegitChecker, { type CheckedPlatform } from "@/components/LegitChecker";
import HowWeTest from "@/components/HowWeTest";
import HomepageFAQ from "@/components/HomepageFAQ";
import { getAllPosts } from "@/lib/posts";
import FeaturedPosts from "@/components/FeaturedPosts";

const DIVIDER = <div className="mx-auto my-0 max-w-6xl border-t-2 border-[#E8505B]" />;

// Extract the platform/tool name from a review post title.
// "FeetFinder Review 2026: ..." -> "FeetFinder"
function toolNameFromTitle(title: string): string {
  return title.split(/\s+Review\b/i)[0].trim();
}

// Homepage Popular checks: promote these first; demote Fun With Feet.
const POPULAR_CHECK_PRIORITY = [
  "feetfinder-review",
  "fanvue-review",
  "loyalfans-review",
  "feetify-review",
  "smutfinder-review",
];
const POPULAR_CHECK_DEMOTE = new Set(["fun-with-feet-review"]);

export default function Home() {
  // Auto-build the legit-checker list from published review posts.
  // Whenever a new review is published, it appears here automatically.
  const allReviewed: CheckedPlatform[] = getAllPosts()
    .filter((p) => /\breview\b/i.test(p.title))
    .map((p) => ({
      name: toolNameFromTitle(p.title),
      slug: p.slug,
      blurb: "See our honest, hands-on breakdown before you sign up.",
    }));

  const bySlug = new Map(allReviewed.map((p) => [p.slug, p]));
  const prioritized = POPULAR_CHECK_PRIORITY.map((slug) => bySlug.get(slug)).filter(
    (p): p is CheckedPlatform => Boolean(p)
  );
  const rest = allReviewed.filter(
    (p) => !POPULAR_CHECK_PRIORITY.includes(p.slug) && !POPULAR_CHECK_DEMOTE.has(p.slug)
  );
  const demoted = allReviewed.filter((p) => POPULAR_CHECK_DEMOTE.has(p.slug));
  // Demoted platforms stay searchable but are pushed after promoted chips.
  const reviewedPlatforms: CheckedPlatform[] = [...prioritized, ...rest, ...demoted];

  return (
    <div className="bg-white">
      <Hero />
      {DIVIDER}
      <TrendingTools />
      {DIVIDER}
      {/* NEW: Trending/Featured posts */}
      <FeaturedPosts />
      {DIVIDER}

      {/* NEW: Tool Finder Quiz */}
      <ToolFinderQuiz />
      {DIVIDER}

      <LatestReviews />
      {DIVIDER}

      {/* NEW: Is It Legit? Checker (auto-populated from review posts) */}
      <LegitChecker platforms={reviewedPlatforms} />
      {DIVIDER}

      {/* NEW: How We Test (E-E-A-T) */}
      <HowWeTest />
      {DIVIDER}

      <CategoryCards />
      {DIVIDER}

      {/* NEW: Homepage FAQ (AEO) */}
      <HomepageFAQ />

      <Newsletter />
    </div>
  );
}
