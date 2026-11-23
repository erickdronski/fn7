import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 127.0.0.1 is a different host from localhost. Without this, dev
  // scripts and the hot-reload socket are refused and Grab never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
