import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Covers are already compressed (WebP/PNG <=150KB). Do not run Sharp.
    unoptimized: true,
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 384],
  },
  async headers() {
    const year = "public, max-age=31536000, immutable";
    const hour = "public, max-age=3600, stale-while-revalidate=86400";
    return [
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: year }] },
      {
        source: "/:file(favicon.ico|icon.png|apple-icon.png|next.svg|vercel.svg|window.svg|file.svg|globe.svg)",
        headers: [{ key: "Cache-Control", value: year }],
      },
      { source: "/sitemap.xml", headers: [{ key: "Cache-Control", value: hour }] },
      { source: "/robots.txt", headers: [{ key: "Cache-Control", value: hour }] },
    ];
  },
  async redirects() {
    return [
      // Canonical company URLs (old hyphenated paths still appear in GSC)
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      // Trailing-slash variants of the above (proxy also normalizes; belt-and-suspenders)
      {
        source: "/about-us/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
