import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  basePath: '/gpacal', // IMPORTANT: Set this to your repo name
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js image optimizer
  },
  reactCompiler: true,
};

export default nextConfig;
