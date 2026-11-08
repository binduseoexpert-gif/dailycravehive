import type { MetadataRoute } from "next";

const SITE_URL = "https://www.dailycravehive.com";

export const dynamic = "force-static";
export const revalidate = 86400;

// Googlebot and Bingbot are not listed. They follow the * group and stay allowed.
const AGGRESSIVE_BOTS = [
  "Bytespider",
  "PetalBot",
  "AhrefsBot",
  "AhrefsSiteAudit",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "GPTBot",
  "ClaudeBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: AGGRESSIVE_BOTS,
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}