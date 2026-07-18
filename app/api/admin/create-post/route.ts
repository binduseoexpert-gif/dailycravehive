// app/api/admin/create-post/route.ts

import { NextResponse } from "next/server";
import { commitImages, type ImagePayload } from "@/lib/github-images";

export const runtime = "nodejs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const POSTS_DIR = process.env.POSTS_DIR || "content/posts";
const POSTS_EXT = process.env.POSTS_EXT || "mdx";
const SITE_URL = process.env.SITE_URL || "https://www.dailycravehive.com";
const ADMIN_SECRET = process.env.ADMIN_SECRET!;

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
const yamlStr = (s: string) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

export async function POST(req: Request) {
  try {
    const { title, slug, category, excerpt, thumbnail, keywords, featured, body, password, imageData, imageName, inlineImages } =
      await req.json();

    if (!ADMIN_SECRET || password !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }
    if (!title || !slug || !excerpt || !body) {
      return NextResponse.json({ error: "Title, slug, excerpt and body are required." }, { status: 400 });
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Slug can only contain lowercase letters, numbers and hyphens." }, { status: 400 });
    }

    // --- commit all images (featured + inline) ---
    const allImages: ImagePayload[] = [];
    if (imageData && imageName) allImages.push({ name: imageName, data: imageData });
    if (Array.isArray(inlineImages)) {
      for (const img of inlineImages) {
        if (img.name && img.data) allImages.push({ name: img.name, data: img.data });
      }
    }
    if (allImages.length > 0) {
      const imgResult = await commitImages(allImages);
      if (!imgResult.ok) {
        return NextResponse.json({ error: imgResult.error }, { status: 500 });
      }
    }

    const date = new Date().toISOString().split("T")[0];
    const lines: string[] = [
      "---",
      `title: ${yamlStr(title)}`,
      `category: ${yamlStr(category || "")}`,
      `categorySlug: ${yamlStr(slugify(category || ""))}`,
      `date: ${yamlStr(date)}`,
      `excerpt: ${yamlStr(excerpt)}`,
      `thumbnail: ${yamlStr(thumbnail || `/images/${slug}.png`)}`,
      `featured: ${featured ? "true" : "false"}`,
    ];
    if (Array.isArray(keywords) && keywords.length > 0) {
      lines.push("keywords:");
      for (const k of keywords) lines.push(`  - ${k}`);
    }
    lines.push("---");
    const fileContent = `${lines.join("\n")}\n\n${body}\n`;
    const filePath = `${POSTS_DIR}/${slug}.${POSTS_EXT}`;

    // --- duplicate check ---
    const checkRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" }, cache: "no-store" }
    );
    if (checkRes.ok) {
      return NextResponse.json({ error: `A post with the slug "${slug}" already exists. Use a different slug.` }, { status: 409 });
    }

    // --- commit post ---
    const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `post: add "${title}"`,
        content: Buffer.from(fileContent, "utf-8").toString("base64"),
        branch: GITHUB_BRANCH,
      }),
    });
    if (!commitRes.ok) {
      const err = await commitRes.json().catch(() => ({}));
      return NextResponse.json({ error: `GitHub commit failed: ${err.message || commitRes.statusText}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: `${SITE_URL}/${slug}` });
  } catch {
    return NextResponse.json({ error: "Server error. Check your environment variables." }, { status: 500 });
  }
}