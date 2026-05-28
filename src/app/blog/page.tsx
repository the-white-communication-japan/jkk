import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate, toISODate } from "@/lib/format";
import {
  POST_CATEGORIES,
  categoryFromSlug,
  categoryMeta,
} from "@/lib/categories";
import { SITE_NAME, SITE_LOCALE } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const BLOG_DESCRIPTION =
  "お知らせ・ニュース・アップデート情報を、株式会社JKKが発信しています。";

export const metadata: Metadata = {
  title: "ブログ",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: "/blog",
    siteName: SITE_NAME,
    title: `ブログ｜${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
  },
};

// Rendered per-request so new posts appear immediately and the build does not
// require a database connection.
export const dynamic = "force-dynamic";

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeCategory = categoryFromSlug(type);

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(activeCategory ? { category: activeCategory } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <SiteHeader active="blog" />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero__crumbs">
            <Link href="/">トップ</Link>
            <span className="sep">/</span>
            <span>ブログ</span>
          </div>
          <h1>ブログ</h1>
          <p className="page-hero__lead">
            お知らせ・ニュース・アップデート情報など、JKKからの最新情報をお届けします。
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <nav className="blog-filter" aria-label="種別で絞り込み">
            <Link href="/blog" aria-current={!activeCategory ? "true" : undefined}>
              すべて
            </Link>
            {POST_CATEGORIES.map((c) => (
              <Link
                key={c.value}
                href={`/blog?type=${c.slug}`}
                aria-current={activeCategory === c.value ? "true" : undefined}
              >
                {c.label}
              </Link>
            ))}
          </nav>

          {posts.length === 0 ? (
            <div className="blog-empty">
              {activeCategory
                ? "この種別の記事はまだありません。"
                : "記事は順次公開予定です。"}
            </div>
          ) : (
            <ul className="blog-list">
              {posts.map((post) => {
                const cat = categoryMeta(post.category);
                return (
                  <li key={post.id}>
                    <Link className="blog-card" href={`/blog/${post.slug}`}>
                      <div className="blog-card__head">
                        <span className={`news-cat ${cat.badgeClass}`}>
                          {cat.label}
                        </span>
                        <time dateTime={toISODate(post.createdAt)}>
                          {formatDate(post.createdAt)}
                        </time>
                      </div>
                      <h2>{post.title}</h2>
                      {post.excerpt ? <p>{post.excerpt}</p> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
