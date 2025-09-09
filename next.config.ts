import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Specify absolute root directory for Turbopack to avoid warnings
  turbopack: {
    root: path.resolve(__dirname)
  },
  // Configure image remote patterns (domains is deprecated)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-141831e61e69445289222976a15b6fb3.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'trytechnical.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;