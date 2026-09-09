import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // old AI categories
      { source: "/category/ai-writing-tools", destination: "/category/best-of", permanent: true },
      { source: "/category/ai-image-tools", destination: "/category/best-of", permanent: true },
      { source: "/category/lifestyle", destination: "/", permanent: true },

      // deleted AI / off-niche posts
      { source: "/jasper-ai-review", destination: "/", permanent: true },
      { source: "/chatgpt-vs-claude", destination: "/", permanent: true },
      { source: "/grammarly-vs-chatgpt", destination: "/", permanent: true },
      { source: "/frase-vs-surfer-seo", destination: "/", permanent: true },
      { source: "/rytr-vs-writesonic", destination: "/", permanent: true },
      { source: "/best-ai-writing-tools", destination: "/category/best-of", permanent: true },
      { source: "/best-ai-image-generators", destination: "/category/best-of", permanent: true },
      {
        source: "/top-money-making-ideas-start-earning-from-home",
        destination: "/how-to-sell-feet-pics-and-make-money",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;