import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Source photos are capped at 1920px wide — don't request (and upscale) larger.
    deviceSizes: [390, 640, 750, 828, 1080, 1280, 1920],
    imageSizes: [96, 112, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bgfgmltkwsrrlerdjqfm.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
