import Link from "next/link";
import type { Metadata } from "next";
import { galleryItems } from "@/lib/gallery";
import { SITE_NAME, SITE_LOCALE } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const GALLERY_DESCRIPTION =
  "街頭に設置された案内地図看板の設置事例や、地域密着型ポータルサイト「どこねっと！！」の画面など、JKKの取り組みを写真でご紹介します。";

export const metadata: Metadata = {
  title: "ギャラリー",
  description: GALLERY_DESCRIPTION,
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/gallery",
    siteName: SITE_NAME,
    title: `ギャラリー｜${SITE_NAME}`,
    description: GALLERY_DESCRIPTION,
  },
};

export default function GalleryPage() {
  return (
    <>
      <SiteHeader active="gallery" />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero__crumbs">
            <Link href="/">トップ</Link>
            <span className="sep">/</span>
            <span>ギャラリー</span>
          </div>
          <h1>ギャラリー</h1>
          <p className="page-hero__lead">
            街頭に設置された案内地図看板の設置事例や、地域ポータル「どこねっと！！」の画面など、JKKの取り組みを写真でご紹介します。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-masonry">
            {galleryItems.map((item) => (
              <figure className="gallery-item" key={item.src}>
                <div className="gallery-item__media">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span className="gallery-item__tag">{item.tag}</span>
                </div>
                <figcaption className="gallery-item__caption">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
