import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import ManageNav from "@/components/ManageNav";

export default async function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Middleware already blocks anonymous access, but guard here too.
  if (!session?.user) {
    redirect("/login?callbackUrl=/manage");
  }

  // Signed in with Google but not on the author allowlist.
  if (!isAdminEmail(session.user.email)) {
    return (
      <main className="auth-wrap">
        <div className="auth-card">
          <Link className="jkk-logo" href="/">
            <span className="jkk-logo__mark">JKK</span>
            <span>株式会社JKK</span>
          </Link>
          <h1>アクセス権限がありません</h1>
          <p>
            <strong>{session.user.email}</strong>
            <br />
            このアカウントにはブログ管理権限がありません。
            <br />
            権限が必要な場合は管理者にご連絡ください。
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="btn btn--ghost btn--lg" type="submit">
              別のアカウントでログイン
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="manage">
      <aside className="manage__side">
        <Link className="jkk-logo" href="/manage">
          <span className="jkk-logo__mark">JKK</span>
          <span>管理画面</span>
        </Link>

        <ManageNav />

        <div className="manage__user">
          <strong>{session.user.name ?? "管理者"}</strong>
          <span>{session.user.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="manage__signout" type="submit">
              ログアウト
            </button>
          </form>
        </div>
      </aside>

      <div className="manage__main">{children}</div>
    </div>
  );
}
