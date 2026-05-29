import { S3Client } from "@aws-sdk/client-s3";

const globalForS3 = globalThis as unknown as {
  s3?: S3Client;
};

export type S3Config = {
  bucket: string;
  /** CloudFront (or other CDN) origin, no trailing slash. */
  cdnBaseUrl: string;
};

/** Returns null when S3 env vars aren't configured (e.g. local dev). */
export function s3Config(): S3Config | null {
  const bucket = process.env.S3_BUCKET;
  const cdnBaseUrl = process.env.S3_CDN_BASE_URL;
  if (!bucket || !cdnBaseUrl) return null;
  return { bucket, cdnBaseUrl: cdnBaseUrl.replace(/\/+$/, "") };
}

function createClient(): S3Client {
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  return new S3Client({
    region: process.env.S3_REGION,
    // Explicit keys for Vercel; fall back to the SDK's default provider chain
    // (e.g. an attached IAM role) when they're absent.
    credentials:
      accessKeyId && secretAccessKey
        ? { accessKeyId, secretAccessKey }
        : undefined,
  });
}

export const s3 = globalForS3.s3 ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForS3.s3 = s3;
}
