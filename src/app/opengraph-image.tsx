import { ImageResponse } from "next/og";

export const alt =
  "株式会社JKK｜看板からネットまで。地域のお店・企業の集客を支援する。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch a Google Font subset (TrueType) so Japanese glyphs render in the OG
// card. Google returns TTF when the request lacks a browser User-Agent, which
// is what satori needs.
async function loadGoogleFont(
  family: string,
  text: string,
  weight: number,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+",
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
  )?.[1];
  if (!src) throw new Error(`${family} source not found`);
  const res = await fetch(src);
  if (!res.ok) throw new Error(`${family} download failed`);
  return res.arrayBuffer();
}

export default async function Image() {
  const brand = "株式会社JKK";
  const tagline = "看板からネットまで。";
  const sub = "地域のお店・企業の集客を、一括で支援する。";
  const services = "商工案内看板 ／ どこねっと！！ ／ デジタルマーケティング支援";
  const badge = "創業41年の地域ネットワーク";
  const text = brand + tagline + sub + services + badge + "JKK";

  let fonts;
  try {
    const [regular, bold, serifBold] = await Promise.all([
      loadGoogleFont("Noto Sans JP", text, 400),
      loadGoogleFont("Noto Sans JP", text, 700),
      loadGoogleFont("Noto Serif JP", "JKK", 700),
    ]);
    fonts = [
      { name: "Noto Sans JP", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Noto Sans JP", data: bold, weight: 700 as const, style: "normal" as const },
      { name: "Noto Serif JP", data: serifBold, weight: 700 as const, style: "normal" as const },
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Noto Sans JP",
              fontSize: "42px",
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            株式会社
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Noto Serif JP",
              fontSize: "88px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "2px",
            }}
          >
            JKK
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
