import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: '/next',
  // assetPrefix: '/next',
  output: undefined,
  trailingSlash: true,
  bundlePagesRouterDependencies: true,
  compress: true,
  logging: false,
  images: {
    remotePatterns: [{ hostname: 'avatars.githubusercontent.com' }]
  }
};

export default nextConfig;
