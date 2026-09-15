import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones/other devices on the same wifi load the dev server's CSS/JS
  // when opened via the LAN IP (e.g. http://192.168.101.15:3000) instead of
  // localhost — dev-only, has no effect on a real deployment.
  allowedDevOrigins: ["192.168.101.15"],
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
