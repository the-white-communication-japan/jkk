import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  // JWT sessions keep middleware edge-compatible; the adapter still persists
  // users and linked Google accounts in Postgres.
  session: { strategy: "jwt" },
});
