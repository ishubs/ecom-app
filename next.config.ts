import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
    images: {
    domains: ["picsum.photos"], // Allow images from this domain
  },

};

export default nextConfig;
