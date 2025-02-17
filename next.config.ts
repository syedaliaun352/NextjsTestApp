import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: '/next',
  // assetPrefix: '/next',
  // output: 'export',
  trailingSlash: true,
  images: {
    remotePatterns: [{ hostname: 'avatars.githubusercontent.com' }]
  }
};

export default nextConfig;
