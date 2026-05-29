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

// Official LINE channel (友だち追加) link the お問い合わせ buttons point to.
// Set NEXT_PUBLIC_LINE_URL to the real lin.ee / line.me URL.
export const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL?.trim() || "#";

// Google Analytics 4 measurement ID. Override per environment with
// NEXT_PUBLIC_GA_ID; defaults to the production property.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-5N32Q99YQ4";

export const SITE_NAME = "株式会社JKK";

// 会社の連絡先。フッター・CTA・構造化データの共通ソース。
// 出典: JKK 自身の どこねっと (dokonet.jp) 掲載情報。
export const COMPANY_POSTAL_CODE = "160-0004";
export const COMPANY_ADDRESS = "東京都新宿区四谷4-30-23 ビルド吉田102";
export const COMPANY_TEL = "03-3357-2501";
export const COMPANY_TEL_HREF = `tel:${COMPANY_TEL.replace(/-/g, "")}`;
export const COMPANY_EMAIL = "info@dokonet.jp";
export const COMPANY_HOURS = "平日 9:00–18:00";

export const SITE_TITLE =
  "株式会社JKK｜看板からネットまで。地域のお店・企業の集客を支援する。";

export const SITE_DESCRIPTION =
  "商工案内地図看板、地域密着型ポータルサイト『どこねっと！！』、デジタルマーケティング支援まで。創業41年の地域ネットワークで、街のお店・企業の集客を一括サポート。";

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
