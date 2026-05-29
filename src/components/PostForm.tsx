"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  createUploadUrl,
  type PostFormState,
} from "@/app/manage/posts/actions";
import { POST_CATEGORIES, type PostCategory } from "@/lib/categories";

type Action = (
  prev: PostFormState,
  formData: FormData,
) => Promise<PostFormState>;

const MARKDOWN_LEGEND: { syntax: string; sample: string }[] = [
  { syntax: "## 大見出し", sample: "## 大見出し" },
  { syntax: "### 小見出し", sample: "### 小見出し" },
  { syntax: "**太字**", sample: "これは **太字** です" },
  { syntax: "- 箇条書き", sample: "- 項目A\n- 項目B" },
  { syntax: "1. 番号付き", sample: "1. 一つ目\n2. 二つ目" },
  { syntax: "[文字](URL)", sample: "[当社サイト](https://example.com)" },
  { syntax: "> 引用", sample: "> ここが引用文になります" },
  { syntax: "~~取り消し線~~", sample: "~~取り消し線~~" },
  { syntax: "`コード`", sample: "`inline code`" },
  { syntax: "--- (区切り線)", sample: "上の文\n\n---\n\n下の文" },
];

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
  const [content, setContent] = useState(defaultValues?.content ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function insertAtCursor(snippet: string) {
    const ta = textareaRef.current;
    if (ta && !showPreview) {
      const start = ta.selectionStart ?? content.length;
      const end = ta.selectionEnd ?? content.length;
      setContent(content.slice(0, start) + snippet + content.slice(end));
      requestAnimationFrame(() => {
        ta.focus();
        const pos = start + snippet.length;
        ta.setSelectionRange(pos, pos);
      });
    } else {
      setContent((c) => c + snippet);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // let the same file be re-selected
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const res = await createUploadUrl({
        contentType: file.type,
        size: file.size,
      });
      if (!res.ok) {
        setUploadError(res.error);
        return;
      }
      const put = await fetch(res.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!put.ok) {
        setUploadError("アップロードに失敗しました。時間をおいて再度お試しください。");
        return;
      }
      const alt = file.name.replace(/\.[^.]+$/, "");
      insertAtCursor(`\n![${alt}](${res.publicUrl})\n`);
    } catch {
      setUploadError("アップロード中にエラーが発生しました。");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="post-form">
      {state.error ? <div className="form-error">{state.error}</div> : null}

      <div className="field">
        <label htmlFor="category">種別</label>
        <span className="hint">公開ページ上で記事の種類として表示・絞り込みに使われます。</span>
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
        <div className="field__head">
          <label htmlFor="content">本文</label>
          <div className="editor-tools">
            <button
              type="button"
              className="editor-toggle"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "アップロード中…" : "画像を挿入"}
            </button>
            <button
              type="button"
              className={`editor-toggle${showPreview ? " is-active" : ""}`}
              onClick={() => setShowPreview((v) => !v)}
              aria-pressed={showPreview}
            >
              {showPreview ? "編集に戻る" : "プレビュー"}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            hidden
            onChange={handleImageUpload}
          />
        </div>
        <span className="hint">
          Markdown記法に対応。カーソル位置に画像を挿入できます（下の早見表も参考に）。
        </span>
        {uploadError ? (
          <span className="field-upload-error">{uploadError}</span>
        ) : null}
        <textarea
          ref={textareaRef}
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ここに本文を入力します。"
          required
          hidden={showPreview}
        />
        {showPreview ? (
          <div className="editor-preview">
            <span className="editor-preview__caption">プレビュー</span>
            <div className="article__body">
              {content.trim() ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              ) : (
                <p className="editor-preview__empty">
                  本文がまだ入力されていません。
                </p>
              )}
            </div>
          </div>
        ) : null}

        <details className="md-legend">
          <summary>Markdown早見表（書き方と表示の例）</summary>
          <table className="md-legend__table">
            <thead>
              <tr>
                <th>こう書くと…</th>
                <th>こう表示されます</th>
              </tr>
            </thead>
            <tbody>
              {MARKDOWN_LEGEND.map((row) => (
                <tr key={row.syntax}>
                  <td>
                    <code>{row.syntax}</code>
                  </td>
                  <td className="article__body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {row.sample}
                    </ReactMarkdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
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
