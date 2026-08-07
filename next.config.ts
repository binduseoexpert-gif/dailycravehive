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
      {
        source: "/category/ai-writing-tools",
        destination: "/best-ai-writing-tools",
        permanent: true,
      },
      {
        source: "/category/ai-image-tools",
        destination: "/best-ai-image-generators",
        permanent: true,
      },
      {
        source: "/category/lifestyle",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;