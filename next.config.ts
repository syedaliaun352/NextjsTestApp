import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: '/next',
  // assetPrefix: '/next',
  trailingSlash: true,
  images: {
    remotePatterns: [{ hostname: '*.githubusercontent.com' }]
  }
};

export default nextConfig;
