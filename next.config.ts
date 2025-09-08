import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Specify the root directory for Turbopack to avoid warnings
  turbopack: {
    root: "."
  },
  // Configure image domains for Next.js Image component
  images: {
    domains: [
      'pub-141831e61e69445289222976a15b6fb3.r2.dev',
      'ui-avatars.com',
      'trytechnical.com',
      'images.unsplash.com'
    ],
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