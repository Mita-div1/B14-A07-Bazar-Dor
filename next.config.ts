import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Native / node-only drivers must not be bundled by webpack.
  serverExternalPackages: ["better-sqlite3", "pg"],
  eslint: { ignoreDuringBuilds: true },
  // Google / GitHub avatars used after social sign in.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
