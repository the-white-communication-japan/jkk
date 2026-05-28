import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "株式会社JKK｜看板からネットまで。地域のお店・企業の集客を支援する。",
  description:
    "商工案内地図看板、地域密着型ポータルサイト『どこねっと！！』、デジタルマーケティング支援まで。創業36年の地域ネットワークで、街のお店・企業の集客を一括サポート。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
