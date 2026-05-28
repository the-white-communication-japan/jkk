import { ImageResponse } from "next/og";

export const alt =
  "株式会社JKK｜看板からネットまで。地域のお店・企業の集客を支援する。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch a Noto Sans JP subset (TrueType) from Google Fonts so Japanese glyphs
// render in the OG card. Google returns TTF when the request lacks a browser
// User-Agent, which is what satori needs.
async function loadNotoSansJP(
  text: string,
  weight: number,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&text=${encodeURIComponent(
    text,
  )}`;
  const css = await (await fetch(url)).text();
  const src = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
  )?.[1];
  if (!src) throw new Error("Noto Sans JP source not found");
  const res = await fetch(src);
  if (!res.ok) throw new Error("Noto Sans JP download failed");
  return res.arrayBuffer();
}

export default async function Image() {
  const brand = "株式会社JKK";
  const tagline = "看板からネットまで。";
  const sub = "地域のお店・企業の集客を、一括で支援する。";
  const services = "商工案内看板 ／ どこねっと！！ ／ デジタルマーケティング支援";
  const badge = "創業36年の地域ネットワーク";
  const text = brand + tagline + sub + services + badge + "JKK";

  let fonts;
  try {
    const [regular, bold] = await Promise.all([
      loadNotoSansJP(text, 400),
      loadNotoSansJP(text, 700),
    ]);
    fonts = [
      { name: "Noto Sans JP", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Noto Sans JP", data: bold, weight: 700 as const, style: "normal" as const },
    ];
  } catch {
    // Google Fonts unreachable — render with the default font (the Latin "JKK"
    // mark stays legible even if Japanese degrades).
    fonts = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundImage: "linear-gradient(135deg, #0d2944 0%, #14375c 60%, #2e5a85 100%)",
          color: "#ffffff",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "18px",
              background: "#ffffff",
              color: "#14375c",
              fontSize: "40px",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            JKK
          </div>
          <div style={{ display: "flex", fontSize: "32px", fontWeight: 700 }}>
            {brand}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", fontSize: "76px", fontWeight: 700, lineHeight: 1.15 }}>
            {tagline}
          </div>
          <div style={{ display: "flex", fontSize: "36px", color: "#dbe6f2", lineHeight: 1.4 }}>
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "28px",
            borderTop: "2px solid rgba(255,255,255,0.22)",
          }}
        >
          <div style={{ display: "flex", fontSize: "24px", color: "#c7d4e3" }}>
            {services}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 700,
              color: "#0d2944",
              background: "#e08a3c",
              padding: "10px 20px",
              borderRadius: "999px",
            }}
          >
            {badge}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fonts ? { fonts } : {}),
    },
  );
}
