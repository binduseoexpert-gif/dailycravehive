// app/api/admin/posts/[slug]/route.ts
// GET    → load one post (frontmatter + body) for the edit form
// PUT    → save edits back to GitHub (password required)
// DELETE → delete the post file from GitHub (password required)

import { NextResponse } from "next/server";
import matter from "gray-matter";

export const runtime = "nodejs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const POSTS_DIR = process.env.POSTS_DIR || "content/posts";
const POSTS_EXT = process.env.POSTS_EXT || "mdx";
const ADMIN_SECRET = process.env.ADMIN_SECRET!;

const gh = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

const yamlStr = (s: string) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

function filePath(slug: string) {
  return `${POSTS_DIR}/${slug}.${POSTS_EXT}`;
}

async function getFile(slug: string) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath(slug)}?ref=${GITHUB_BRANCH}`,
    { headers: gh, cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  const content = Buffer.from(json.content, "base64").toString("utf-8");
  return { content, sha: json.sha as string };
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
    }
    const file = await getFile(slug);
    if (!file) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const { data, content } = matter(file.content);
    return NextResponse.json({ frontmatter: data, body: content.trim() });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { title, category, excerpt, thumbnail, keywords, featured, date, body, password, imageData, imageName } =
      await req.json();

    if (!ADMIN_SECRET || password !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
    }
    if (!title || !excerpt || !body) {
      return NextResponse.json({ error: "Title, excerpt and body are required." }, { status: 400 });
    }

    const file = await getFile(slug);
    if (!file) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    // --- commit replacement image first (if one was uploaded) ---
    if (imageData && imageName) {
      if (!/^[a-z0-9.-]+\.(png|jpg|jpeg|webp)$/.test(imageName)) {
        return NextResponse.json({ error: "Invalid image name or format." }, { status: 400 });
      }
      const imgPath = `public/images/${imageName}`;
      let existingSha: string | undefined;
      const imgCheck = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${imgPath}?ref=${GITHUB_BRANCH}`,
        { headers: gh, cache: "no-store" }
      );
      if (imgCheck.ok) {
        const j = await imgCheck.json();
        existingSha = j.sha;
      }
      const imgCommit = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${imgPath}`, {
        method: "PUT",
        headers: { ...gh, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `image: update ${imageName}`,
          content: imageData,
          branch: GITHUB_BRANCH,
          ...(existingSha ? { sha: existingSha } : {}),
        }),
      });
      if (!imgCommit.ok) {
        const err = await imgCommit.json().catch(() => ({}));
        return NextResponse.json(
          { error: `Image upload failed: ${err.message || imgCommit.statusText}` },
          { status: 500 }
        );
      }
    }

    const slugify = (t: string) =>
      t.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

    const lines: string[] = [
      "---",
      `title: ${yamlStr(title)}`,
      `category: ${yamlStr(category || "")}`,
      `categorySlug: ${yamlStr(slugify(category || ""))}`,
      `date: ${yamlStr(date || new Date().toISOString().split("T")[0])}`,
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

    const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath(slug)}`, {
      method: "PUT",
      headers: { ...gh, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `post: update "${title}"`,
        content: Buffer.from(fileContent, "utf-8").toString("base64"),
        branch: GITHUB_BRANCH,
        sha: file.sha,
      }),
    });

    if (!commitRes.ok) {
      const err = await commitRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: `GitHub commit failed: ${err.message || commitRes.statusText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { password } = await req.json();

    if (!ADMIN_SECRET || password !== ADMIN_SECRET) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
    }

    const file = await getFile(slug);
    if (!file) return NextResponse.json({ error: "Post not found." }, { status: 404 });

    const delRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath(slug)}`, {
      method: "DELETE",
      headers: { ...gh, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `post: delete "${slug}"`,
        sha: file.sha,
        branch: GITHUB_BRANCH,
      }),
    });

    if (!delRes.ok) {
      const err = await delRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: `GitHub delete failed: ${err.message || delRes.statusText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}