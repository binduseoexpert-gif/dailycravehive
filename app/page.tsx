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

const DIVIDER = <div className="mx-auto my-0 max-w-6xl border-t-2 border-[#E8505B]" />;

// Extract the platform/tool name from a review post title.
// "FeetFinder Review 2026: ..." -> "FeetFinder"
// "Fun With Feet Review 2026: ..." -> "Fun With Feet"
function toolNameFromTitle(title: string): string {
  return title.split(/\s+Review\b/i)[0].trim();
}

export default function Home() {
  // Auto-build the legit-checker list from published review posts.
  // Whenever a new review is published, it appears here automatically.
  const reviewedPlatforms: CheckedPlatform[] = getAllPosts()
    .filter((p) => /\breview\b/i.test(p.title))
    .map((p) => ({
      name: toolNameFromTitle(p.title),
      slug: p.slug,
      blurb: "See our honest, hands-on breakdown before you sign up.",
    }));

  return (
    <div className="bg-white">
      <Hero />
      {DIVIDER}
      <TrendingTools />
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