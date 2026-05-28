"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { isPostCategory, type PostCategory } from "@/lib/categories";

export type PostFormState = { error?: string };

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || "post";
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base;
  let n = 1;
  // Append -2, -3, … until the slug is free (ignoring the post being edited).
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

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

  const slug = await uniqueSlug(slugify(title));

  await prisma.post.create({
    data: {
      title,
      content,
      slug,
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
  id: string,
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

  // Keep the slug stable across edits so published URLs don't break.
  await prisma.post.update({
    where: { id },
    data: { title, content, category, excerpt: makeExcerpt(content), published },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/manage");
  redirect("/manage");
}

export async function deletePost(id: string): Promise<void> {
  const session = await requireAdmin();
  if (!session) redirect("/login?callbackUrl=/manage");

  await prisma.post.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/manage");
  redirect("/manage");
}
