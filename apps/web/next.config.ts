import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Let the monorepo packages ship raw TS — Next transpiles them.
  transpilePackages: ["@aerovy/ui"],
  // Pin tracing root to the monorepo so Next doesn't pick up an unrelated
  // lockfile higher up on the machine.
  outputFileTracingRoot: resolve(__dirname, "../.."),
  // typedRoutes re-enabled in P1-T08 once the referenced pages exist.
  images: {
    remotePatterns: [
      // Placeholder suppliers for seed data. Refine in P1-T05.
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default withNextIntl(nextConfig);
