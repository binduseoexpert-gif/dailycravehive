import type { Metadata } from "next";
import SearchResults from "@/components/SearchResults";
import { getSearchIndex } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Search — DailyCraveHive",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchResults posts={getSearchIndex()} />;
}
