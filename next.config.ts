import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.kavan.tech/**'), new URL('https://milaaplan.com/**')],
    
  },
  devIndicators: false
};

export default nextConfig;
