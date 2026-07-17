// components/SiteNav.tsx
// Server component: builds the navbar dropdowns automatically from posts.
// Each category shows its latest 5 posts + a "View all" link.
// New posts appear here automatically after every publish (each deploy rebuilds this).

import { getAllPosts } from "@/lib/posts";
import Navbar, { type NavGroup } from "./Navbar";

// Categories shown in the navbar, in this order.
// To add a new nav category later, just add a line here.
const NAV_CATEGORIES = [
  { label: "AI Writing Tools", slug: "ai-writing-tools" },
  { label: "AI Image Tools", slug: "ai-image-tools" },
  { label: "Best Of", slug: "best-of" },
  { label: "Comparisons", slug: "comparisons" },
  { label: "Lifestyle", slug: "lifestyle" },
];

// Long titles get shortened for the dropdown:
// take the part before ":" / "(" / "–", then cap at 42 chars.
function shortTitle(title: string) {
  let t = title.split(/[:(\u2013\u2014|]/)[0].trim();
  if (t.length > 42) t = t.slice(0, 42).trimEnd() + "\u2026";
  return t;
}

export default function SiteNav() {
  const posts = getAllPosts(); // already sorted newest-first

  const items: NavGroup[] = [
    { label: "Home", href: "/" },
    ...NAV_CATEGORIES.map((cat) => {
      const catPosts = posts.filter((p) => p.categorySlug === cat.slug).slice(0, 5);
      return {
        label: cat.label,
        href: `/category/${cat.slug}`,
        children:
          catPosts.length > 0
            ? catPosts.map((p) => ({ label: shortTitle(p.title), href: `/${p.slug}` }))
            : undefined,
      };
    }),
  ];

  return <Navbar items={items} />;
}