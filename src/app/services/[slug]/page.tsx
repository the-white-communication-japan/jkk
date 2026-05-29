import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services, serviceSlugs } from "@/lib/services";
import { SITE_NAME, SITE_LOCALE, LINE_URL } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) {
    return {
      title: "ページが見つかりません",
      robots: { index: false, follow: false },
    };
  }
  const url = `/services/${svc.slug}`;
  const ogTitle = `${svc.metaTitle}｜${SITE_NAME}`;
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description: svc.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: svc.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const others = services.filter((s) => s.slug !== svc.slug);

  return (
    <>
      <SiteHeader active="services" />

      {/* ===== HERO ===== */}
      <section className="page-hero">
        <div className="container narrow">
          <div className="page-hero__crumbs">
            <Link href="/">トップ</Link>
            <span className="sep">/</span>
            <Link href="/#services">サービス</Link>
            <span className="sep">/</span>
            <span>{svc.pillLabel}</span>
          </div>
          <span
            className="pill"
            style={{
              background: svc.pillBg,
              color: svc.pillFg,
              marginBottom: "var(--sp-4)",
            }}
          >
            {svc.pillLabel}
          </span>
          <h1>{svc.heroTitle}</h1>
          <p className="page-hero__lead">{svc.heroLead}</p>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="section">
        <div className="container narrow">
          <div className="section-header">
            <span className="eyebrow">Overview</span>
            <h2 className="section-title">{svc.navLabel}とは</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--sp-5)",
            }}
          >
            {svc.overview.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "var(--t-lead)",
                  color: "var(--jkk-ink-soft)",
                  lineHeight: 2,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section bg-soft">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">Features</span>
            <h2 className="section-title">{svc.featuresHeading}</h2>
          </div>
          <div className="grid-3">
            {svc.features.map((f) => (
              <article className="card" key={f.title}>
                <h3
                  style={{
                    fontSize: "var(--t-h3)",
                    marginBottom: "var(--sp-3)",
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: "var(--jkk-ink-soft)", lineHeight: 1.9 }}>
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      {svc.faq && svc.faq.length > 0 && (
        <section className="section">
          <div className="container narrow">
            <div className="section-header center">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-title">
                {svc.faqHeading ?? "よくあるご質問"}
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--sp-4)",
              }}
            >
              {svc.faq.map((item) => (
                <div className="card" key={item.q}>
                  <h3
                    style={{
                      fontSize: "var(--t-h3)",
                      marginBottom: "var(--sp-3)",
                    }}
                  >
                    Q. {item.q}
                  </h3>
                  <p style={{ color: "var(--jkk-ink-soft)", lineHeight: 1.9 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== OTHER SERVICES ===== */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header center">
            <span className="eyebrow">Other Services</span>
            <h2 className="section-title">その他の事業領域</h2>
          </div>
          <div className="grid-2">
            {others.map((o) => (
              <article className="card" key={o.slug}>
                <span
                  className="pill"
                  style={{ background: o.pillBg, color: o.pillFg }}
                >
                  {o.pillLabel}
                </span>
                <h3
                  style={{
                    fontSize: "var(--t-h3)",
                    margin: "var(--sp-4) 0 var(--sp-3)",
                  }}
                >
                  {o.navLabel}
                </h3>
                <p
                  style={{
                    color: "var(--jkk-ink-soft)",
                    lineHeight: 1.8,
                    marginBottom: "var(--sp-5)",
                  }}
                >
                  {o.navDesc}
                </p>
                <Link className="link-arrow" href={`/services/${o.slug}`}>
                  {o.navLabel}を見る
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="section cta-band">
        <div className="container" style={{ textAlign: "center" }}>
          <span
            className="eyebrow"
            style={{ color: "#8ec5e8", justifyContent: "center" }}
          >
            Contact
          </span>
          <h2>
            {svc.navLabel}について、
            <br />
            まずはお気軽にご相談ください。
          </h2>
          <p className="cta-band__lead">
            「何から始めるべきか分からない」というご相談も歓迎です。地域に根差した営業担当者が、お店・企業の状況に合わせて無理のないプランをご提案します。
          </p>
          <div className="actions">
            <a
              className="btn btn--primary btn--lg"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              お問い合わせ
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              サービスについて相談する
            </a>
          </div>
          <div className="cta-band__phone">
            <small>お電話でのご相談</small>
            <strong>0120-XXX-XXX</strong>
            <span>平日 9:00–18:00</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
