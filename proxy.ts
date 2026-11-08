import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Retired AI-tool URLs. 410 (not a 301) so Google drops them.
// Trailing-slash variants are normalized to the same path before lookup.
const GONE_PATHS = new Set([
  "/best-ai-image-generators",
  "/best-ai-writing-tools",
  "/jasper-ai-review",
  "/chatgpt-vs-claude",
  "/frase-vs-surfer-seo",
  "/frase-vs-surferseo",
  "/grammarly-vs-chatgpt",
  "/rytr-vs-writesonic",
  "/rytr-review",
  "/writesonic-review",
  "/surfer-seo-review",
  "/category/ai-image-tools",
  "/category/ai-writing-tools",
]);

// Single-hop 301s. Slash and non-slash forms both land on the canonical URL.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/top-money-making-ideas-start-earning-from-home":
    "/how-to-sell-feet-pics-and-make-money",
  // Old lifestyle category. One 301 to /category/guides, which is 200.
  "/category/lifestyle": "/category/guides",
  // Company URL canonicals (also listed in next.config redirects)
  "/about-us": "/about",
  "/contact-us": "/contact",
};

const GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>Page removed</title>
</head>
<body>
<p>This page has been removed.</p>
</body>
</html>`;

export function proxy(req: NextRequest) {
  const raw = req.nextUrl.pathname;
  const hasSlash = raw.length > 1 && raw.endsWith("/");
  const path = hasSlash ? raw.replace(/\/+$/, "") : raw;

  if (GONE_PATHS.has(path)) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  }

  const target = LEGACY_REDIRECTS[path];
  if (target) {
    const res = NextResponse.redirect(new URL(target, "https://www.dailycravehive.com"), 301);
    res.headers.set("Cache-Control", "public, max-age=86400");
    return res;
  }

  // Preserve default trailing-slash normalization (skipTrailingSlashRedirect is on)
  if (hasSlash && !path.startsWith("/api") && !path.startsWith("/_next")) {
    const res = NextResponse.redirect(new URL(path + req.nextUrl.search, req.url), 308);
    res.headers.set("Cache-Control", "public, max-age=86400");
    return res;
  }

  return NextResponse.next();
}

// Proxy runs on the Node.js runtime. Skip static assets so they are served
// from the CDN without invoking this function.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|images(?:/|$)|favicon.ico|icon.png|apple-icon.png|sitemap.xml|robots.txt|api(?:/|$)|.*\\..*).*)",
  ],
};
