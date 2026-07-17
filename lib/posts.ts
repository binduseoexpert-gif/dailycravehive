import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
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
      excerpt: data.excerpt || "",
      category: data.category || "",
      categorySlug: data.categorySlug || "",
      date: data.date || "",
      thumbnail: data.thumbnail || "",
      featured: data.featured || false,
      keywords: (data.keywords as string[]) || [],
      readingTime: stats.text,
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
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