import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  /* Add any other config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ], // Allow images from this domain
  },
};

export default nextConfig;

