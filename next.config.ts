import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.APP_NAME || "Teabang",
    NEXT_PUBLIC_APP_URL: process.env.APP_URL || "http://localhost:3000",
  },
};

export default nextConfig;
