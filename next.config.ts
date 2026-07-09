import type { NextConfig } from "next";

// Content-Security-Policy — shipped as Report-Only first so we can watch for
// violations from the analytics stack (GA via @next/third-parties, Vercel Speed
// Insights) before enforcing. PostHog is same-origin through the /ingest proxy
// below, so 'self' already covers it. Promote to `Content-Security-Policy` once
// the violation reports come back clean.
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://vitals.vercel-insights.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://accounts.google.com",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
];

const nextConfig: NextConfig = {
  // フレームワーク・バージョンの露出を止める。
  poweredByHeader: false,

  // next/image の配信フォーマット。AVIF を優先し WebP にフォールバック
  // （デフォルトは ['image/webp'] のみ）。quality は既定値 75 を使用。
  images: {
    formats: ["image/avif", "image/webp"],
  },

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

  // 全ルートに共通のセキュリティヘッダーを付与。
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // PostHog endpoints rely on trailing slashes the proxy must not redirect away.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
