"use client";

// app/admin/new-post/page.tsx
// Admin page: choose post type (Review / Best Of / Comparison), fill fields,
// load the matching body template, publish → commits .mdx to GitHub.

import { useState, type ChangeEvent } from "react";
import { REVIEW_TEMPLATE, BEST_OF_TEMPLATE, COMPARISON_TEMPLATE, BLOG_TEMPLATE } from "./templates";

type PostType = "review" | "best-of" | "comparison" | "blog";

const REVIEW_CATEGORIES = [
  "AI Writing Tools",
  "AI Image Tools",
  "AI Coding Tools",
  "AI Video Tools",
  "AI Marketing Tools",
  "Lifestyle",
];

const POST_TYPES: { id: PostType; label: string; hint: string }[] = [
  { id: "review", label: "🔍 Single Review", hint: "e.g. Jasper AI Review" },
  { id: "best-of", label: "🏆 Best Of List", hint: "e.g. Best AI Writing Tools" },
  { id: "comparison", label: "⚔️ Comparison", hint: "e.g. ChatGPT vs Claude" },
  { id: "blog", label: "📝 Lifestyle", hint: "dating, lifestyle, general topics" },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewPostPage() {
  const [postType, setPostType] = useState<PostType>("review");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState(REVIEW_CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [keywords, setKeywords] = useState("");
  const [featured, setFeatured] = useState(true);
  const [body, setBody] = useState("");
  const [password, setPassword] = useState("");
  // Template placeholders
  const [toolName, setToolName] = useState("");
  const [toolA, setToolA] = useState("");
  const [toolB, setToolB] = useState("");
  const [status, setStatus] = useState<
    { type: "idle" } | { type: "loading" } | { type: "success"; url: string } | { type: "error"; message: string }
  >({ type: "idle" });

  const [blogCategory, setBlogCategory] = useState("Lifestyle");
  // Featured image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const imageExt = imageFile ? imageFile.name.split(".").pop()?.toLowerCase() || "png" : "png";

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    if (f.size > 3 * 1024 * 1024) {
      setStatus({ type: "error", message: "Keep the image under 3MB — compress it at tinypng.com." });
      e.target.value = "";
      return;
    }
    setImageFile(f);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(f);
    setStatus({ type: "idle" });
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview("");
  }

  // Best Of → "Best Of"; Comparison → "Comparisons"; Blog → editable; Review → dropdown
  const effectiveCategory =
    postType === "best-of"
      ? "Best Of"
      : postType === "comparison"
      ? "Comparisons"
      : postType === "blog"
      ? blogCategory
      : category;

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  function loadTemplate() {
    if (body.trim() && !confirm("The body already has content — replace it with the template?")) return;
    let t = "";
    if (postType === "review") {
      t = REVIEW_TEMPLATE.replace(/\{\{TOOL\}\}/g, toolName || "[Tool Name]");
    } else if (postType === "best-of") {
      t = BEST_OF_TEMPLATE;
    } else if (postType === "blog") {
      t = BLOG_TEMPLATE;
    } else {
      t = COMPARISON_TEMPLATE.replace(/\{\{A\}\}/g, toolA || "[Tool A]").replace(/\{\{B\}\}/g, toolB || "[Tool B]");
    }
    setBody(t);
  }

  async function handleSubmit() {
    if (!title || !slug || !excerpt || !body || !password) {
      setStatus({ type: "error", message: "Title, slug, excerpt, body and password are required." });
      return;
    }
    setStatus({ type: "loading" });
    try {
      // Image file → base64 (agar select ki hai)
      let imageData: string | null = null;
      let imageName: string | null = null;
      if (imageFile) {
        imageData = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve((r.result as string).split(",")[1]);
          r.onerror = () => reject(new Error("Could not read the image file"));
          r.readAsDataURL(imageFile);
        });
        imageName = `${slug}.${imageExt}`;
      }

      const res = await fetch("/api/admin/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category: effectiveCategory,
          excerpt,
          thumbnail: imageName ? `/images/${imageName}` : thumbnail,
          imageData,
          imageName,
          keywords: keywords
            .split("\n")
            .map((k) => k.trim())
            .filter(Boolean),
          featured,
          body,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus({ type: "success", url: data.url });
    } catch (err: unknown) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }

  const input =
    "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200";
  const label = "mb-1 block text-sm font-medium text-neutral-700";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 text-2xl font-bold text-neutral-900">🐝 Add New Post</h1>
      <p className="mb-8 text-sm text-neutral-500">
        Publishing commits the post to your repo and Vercel auto-redeploys it (~1–2 min).
      </p>

      <div className="space-y-5">
        {/* Post type selector */}
        <div>
          <label className={label}>Post type</label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {POST_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setPostType(t.id)}
                className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                  postType === t.id
                    ? "border-amber-500 bg-amber-50 font-semibold text-amber-800"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"
                }`}
              >
                <div>{t.label}</div>
                <div className="text-xs font-normal text-neutral-400">{t.hint}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={label}>Title</label>
          <input
            className={input}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder={
              postType === "review"
                ? "e.g. Notion AI Review 2026: Worth It or Overhyped? (Tested)"
                : postType === "best-of"
                ? "e.g. Best AI Video Tools in 2026 – Tested & Ranked"
                : postType === "comparison"
                ? "e.g. Midjourney vs DALL-E (2026): We Tested Both — Here's the Winner"
                : "e.g. How to Use AI to Plan Your Content Calendar in 2026"
            }
          />
        </div>

        <div>
          <label className={label}>URL slug</label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-sm text-neutral-400">dailycravehive.com/</span>
            <input
              className={input}
              value={slug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(slugify(e.target.value));
              }}
              placeholder="notion-ai-review"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Category</label>
            {postType === "review" ? (
              <select className={input} value={category} onChange={(e) => setCategory(e.target.value)}>
                {REVIEW_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : postType === "blog" ? (
              <input
                className={input}
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                placeholder='e.g. "Lifestyle", "News", "Guides"'
              />
            ) : (
              <input className={`${input} bg-neutral-100`} value={effectiveCategory} disabled />
            )}
          </div>
          <div>
            <label className={label}>Featured image</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageSelect}
              className="block w-full text-sm text-neutral-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-amber-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-amber-800 hover:file:bg-amber-200"
            />
            {imagePreview ? (
              <div className="mt-2 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="preview"
                  className="h-12 w-20 rounded border border-neutral-200 object-cover"
                />
                <span className="text-xs text-neutral-500">
                  /images/{slug || "slug"}.{imageExt} (auto)
                </span>
                <button type="button" onClick={clearImage} className="text-xs text-red-600 underline">
                  Delete
                </button>
              </div>
            ) : (
              <input
                className={`${input} mt-2`}
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder={`or manual path: /images/${slug || "post-slug"}.png`}
              />
            )}
          </div>
        </div>

        <div>
          <label className={label}>Excerpt / meta description</label>
          <textarea
            className={input}
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="150–160 characters, for SEO"
          />
          <p className="mt-1 text-xs text-neutral-400">{excerpt.length} characters</p>
        </div>

        <div>
          <label className={label}>Keywords (optional — one per line)</label>
          <textarea
            className={input}
            rows={3}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={"best AI video tools\nAI video tools 2026\nbest AI video generator"}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
          />
          Featured post
        </label>

        {/* Template helper */}
        <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-4">
          <p className="mb-3 text-sm font-medium text-neutral-700">
            📋 Template loader — loads the full {POST_TYPES.find((t) => t.id === postType)?.label} skeleton into the body
          </p>
          <div className="flex flex-wrap items-end gap-3">
            {postType === "review" && (
              <div className="grow">
                <label className={label}>Tool name</label>
                <input
                  className={input}
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="e.g. Notion AI"
                />
              </div>
            )}
            {postType === "comparison" && (
              <>
                <div className="grow">
                  <label className={label}>Tool A</label>
                  <input className={input} value={toolA} onChange={(e) => setToolA(e.target.value)} placeholder="e.g. Midjourney" />
                </div>
                <div className="grow">
                  <label className={label}>Tool B</label>
                  <input className={input} value={toolB} onChange={(e) => setToolB(e.target.value)} placeholder="e.g. DALL-E" />
                </div>
              </>
            )}
            <button
              type="button"
              onClick={loadTemplate}
              className="rounded-lg border border-amber-400 bg-white px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
            >
              Load template
            </button>
          </div>
        </div>

        <div>
          <label className={label}>Body (Markdown / MDX)</label>
          <textarea
            className={`${input} font-mono text-xs leading-relaxed`}
            rows={24}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Load a template or write markdown directly…"
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
          onClick={handleSubmit}
          disabled={status.type === "loading"}
          className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.type === "loading" ? "Publishing…" : "Publish post"}
        </button>

        {status.type === "success" && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Post committed! It will be live after the deploy finishes:{" "}
            <a className="font-medium underline" href={status.url} target="_blank" rel="noreferrer">
              {status.url}
            </a>
          </div>
        )}
        {status.type === "error" && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {status.message}
          </div>
        )}
      </div>
    </main>
  );
}