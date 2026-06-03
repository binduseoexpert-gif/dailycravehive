import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

const categoryNames: Record<string, string> = {
  "ai-writing-tools": "AI Writing Tools",
  "ai-image-tools": "AI Image Tools",
  "ai-video-tools": "AI Video Tools",
  "ai-coding-tools": "AI Coding Tools",
  comparisons: "Comparisons",
  "best-of": "Best Of",
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = categoryNames[slug] || slug;
  return {
    title: name + " - Daily Crave Hive",
    description: "Browse all " + name + " articles on Daily Crave Hive.",
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  const categoryName = categoryNames[slug] || slug;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-200 via-pink-300 to-pink-100 py-12">
        <h1 className="text-center text-3xl font-bold text-[#1a1a2e]">
          {categoryName}
        </h1>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            No posts found in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={"/" + post.slug} className="group">
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition hover:shadow-lg">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-r from-pink-200 to-pink-300">
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute bottom-3 left-3 rounded bg-[#E8505B] px-2 py-0.5 text-xs font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <h2 className="mb-2 text-lg font-semibold text-[#1a1a2e] group-hover:text-[#E8505B]">
                      {post.title}
                    </h2>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#E8505B]">
                        {"Read Review →"}
                      </span>
                      <span className="text-gray-400">{post.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}