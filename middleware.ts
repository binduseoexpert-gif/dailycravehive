import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Old AI-niche URLs — permanently removed (410 Gone)
const GONE_PATHS = new Set([
  "/category/ai-writing-tools",
  "/category/ai-image-tools",
  "/category/lifestyle",
  "/jasper-ai-review",
  "/chatgpt-vs-claude",
  "/grammarly-vs-chatgpt",
  "/frase-vs-surfer-seo",
  "/rytr-vs-writesonic",
  "/best-ai-writing-tools",
  "/best-ai-image-generators",
]);

export function middleware(req: NextRequest) {
  if (GONE_PATHS.has(req.nextUrl.pathname)) {
    return new NextResponse("Gone", { status: 410 });
  }
  return NextResponse.next();
}