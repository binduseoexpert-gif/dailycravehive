"use client";

// app/admin/posts/page.tsx
// Manage Posts dashboard: lists all posts with View / Edit / Delete actions.

import Link from "next/link";
import { useEffect, useState } from "react";

type PostRow = {
  slug: string;
  title: string;
  date: string;
  category: string;
  featured: boolean;
};

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts);
    } catch (err: unknown) {
      setMessage({ kind: "err", text: err instanceof Error ? err.message : "Failed to load posts" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(slug: string, title: string) {
    const password = prompt(`Delete "${title}"?\n\nThis removes the post from the site permanently.\nEnter admin password to confirm:`);
    if (!password) return;
    setDeleting(slug);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setMessage({ kind: "ok", text: `"${title}" deleted. It will disappear from the site after the deploy finishes (~1-2 min).` });
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err: unknown) {
      setMessage({ kind: "err", text: err instanceof Error ? err.message : "Delete failed" });
    } finally {
      setDeleting(null);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">🐝 Manage Posts</h1>
          <p className="text-sm text-neutral-500">{posts.length} posts — edits and deletes go live after deploy (~1–2 min).</p>
        </div>
        <Link
          href="/admin/new-post"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          + New post
        </Link>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            message.kind === "ok"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-neutral-500">Loading posts…</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-neutral-500">No posts found.</p>
      ) : (
        <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
          {posts.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <div className="min-w-0 grow">
                <p className="truncate text-sm font-medium text-neutral-900">
                  {p.title}
                  {p.featured && (
                    <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                      FEATURED
                    </span>
                  )}
                </p>
                <p className="text-xs text-neutral-400">
                  /{p.slug} · {p.category || "no category"} · {p.date || "no date"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  View
                </a>
                <Link
                  href={`/admin/posts/edit/${p.slug}`}
                  className="rounded-md border border-amber-400 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 transition hover:bg-amber-100"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(p.slug, p.title)}
                  disabled={deleting === p.slug}
                  className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                >
                  {deleting === p.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}