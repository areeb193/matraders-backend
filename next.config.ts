import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable standalone output for Docker optimization
  output: 'standalone',
  
  // Disable image optimization for Docker (or configure external service)
  images: {
    domains: ['localhost'],
    unoptimized: true, // Set to false in production with proper image optimization
  },
};

export default nextConfig;
