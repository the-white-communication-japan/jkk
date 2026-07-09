// Schema.org 構造化データ（JSON-LD）ビルダー群。
// 値はすべて site.ts / services.ts の定数から組み立て、ハードコードしない。
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  COMPANY_TEL,
  COMPANY_EMAIL,
  COMPANY_POSTAL_CODE,
  COMPANY_ADDRESS_REGION,
  COMPANY_ADDRESS_LOCALITY,
  COMPANY_STREET,
  COMPANY_FOUNDED,
} from "@/lib/site";
import type { Service, ServiceFaq } from "@/lib/services";

const ORG_ID = `${SITE_URL}/#localbusiness`;
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    postalCode: COMPANY_POSTAL_CODE,
    addressCountry: "JP",
    addressRegion: COMPANY_ADDRESS_REGION,
    addressLocality: COMPANY_ADDRESS_LOCALITY,
    streetAddress: COMPANY_STREET,
  };
}

// サイト全体の主エンティティ。LocalBusiness は Organization のサブタイプなので
// これ一つで会社情報を賄い、WebSite からは publisher で参照する。
export function siteSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      image: OG_IMAGE,
      logo: `${SITE_URL}/apple-icon.png`,
      description: SITE_DESCRIPTION,
      telephone: COMPANY_TEL,
      email: COMPANY_EMAIL,
      foundingDate: COMPANY_FOUNDED,
      address: postalAddress(),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: ["https://dokonet.jp"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "ja",
      publisher: { "@id": ORG_ID },
    },
  ];
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

function serviceSchema(svc: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.metaTitle,
    description: svc.metaDescription,
    url: `${SITE_URL}/services/${svc.slug}`,
    serviceType: svc.navLabel,
    areaServed: { "@type": "Country", name: "日本" },
    provider: { "@id": ORG_ID },
  };
}

function faqPageSchema(faq: ServiceFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// サービス個別ページ用のノード配列（Service + FAQPage + BreadcrumbList）。
export function servicePageSchema(svc: Service) {
  const nodes: object[] = [serviceSchema(svc)];
  if (svc.faq && svc.faq.length > 0) nodes.push(faqPageSchema(svc.faq));
  nodes.push(
    breadcrumbSchema([
      { name: "トップ", url: `${SITE_URL}/` },
      { name: "サービス", url: `${SITE_URL}/#services` },
      { name: svc.navLabel, url: `${SITE_URL}/services/${svc.slug}` },
    ]),
  );
  return nodes;
}

type BlogPostInput = {
  id: number;
  title: string;
  excerpt?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function blogPostingSchema(post: BlogPostInput) {
  const url = `${SITE_URL}/blog/${post.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: OG_IMAGE,
    mainEntityOfPage: url,
    url,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
