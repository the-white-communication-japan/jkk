import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PostHog reverse proxy (US cloud). Routes analytics through our own origin
  // via /ingest so ad blockers don't drop events. Pairs with api_host:"/ingest"
  // in src/instrumentation-client.ts. The /static rule must precede the catch-all.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog endpoints rely on trailing slashes the proxy must not redirect away.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
