import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/PostForm";
import { updatePost, deletePost } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  const action = updatePost.bind(null, post.id);
  const remove = deletePost.bind(null, post.id);

  return (
    <>
      <div className="manage__head">
        <h1>記事を編集</h1>
        <div style={{ display: "flex", gap: "var(--sp-3)", alignItems: "center" }}>
          {post.published ? (
            <Link
              className="link-arrow"
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener"
            >
              公開ページを見る
            </Link>
          ) : null}
          <form action={remove}>
            <button
              className="btn btn--ghost btn--sm"
              type="submit"
              style={{ color: "#a4282d", borderColor: "#f5c2c2" }}
            >
              削除
            </button>
          </form>
        </div>
      </div>

      <PostForm
        action={action}
        submitLabel="更新する"
        defaultValues={{
          title: post.title,
          content: post.content,
          published: post.published,
          category: post.category,
        }}
      />
    </>
  );
}
