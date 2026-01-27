import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimizer
  },
  reactCompiler: true,
  // If deploying to username.github.io/repo-name/, uncomment and set:
  // basePath: '/gpacal',
};

export default nextConfig;
