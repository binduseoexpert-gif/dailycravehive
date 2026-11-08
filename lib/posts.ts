import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post, SearchEntry } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

// AI-niche posts: URLs live rahenge (direct link se khulenge),
// lekin nav, homepage, category pages aur listings me nahi dikhenge.
const HIDDEN_SLUGS = [

];

let rawCache: Post[] | null = null;

// Internal: reads ALL posts, including hidden ones.
function getAllPostsRaw(): Post[] {
  if (process.env.NODE_ENV === "production" && rawCache) return rawCache;
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

  const posts: Post[] = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || "",
      metaTitle: data.metaTitle || "",
      metaDescription: data.metaDescription || "",
      excerpt: data.excerpt || "",
      category: data.category || "",
      categorySlug: data.categorySlug || "",
      date: data.date || "",
      updated: data.updated || "",
      thumbnail: data.thumbnail || "",
      thumbnailCaption: data.thumbnailCaption || "",
      featured: data.featured || false,
      keywords: (data.keywords as string[]) || [],
      readingTime: stats.text,
      content,
    };
  });

  const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (process.env.NODE_ENV === "production") rawCache = sorted;
  return sorted;
}

// Slim index for the static search page. Omits MDX body.
export function getSearchIndex(): SearchEntry[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    thumbnail: post.thumbnail,
    keywords: post.keywords,
  }));
}

// Public: hidden posts filtered out — nav, homepage, listings sab isi ko use karte hain.
export function getAllPosts(): Post[] {
  return getAllPostsRaw().filter((p) => !HIDDEN_SLUGS.includes(p.slug));
}

// Includes hidden slugs so their URLs still prerender.
export function getAllPostSlugs(): string[] {
  return getAllPostsRaw().map((post) => post.slug);
}

// Uses raw list so hidden post URLs still work (no 404).
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPostsRaw().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export function getAllCategories(): { name: string; slug: string }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, string>();
  posts.forEach((p) => {
    if (p.categorySlug && !categoryMap.has(p.categorySlug)) {
      categoryMap.set(p.categorySlug, p.category);
    }
  });
  return Array.from(categoryMap.entries()).map(([slug, name]) => ({ slug, name }));
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}