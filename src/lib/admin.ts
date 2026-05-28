import { auth } from "@/auth";

/** Emails permitted to author blog posts, from the ADMIN_EMAILS env var. */
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return adminEmails().includes(email.toLowerCase());
}

/**
 * Returns the current session only if the user is an authorized author.
 * Use in /manage pages and post mutations. Returns null otherwise.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return null;
  }
  return session;
}
