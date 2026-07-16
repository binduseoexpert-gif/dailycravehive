"use client";

// app/admin/posts/edit/[slug]/page.tsx
// Edit an existing post: loads it from GitHub, lets you change fields + body, saves back.

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [keywords, setKeywords] = useState("");
  const [featured, setFeatured] = useState(false);
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<
    { type: "idle" } | { type: "loading" } | { type: "success" } | { type: "error"; message: string }
  >({ type: "idle" });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/posts/${slug}`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load post");
        const fm = data.frontmatter || {};
        setTitle(fm.title || "");
        setCategory(fm.category || "");
        setExcerpt(fm.excerpt || "");
        setThumbnail(fm.thumbnail || "");
        setKeywords(Array.isArray(fm.keywords) ? fm.keywords.join("\n") : "");
        setFeatured(Boolean(fm.featured));
        setDate(fm.date || "");
        setBody(data.body || "");
        setLoaded(true);
      } catch (err: unknown) {
        setStatus({ type: "error", message: err instanceof Error ? err.message : "Could not load post" });
      }
    }
    load();
  }, [slug]);

  async function handleSave() {
    if (!title || !excerpt || !body || !password) {
      setStatus({ type: "error", message: "Title, excerpt, body and password are required." });
      return;
    }
    setStatus({ type: "loading" });
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          excerpt,
          thumbnail,
          keywords: keywords
            .split("\n")
            .map((k) => k.trim())
            .filter(Boolean),
          featured,
          date,
          body,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setStatus({ type: "success" });
    } catch (err: unknown) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Save failed" });
    }
  }

  const input =
    "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200";
  const label = "mb-1 block text-sm font-medium text-neutral-700";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">✏️ Edit Post</h1>
          <p className="text-sm text-neutral-500">/{slug} — changes go live after deploy (~1–2 min).</p>
        </div>
        <Link
          href="/admin/posts"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          ← All posts
        </Link>
      </div>

      {!loaded && status.type !== "error" && <p className="text-sm text-neutral-500">Loading post…</p>}

      {loaded && (
        <div className="space-y-5">
          <div>
            <label className={label}>Title</label>
            <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={label}>Category</label>
              <input className={input} value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
              <label className={label}>Thumbnail path</label>
              <input
                className={input}
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder={`/images/${slug}.png`}
              />
            </div>
          </div>

          <div>
            <label className={label}>Excerpt / meta description</label>
            <textarea className={input} rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            <p className="mt-1 text-xs text-neutral-400">{excerpt.length} characters</p>
          </div>

          <div>
            <label className={label}>Keywords (one per line)</label>
            <textarea className={input} rows={3} value={keywords} onChange={(e) => setKeywords(e.target.value)} />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
              />
              Featured post
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              Date
              <input
                className={`${input} w-40`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="YYYY-MM-DD"
              />
            </label>
          </div>

          <div>
            <label className={label}>Body (Markdown / MDX)</label>
            <textarea
              className={`${input} font-mono text-xs leading-relaxed`}
              rows={24}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <p className="mt-1 text-xs text-neutral-400">
              {body.trim() ? `${body.trim().split(/\s+/).length} words` : "0 words"}
            </p>
          </div>

          <div>
            <label className={label}>Admin password</label>
            <input
              className={input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={status.type === "loading"}
            className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.type === "loading" ? "Saving…" : "Save changes"}
          </button>

          {status.type === "success" && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              Saved! Changes will be live after the deploy finishes:{" "}
              <a className="font-medium underline" href={`/${slug}`} target="_blank" rel="noreferrer">
                /{slug}
              </a>
            </div>
          )}
          {status.type === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {status.message}
            </div>
          )}
        </div>
      )}

      {!loaded && status.type === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{status.message}</div>
      )}
    </main>
  );
}