import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error: NextConfig type does not include eslint in newer Next.js versions, but Next.js build uses it still
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
