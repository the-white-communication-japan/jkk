import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate, toISODate } from "@/lib/format";
import { excerptFromMarkdown } from "@/lib/excerpt";
import { SITE_NAME, SITE_LOCALE } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogList, { type BlogListItem } from "@/components/BlogList";

const BLOG_DESCRIPTION =
  "お知らせ・ブログ・アップデート情報を、株式会社JKKが発信しています。";

export const metadata: Metadata = {
  title: "新着情報",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/blog",
    siteName: SITE_NAME,
    title: `新着情報｜${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
  },
};

// ISR: 静的生成し 5 分ごとに再検証。記事の作成/更新/削除は
// revalidatePath("/blog") を呼ぶので即時反映される（manage/posts/actions.ts）。
// try/catch で DB 不通でもビルド・描画が通る（home と同じ方針）。
export const revalidate = 300;

async function getPublishedPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  // 種別フィルターはクライアント側で行うため、全件を整形して渡す。
  const items: BlogListItem[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    category: post.category,
    dateISO: toISODate(post.createdAt),
    dateLabel: formatDate(post.createdAt),
    preview: excerptFromMarkdown(post.content),
  }));

  return (
    <>
      <SiteHeader active="blog" />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero__crumbs">
            <Link href="/">トップ</Link>
            <span className="sep">/</span>
            <span>新着情報</span>
          </div>
          <h1>新着情報</h1>
          <p className="page-hero__lead">
            お知らせ・ブログ・アップデート情報など、JKKからの最新情報をお届けします。
          </p>
        </div>
      </section>

      <section className="section">
        <BlogList items={items} />
      </section>

      <SiteFooter />
    </>
  );
}
