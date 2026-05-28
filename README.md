# 株式会社JKK — コーポレートサイト

Next.js (App Router) + TypeScript + PostgreSQL (Prisma) で構築した JKK のコーポレートサイトです。
トップページに加え、Googleログインで保護されたブログ管理画面と公開ブログを備えています。

## 技術スタック

| 領域 | 採用技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) / React 19 |
| 言語 | TypeScript |
| DB | PostgreSQL |
| ORM | Prisma 7（`prisma-client` ジェネレータ + `@prisma/adapter-pg`） |
| 認証 | Auth.js (NextAuth v5) — Google プロバイダ |
| Markdown | react-markdown + remark-gfm |
| デプロイ | Vercel |

## 主な画面

| URL | 内容 | アクセス |
|---|---|---|
| `/` | トップページ（看板→Web の集客導線） | 公開 |
| `/blog` | 公開ブログ一覧（種別フィルター付き、公開記事のみ） | 公開 |
| `/blog?type=notice\|news\|update` | 種別で絞り込み | 公開 |
| `/blog/[slug]` | ブログ記事（Markdown表示） | 公開 |
| `/login` | Googleログイン | 公開 |
| `/manage` | 記事一覧（管理） | 要ログイン＋許可メール |
| `/manage/posts/new` | 記事の新規作成 | 同上 |
| `/manage/posts/[id]/edit` | 記事の編集・削除 | 同上 |

`/manage/*` は `src/proxy.ts`（Next.js のプロキシ／旧 middleware）で未ログインを `/login` に転送し、
ログイン後も `ADMIN_EMAILS` に含まれるメールのみ編集できます。

## セットアップ（ローカル）

### 1. 依存関係

```bash
npm install
```

### 2. 環境変数

`.env.example` を `.env` にコピーして値を設定します。

```bash
cp .env.example .env
```

- `DATABASE_URL` — PostgreSQL接続文字列
- `AUTH_SECRET` — `openssl rand -base64 33` で生成
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — 下記「Google OAuth」を参照
- `ADMIN_EMAILS` — ブログを書ける管理者メール（カンマ区切り）

### 3. データベース

ローカルに PostgreSQL を用意し、マイグレーションを適用します。

```bash
createdb jkk_dev          # 既存DBを使う場合は不要
npx prisma migrate dev    # スキーマ適用＋クライアント生成
```

### 4. 開発サーバー

```bash
npm run dev
```

http://localhost:3000 を開きます。

## Google OAuth の設定

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. 「APIとサービス」→「OAuth 同意画面」を構成（外部／テスト or 本番）
3. 「認証情報」→「OAuth クライアント ID」→ アプリの種類「ウェブ アプリケーション」
4. **承認済みのリダイレクト URI** を追加：
   - 開発: `http://localhost:3000/api/auth/callback/google`
   - 本番: `https://<your-domain>/api/auth/callback/google`
5. 発行された クライアントID／シークレット を `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` に設定
6. ブログを書けるアカウントのメールを `ADMIN_EMAILS` に追加

> ログイン自体は許可されたGoogleアカウント以外でも可能ですが、`ADMIN_EMAILS` に
> 載っていないメールは `/manage` でアクセス拒否画面が表示されます。

## Vercel へのデプロイ

1. **データベース**：本番は **AWS RDS (PostgreSQL)** を使用します。RDS のエンドポイントを
   受け取ったら、次の形式で接続文字列を組み立てます（RDS は SSL 必須）：

   ```
   postgresql://<USER>:<PASSWORD>@<RDSエンドポイント>:5432/<DBNAME>?schema=public&sslmode=require
   ```

   - 例: `...@jkk-prod.abcd1234efgh.ap-northeast-1.rds.amazonaws.com:5432/jkk?schema=public&sslmode=require`
   - 自己署名証明書エラーが出る場合は `sslmode=no-verify` に変更。
   - サーバーレス（Vercel）からの接続が増える場合は、**RDS Proxy** か PgBouncer 経由の
     エンドポイントを使うと接続枯渇を防げます（`DATABASE_URL` をそのプール用エンドポイントにする）。
   - RDS の **セキュリティグループ** で Vercel からのインバウンド接続を許可してください
     （Vercel は固定IPではないため、RDS を公開＋SSL必須にするか、踏み台/Proxy を用意）。
2. Vercel のプロジェクト設定 → **Environment Variables** に以下を登録（上で作った `DATABASE_URL` を含む）：
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `ADMIN_EMAILS`
3. Google OAuth のリダイレクト URI に本番ドメインを追加（上記参照）。
4. デプロイ。`build` スクリプトが `prisma generate` を実行します
   （`package.json` の `postinstall` でも生成）。
5. **本番DBへのマイグレーション適用**（初回・スキーマ変更時）：

   ```bash
   DATABASE_URL="<本番のURL>" npx prisma migrate deploy
   ```

Auth.js v5 は Vercel 上でホスト名を自動的に信頼するため、`AUTH_URL` の指定は不要です。

## メモ

- ヒーローや各サービスカードの画像は SVG / グラデーションのプレースホルダーです。
  実写に差し替える場合は `src/components/HeroArt.tsx` と `globals.css` の `.photo--*` を置き換えてください。
- 「お知らせ」はブログに統合しました。記事は 3 種別（**お知らせ / ニュース / アップデート**＝
  `PostCategory` enum の `NOTICE / NEWS / UPDATE`）を持ち、作成時に選択、`/blog` で絞り込めます。
- トップページの「ブログ・お知らせ」セクションは、公開済みの最新記事を DB から表示します。
- ブログ記事は Markdown で保存・表示します（見出し `##`、箇条書き `-`、リンク `[text](url)`、強調 `**bold**` など）。
