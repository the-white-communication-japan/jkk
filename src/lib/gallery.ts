// ギャラリーページ (/gallery) に並べる写真データ。
// services.ts と同様、DB ではなくコード内データとして定義し静的生成する。
// 画像は public/ 直下に配置し、ルートからのパスで参照する。

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

export const galleryItems: GalleryItem[] = [
  {
    src: "/signboard-site.jpg",
    alt: "通学路沿いのフェンスに設置された案内地図看板",
    caption:
      "通学路沿いに設置された案内地図看板。地域を行き交う人の目に自然に入ります。",
    tag: "商工案内看板",
  },
  {
    src: "/signboard-site-2.jpg",
    alt: "ロードサイドに設置された複数の案内地図看板",
    caption:
      "別の設置事例。人通りの多い場所に、複数の案内地図看板をまとめて掲示しています。",
    tag: "商工案内看板",
  },
  {
    src: "/signboard-map.jpg",
    alt: "案内地図看板のクローズアップ。QRコード付き",
    caption:
      "案内地図看板のアップ。掲載されたQRコードから、スマホで店舗情報ページへつながります。",
    tag: "商工案内看板",
  },
  {
    src: "/dokonet-osaka.png",
    alt: "地域密着型ポータルサイト「どこねっと！！」大阪版の画面",
    caption:
      "地域ポータル「どこねっと！！」。エリア・ジャンルごとに店舗・企業を探せます。",
    tag: "どこねっと！！",
  },
  {
    src: "/dokonet-guide.png",
    alt: "「どこねっと！！」付帯サービスの案内",
    caption:
      "Googleビジネスプロフィール・360°ビューなど、Web発信を支える付帯サービスのご案内。",
    tag: "デジタル支援",
  },
];
