import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { formatDate, toISODate } from "@/lib/format";
import { excerptFromMarkdown } from "@/lib/excerpt";
import { categoryMeta } from "@/lib/categories";
import { SITE_URL, SITE_NAME, SITE_LOCALE, SITE_DESCRIPTION } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

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
  const description = excerptFromMarkdown(post.content) || SITE_DESCRIPTION;
  const ogTitle = `${post.title}｜${SITE_NAME} 新着情報`;
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
      <JsonLd
        data={[
          blogPostingSchema({
            id: post.id,
            title: post.title,
            excerpt: excerptFromMarkdown(post.content),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          }),
          breadcrumbSchema([
            { name: "トップ", url: `${SITE_URL}/` },
            { name: "新着情報", url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${post.id}` },
          ]),
        ]}
      />
      <SiteHeader active="blog" />

      <section className="page-hero">
        <div className="container narrow">
          <div className="page-hero__crumbs">
            <Link href="/">トップ</Link>
            <span className="sep">/</span>
            <Link href="/blog">新着情報</Link>
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
                新着情報一覧へ戻る
              </Link>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
