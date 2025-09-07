import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Specify the root directory for Turbopack to avoid warnings
  turbopack: {
    root: "."
  }
};

export default nextConfig;