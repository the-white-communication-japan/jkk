"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { PostFormState } from "@/app/manage/posts/actions";
import { POST_CATEGORIES, type PostCategory } from "@/lib/categories";

type Action = (
  prev: PostFormState,
  formData: FormData,
) => Promise<PostFormState>;

export default function PostForm({
  action,
  submitLabel,
  defaultValues,
}: {
  action: Action;
  submitLabel: string;
  defaultValues?: {
    title?: string;
    content?: string;
    published?: boolean;
    category?: PostCategory;
  };
}) {
  const [state, formAction, pending] = useActionState<PostFormState, FormData>(
    action,
    {},
  );

  return (
    <form action={formAction} className="post-form">
      {state.error ? <div className="form-error">{state.error}</div> : null}

      <div className="field">
        <label htmlFor="category">種別</label>
        <span className="hint">公開ブログ上で記事の種類として表示・絞り込みに使われます。</span>
        <div className="seg" role="radiogroup" aria-label="記事の種別">
          {POST_CATEGORIES.map((c, i) => {
            const checked =
              defaultValues?.category != null
                ? defaultValues.category === c.value
                : i === 0;
            return (
              <label key={c.value} className="seg__option">
                <input
                  type="radio"
                  name="category"
                  value={c.value}
                  defaultChecked={checked}
                />
                <span>{c.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="field">
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues?.title ?? ""}
          placeholder="例：Googleビジネスプロフィール、最初にやるべき3つの設定"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="content">本文</label>
        <span className="hint">
          Markdown記法に対応：見出しは ## 、箇条書きは - 、リンクは [文字](URL)、強調は **太字**。
        </span>
        <textarea
          id="content"
          name="content"
          defaultValue={defaultValues?.content ?? ""}
          placeholder="ここに本文を入力します。"
          required
        />
      </div>

      <div className="field field--check">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={defaultValues?.published ?? false}
        />
        <label htmlFor="published">すぐに公開する（オフにすると下書き保存）</label>
      </div>

      <div className="form-actions">
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? "保存中…" : submitLabel}
        </button>
        <Link className="btn btn--ghost" href="/manage">
          キャンセル
        </Link>
      </div>
    </form>
  );
}
