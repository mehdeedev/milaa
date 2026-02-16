import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.kavan.tech/**')],
  },
  devIndicators: false
};

export default nextConfig;
