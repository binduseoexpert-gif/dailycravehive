import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Retired AI-tool URLs. 410 (not a 301) so Google drops them.
// A 301 into an unrelated category was a soft 404. The older
// trailing-slash 308 that then 410'd was a Search Console redirect error.
const GONE_PATHS = new Set([
  "/best-ai-image-generators",
  "/best-ai-writing-tools",
  "/jasper-ai-review",
  "/chatgpt-vs-claude",
  "/frase-vs-surfer-seo",
  "/grammarly-vs-chatgpt",
  "/rytr-vs-writesonic",
  "/category/ai-image-tools",
  "/category/ai-writing-tools",
]);

// Single-hop 301s. Slash and non-slash forms both land on the canonical URL.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/top-money-making-ideas-start-earning-from-home":
    "/how-to-sell-feet-pics-and-make-money",
  // Old lifestyle category. One 301 to /category/guides, which is 200.
  // Handled before trailing-slash normalization so it cannot chain.
  "/category/lifestyle": "/category/guides",
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
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }

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
