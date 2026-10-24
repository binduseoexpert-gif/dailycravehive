import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Old AI-niche / off-topic URLs: single-hop 301 to the closest DCH page.
// Trailing-slash variants are resolved here directly (no chain).
const LEGACY_REDIRECTS: Record<string, string> = {
  "/frase-vs-surfer-seo": "/category/reviews",
  "/grammarly-vs-chatgpt": "/category/reviews",
  "/rytr-vs-writesonic": "/category/reviews",
  "/chatgpt-vs-claude": "/category/reviews",
  "/jasper-ai-review": "/category/reviews",
  "/best-ai-image-generators": "/category/best-of",
  "/best-ai-writing-tools": "/category/best-of",
  "/top-money-making-ideas-start-earning-from-home": "/how-to-sell-feet-pics-and-make-money",
  "/category/ai-image-tools": "/category/reviews",
  "/category/ai-writing-tools": "/category/reviews",
  "/category/lifestyle": "/category/guides",
};

export function proxy(req: NextRequest) {
  const raw = req.nextUrl.pathname;
  const hasSlash = raw.length > 1 && raw.endsWith("/");
  const path = hasSlash ? raw.replace(/\/+$/, "") : raw;

  const target = LEGACY_REDIRECTS[path];
  if (target) {
    return NextResponse.redirect(new URL(target, "https://www.dailycravehive.com"), 301);
  }

  // Preserve default trailing-slash normalization (skipTrailingSlashRedirect is on)
  if (hasSlash && !path.startsWith("/api") && !path.startsWith("/_next")) {
    return NextResponse.redirect(new URL(path + req.nextUrl.search, req.url), 308);
  }

  return NextResponse.next();
}
