"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { s3, s3Config } from "@/lib/s3";
import { isPostCategory, type PostCategory } from "@/lib/categories";

export type PostFormState = { error?: string };

/** Image MIME types we accept for upload, mapped to their file extension. */
const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB

export type UploadUrlResult =
  | { ok: true; uploadUrl: string; publicUrl: string }
  | { ok: false; error: string };

/**
 * Issues a short-lived presigned PUT URL so the browser can upload an image
 * straight to S3, plus the CDN URL to embed in the post body. Admin-only; the
 * presigned URL pins Content-Type so the client can't swap in another type.
 */
export async function createUploadUrl(input: {
  contentType: string;
  size: number;
}): Promise<UploadUrlResult> {
  const session = await requireAdmin();
  if (!session) {
    return { ok: false, error: "権限がありません。再度ログインしてください。" };
  }

  const ext = ALLOWED_IMAGE_TYPES[input.contentType];
  if (!ext) {
    return {
      ok: false,
      error: "対応していない画像形式です（JPEG / PNG / WebP / GIF / AVIF）。",
    };
  }
  if (!Number.isFinite(input.size) || input.size <= 0) {
    return { ok: false, error: "ファイルサイズが不正です。" };
  }
  if (input.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "画像は10MBまでアップロードできます。" };
  }

  const config = s3Config();
  if (!config) {
    return {
      ok: false,
      error: "画像アップロードが未設定です。管理者にお問い合わせください。",
    };
  }

  // Object key: jkk/<epoch-ms><uuid>.<ext>
  //   e.g. jkk/1774442069351368996ec-bb2e-46e1-9b7c-63b161475de4.jpg
  // The millisecond timestamp keeps listings roughly chronological; the UUID
  // guarantees uniqueness within the same millisecond.
  const key = `jkk/${Date.now()}${randomUUID()}.${ext}`;

  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      ContentType: input.contentType,
    }),
    { expiresIn: 60 },
  );

  return { ok: true, uploadUrl, publicUrl: `${config.cdnBaseUrl}/${key}` };
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
