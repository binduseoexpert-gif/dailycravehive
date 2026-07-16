// app/api/admin/posts/route.ts
// GET: lists all posts (slug, title, date, category) straight from GitHub,
// so the list is always fresh even before Vercel finishes deploying.

import { NextResponse } from "next/server";
import matter from "gray-matter";

export const runtime = "nodejs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const POSTS_DIR = process.env.POSTS_DIR || "content/posts";
const POSTS_EXT = process.env.POSTS_EXT || "mdx";

const gh = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

export async function GET() {
  try {
    const dirRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${POSTS_DIR}?ref=${GITHUB_BRANCH}`,
      { headers: gh, cache: "no-store" }
    );
    if (!dirRes.ok) {
      return NextResponse.json({ error: "Could not list posts from GitHub." }, { status: 500 });
    }
    const files = (await dirRes.json()) as { name: string; path: string }[];
    const mdxFiles = files.filter((f) => f.name.endsWith(`.${POSTS_EXT}`));

    const posts = await Promise.all(
      mdxFiles.map(async (f) => {
        const slug = f.name.replace(new RegExp(`\\.${POSTS_EXT}$`), "");
        try {
          const raw = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${f.path}?ref=${GITHUB_BRANCH}`,
            { headers: { ...gh, Accept: "application/vnd.github.raw" }, cache: "no-store" }
          );
          const text = await raw.text();
          const { data } = matter(text);
          return {
            slug,
            title: (data.title as string) || slug,
            date: (data.date as string) || "",
            category: (data.category as string) || "",
            featured: Boolean(data.featured),
          };
        } catch {
          return { slug, title: slug, date: "", category: "", featured: false };
        }
      })
    );

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Server error. Check your environment variables." }, { status: 500 });
  }
}