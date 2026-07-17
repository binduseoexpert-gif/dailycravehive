import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function LatestReviews() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <section className="bg-white py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-[#1a1a2e]">Latest Reviews & Guides</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition hover:shadow-lg"
            >
              <div className="relative aspect-video">
                {post.thumbnail ? (
                  <Link href={`/${post.slug}`}>
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-purple-600 to-blue-600" />
                )}
                <span className="absolute bottom-0 left-3 translate-y-1/2 rounded bg-[#E8505B] px-2 py-0.5 text-xs font-semibold uppercase text-white">
                  {post.category}
                </span>
              </div>
              <div className="space-y-3 p-5 pt-7">
                <Link href={`/${post.slug}`}>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] hover:text-[#E8505B] transition">
                    {post.title}
                  </h3>
                </Link>
                <p className="line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <Link href={`/${post.slug}`} className="text-sm text-[#E8505B] hover:text-[#d9434d]">
                    Read Review →
                  </Link>
                  <time className="text-sm text-gray-400">{post.date}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}