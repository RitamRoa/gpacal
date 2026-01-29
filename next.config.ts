import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  basePath: isProd ? '/gpacal' : '', // Only use basePath in production
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimizer
  },
  reactCompiler: true,
};

export default nextConfig;
