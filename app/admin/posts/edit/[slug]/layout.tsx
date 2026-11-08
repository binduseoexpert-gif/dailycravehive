import { getAllPostSlugs } from "@/lib/posts";

export const dynamic = "force-static";
export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default function EditPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
