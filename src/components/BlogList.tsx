"use client";

import { useState } from "react";
import Link from "next/link";
import {
  POST_CATEGORIES,
  categoryMeta,
  type PostCategory,
} from "@/lib/categories";

// サーバー側で整形済みの一覧アイテム（Date や Markdown 本文は渡さない）。
export type BlogListItem = {
  id: number;
  title: string;
  category: PostCategory;
  dateISO: string;
  dateLabel: string;
  preview: string;
};

// 記事一覧＋種別フィルター。全件はサーバーで SSR 描画（クローラブル）し、
// 種別の絞り込みだけをクライアント state で行う。useSearchParams を使わない
// ことで /blog を静的(ISR)のまま全記事リンクを初期 HTML に含められる。
export default function BlogList({ items }: { items: BlogListItem[] }) {
  const [active, setActive] = useState<PostCategory | null>(null);
  const visible = active
    ? items.filter((it) => it.category === active)
    : items;

  return (
    <div className="container narrow">
      <nav className="blog-filter" aria-label="種別で絞り込み">
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-current={!active ? "true" : undefined}
        >
          すべて
        </button>
        {POST_CATEGORIES.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setActive(c.value)}
            aria-current={active === c.value ? "true" : undefined}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {visible.length === 0 ? (
        <div className="blog-empty">
          {active
            ? "この種別の記事はまだありません。"
            : "記事は順次公開予定です。"}
        </div>
      ) : (
        <ul className="blog-list">
          {visible.map((post) => {
            const cat = categoryMeta(post.category);
            return (
              <li key={post.id}>
                <Link className="blog-card" href={`/blog/${post.id}`}>
                  <div className="blog-card__head">
                    <span className={`news-cat ${cat.badgeClass}`}>
                      {cat.label}
                    </span>
                    <time dateTime={post.dateISO}>{post.dateLabel}</time>
                  </div>
                  <h2>{post.title}</h2>
                  {post.preview ? <p>{post.preview}</p> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
