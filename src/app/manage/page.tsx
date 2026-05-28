import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { categoryMeta } from "@/lib/categories";

export default async function ManageHome() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <div className="manage__head">
        <h1>記事一覧</h1>
        <Link className="btn btn--primary btn--sm" href="/manage/posts/new">
          ＋ 新規作成
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="blog-empty">
          まだ記事がありません。「新規作成」から最初の記事を書いてみましょう。
        </div>
      ) : (
        <table className="post-table">
          <thead>
            <tr>
              <th style={{ width: 110 }}>種別</th>
              <th>タイトル</th>
              <th style={{ width: 110 }}>状態</th>
              <th style={{ width: 130 }}>更新日</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const cat = categoryMeta(post.category);
              return (
                <tr key={post.id}>
                  <td>
                    <span className={`news-cat ${cat.badgeClass}`}>{cat.label}</span>
                  </td>
                  <td>
                    <Link href={`/manage/posts/${post.id}/edit`}>
                      {post.title}
                    </Link>
                  </td>
                  <td>
                    {post.published ? (
                      <span className="status-tag status-tag--published">公開中</span>
                    ) : (
                      <span className="status-tag status-tag--draft">下書き</span>
                    )}
                  </td>
                  <td>{formatDate(post.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
