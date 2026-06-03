import CategoryCards from "@/components/CategoryCards";
import Hero from "@/components/Hero";
import LatestReviews from "@/components/LatestReviews";
import Newsletter from "@/components/Newsletter";
import TrendingTools from "@/components/TrendingTools";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <div className="mx-auto my-0 max-w-6xl border-t-2 border-[#E8505B]" />
      <TrendingTools />
      <div className="mx-auto my-0 max-w-6xl border-t-2 border-[#E8505B]" />
      <LatestReviews />
      <div className="mx-auto my-0 max-w-6xl border-t-2 border-[#E8505B]" />
      <CategoryCards />
      <Newsletter />
    </div>
  );
}
