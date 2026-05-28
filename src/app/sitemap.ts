import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

// Generated per-request so newly published posts appear immediately and the
// build never requires a database connection (mirrors the blog pages).
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    postRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.id}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Database unavailable — still serve the static routes.
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}
