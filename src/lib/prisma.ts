import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createClient() {
  const raw = process.env.DATABASE_URL ?? "";

  let schema = "public";
  let isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(raw);
  let connectionString = raw;

  try {
    const url = new URL(raw);
    // `?schema=` is Prisma-specific; pass it to the adapter explicitly so
    // generated queries target the right schema.
    schema = url.searchParams.get("schema") ?? "public";
    isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    // The pg driver VERIFIES the cert when it sees `sslmode` in the string,
    // which fails against AWS RDS (Amazon CA isn't in the trust store). Strip
    // it and control SSL explicitly below. The Prisma CLI still reads the raw
    // DATABASE_URL (with sslmode) for migrations.
    url.searchParams.delete("sslmode");
    connectionString = url.toString();
  } catch {
    // keep raw connection string
  }

  // Local Postgres needs no SSL. RDS needs SSL but without CA verification.
  const ssl = isLocal ? undefined : { rejectUnauthorized: false };

  // Cap connection acquisition. Without this the pg default is 0 (wait forever),
  // so an unreachable DB during `next build` (e.g. RDS security group blocking
  // Vercel's build IPs) hangs the build indefinitely instead of throwing. On
  // timeout the query rejects and callers' try/catch fall back to empty data.
  const adapter = new PrismaPg(
    { connectionString, ssl, connectionTimeoutMillis: 10_000 },
    { schema },
  );
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
