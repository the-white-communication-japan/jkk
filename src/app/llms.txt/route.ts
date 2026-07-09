import { services } from "@/lib/services";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  COMPANY_ADDRESS,
  COMPANY_TEL,
  COMPANY_HOURS,
  COMPANY_EMAIL,
} from "@/lib/site";

// AI クローラー向けの要約ファイル（/llms.txt）。会社・サービス・連絡先の
// 要点を text/plain で提供。純粋な静的テキストなのでビルド時に固定生成する。
export const dynamic = "force-static";

export function GET() {
  const serviceLines = services
    .map((s) => `- [${s.navLabel}](${SITE_URL}/services/${s.slug}): ${s.navDesc}`)
    .join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME}（${SITE_URL}）は東京都新宿区四谷を拠点に、商工案内地図看板・地域密着型ポータルサイト「どこねっと！！」・デジタルマーケティング支援を提供する創業1985年（41年）の企業です。街のお店・企業の集客を、看板からネットまで一括で支援しています。

## サービス
${serviceLines}

## 主要ページ
- [トップ](${SITE_URL}/)
- [新着情報](${SITE_URL}/blog)
- [ギャラリー](${SITE_URL}/gallery)

## 会社情報
- 所在地: ${COMPANY_ADDRESS}
- 電話: ${COMPANY_TEL}（${COMPANY_HOURS}）
- メール: ${COMPANY_EMAIL}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
