export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  updated?: string;
  thumbnail: string;
  featured: boolean;
  keywords: string[];
  readingTime: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}