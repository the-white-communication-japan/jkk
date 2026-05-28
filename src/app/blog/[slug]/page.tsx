import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { formatDate, toISODate } from "@/lib/format";
import { categoryMeta } from "@/lib/categories";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) {
    return { title: "記事が見つかりません｜株式会社JKK" };
  }
  return {
    title: `${post.title}｜株式会社JKK ブログ`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
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
