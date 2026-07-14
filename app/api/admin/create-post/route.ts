// app/api/admin/create-post/route.ts
// Commits a new .mdx post to GitHub with DailyCraveHive's exact frontmatter:
// title, category, categorySlug, date, excerpt, thumbnail, featured, keywords

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!; // fine-grained PAT with "Contents: Read & write"
const GITHUB_REPO = process.env.GITHUB_REPO!; // e.g. "yourusername/dailycravehive"
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const POSTS_DIR = process.env.POSTS_DIR || "content/posts"; // apne repo ke posts folder ka path
const POSTS_EXT = process.env.POSTS_EXT || "mdx"; // "mdx" ya "md" — jo aapki files me hai
const SITE_URL = process.env.SITE_URL || "https://www.dailycravehive.com";
const ADMIN_SECRET = process.env.ADMIN_SECRET!;

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const yamlStr = (s: string) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

export async function POST(req: Request) {
  try {
    const { title, slug, category, excerpt, thumbnail, keywords, featured, body, password } = await req.json();

    // --- auth ---
    if (!ADMIN_SECRET || password !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Galat password." }, { status: 401 });
    }

    // --- validation ---
    if (!title || !slug || !excerpt || !body) {
      return NextResponse.json({ error: "Title, slug, excerpt aur body required hain." }, { status: 400 });
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug me sirf lowercase letters, numbers aur hyphens allowed hain." },
        { status: 400 }
      );
    }

    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // --- frontmatter (existing posts ke exact format me) ---
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

    // --- duplicate slug check ---
    const checkRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );
    if (checkRes.ok) {
      return NextResponse.json(
        { error: `"${slug}" slug ki post already exist karti hai. Alag slug use karo.` },
        { status: 409 }
      );
    }

    // --- commit new file ---
    const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `post: add "${title}"`,
        content: Buffer.from(fileContent, "utf-8").toString("base64"),
        branch: GITHUB_BRANCH,
      }),
    });

    if (!commitRes.ok) {
      const err = await commitRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: `GitHub commit fail hua: ${err.message || commitRes.statusText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, url: `${SITE_URL}/${slug}` });
  } catch {
    return NextResponse.json({ error: "Server error. Env variables check karo." }, { status: 500 });
  }
}