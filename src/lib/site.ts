// Central site / SEO configuration.
//
// The canonical production URL is resolved from the environment so it is never
// hard-coded. Priority:
//   1. NEXT_PUBLIC_SITE_URL          — set this to the real custom domain.
//   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel (stable prod domain).
//   3. http://localhost:3000         — local development fallback.
//
// Imported only from server code (layout metadata, sitemap, robots, manifest,
// OG image), so the non-public Vercel variable is safe to read here.

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "株式会社JKK";

export const SITE_TITLE =
  "株式会社JKK｜看板からネットまで。地域のお店・企業の集客を支援する。";

export const SITE_DESCRIPTION =
  "商工案内地図看板、地域密着型ポータルサイト『どこねっと！！』、デジタルマーケティング支援まで。創業36年の地域ネットワークで、街のお店・企業の集客を一括サポート。";

export const SITE_LOCALE = "ja_JP";

export const SITE_KEYWORDS = [
  "株式会社JKK",
  "JKK",
  "商工案内看板",
  "地図看板",
  "案内看板",
  "どこねっと",
  "地域ポータルサイト",
  "デジタルマーケティング支援",
  "集客支援",
  "地域密着",
];
