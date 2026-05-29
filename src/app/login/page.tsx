import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";

const ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked:
    "このメールアドレスは別のログイン方法で登録されています。",
  AccessDenied: "アクセスが拒否されました。",
  Configuration:
    "認証設定に問題があります。管理者にお問い合わせください。",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;
  const target = callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/manage";

  const session = await auth();
  if (session?.user) {
    redirect(target);
  }

  return (
    <main className="auth-wrap">
      <div className="auth-card">
        <Link className="jkk-logo" href="/">
          <span className="jkk-logo__mark">JKK</span>
          <span>株式会社JKK</span>
        </Link>

        <h1>管理画面ログイン</h1>
        <p>
          新着情報記事の作成・編集には、許可されたGoogleアカウントでの
          <br />
          ログインが必要です。
        </p>

        {error ? (
          <div className="auth-error" role="alert">
            {ERROR_MESSAGES[error] ?? "ログインに失敗しました。もう一度お試しください。"}
          </div>
        ) : null}

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: target });
          }}
        >
          <button className="btn btn--google btn--lg" type="submit">
            <GoogleIcon />
            Googleでログイン
          </button>
        </form>

        <p className="auth-note">
          ログインすると<Link href="/">サイトのご利用規約</Link>に同意したものとみなされます。
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}
