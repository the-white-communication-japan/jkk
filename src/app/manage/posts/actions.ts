"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { isPostCategory, type PostCategory } from "@/lib/categories";

export type PostFormState = { error?: string };

function makeExcerpt(content: string): string {
  return content
    .replace(/[#>*_`~[\]()!-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

export async function createPost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await requireAdmin();
  if (!session) return { error: "権限がありません。再度ログインしてください。" };

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";
  const categoryRaw = formData.get("category");
  const category: PostCategory = isPostCategory(categoryRaw) ? categoryRaw : "NOTICE";

  if (!title) return { error: "タイトルを入力してください。" };
  if (!content) return { error: "本文を入力してください。" };

  await prisma.post.create({
    data: {
      title,
      content,
      category,
      excerpt: makeExcerpt(content),
      published,
      authorId: session.user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/manage");
  redirect("/manage");
}

export async function updatePost(
  id: number,
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await requireAdmin();
  if (!session) return { error: "権限がありません。再度ログインしてください。" };

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";
  const categoryRaw = formData.get("category");
  const category: PostCategory = isPostCategory(categoryRaw) ? categoryRaw : "NOTICE";

  if (!title) return { error: "タイトルを入力してください。" };
  if (!content) return { error: "本文を入力してください。" };

  await prisma.post.update({
    where: { id },
    data: { title, content, category, excerpt: makeExcerpt(content), published },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/manage");
  redirect("/manage");
}

export async function deletePost(id: number): Promise<void> {
  const session = await requireAdmin();
  if (!session) redirect("/login?callbackUrl=/manage");

  await prisma.post.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/manage");
  redirect("/manage");
}
