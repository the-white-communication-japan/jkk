import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { formatDate, toISODate } from "@/lib/format";
import { categoryMeta } from "@/lib/categories";
import { SITE_NAME, SITE_LOCALE, SITE_DESCRIPTION } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}): Promise<Metadata> {
  const { blogId } = await params;
  const id = Number(blogId);
  const post = Number.isInteger(id)
    ? await prisma.post.findUnique({ where: { id } })
    : null;
  if (!post || !post.published) {
    return {
      title: "記事が見つかりません",
      robots: { index: false, follow: false },
    };
  }
  const url = `/blog/${post.id}`;
  const description = post.excerpt ?? SITE_DESCRIPTION;
  const ogTitle = `${post.title}｜${SITE_NAME} ブログ`;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: SITE_LOCALE,
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const id = Number(blogId);
  const post = Number.isInteger(id)
    ? await prisma.post.findUnique({ where: { id } })
    : null;
  if (!post || !post.published) notFound();

  return (
    <>
      <SiteHeader active="blog" />

      <section className="page-hero">
        <div className="container narrow">
          <div className="page-hero__crumbs">
            <Link href="/">トップ</Link>
            <span className="sep">/</span>
            <Link href="/blog">ブログ</Link>
            <span className="sep">/</span>
            <span>{post.title}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="article">
            <div className="article__meta">
              <span
                className={`news-cat ${categoryMeta(post.category).badgeClass}`}
                style={{ marginRight: "12px" }}
              >
                {categoryMeta(post.category).label}
              </span>
              <time dateTime={toISODate(post.createdAt)}>
                {formatDate(post.createdAt)}
              </time>
            </div>
            <h1 className="article__title">{post.title}</h1>
            <div className="article__body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <div style={{ marginTop: "var(--sp-8)" }}>
              <Link className="link-arrow" href="/blog">
                ブログ一覧へ戻る
              </Link>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
