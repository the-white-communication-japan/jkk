// Blog post categories. Values match the Prisma `PostCategory` enum
// ("NOTICE" | "NEWS" | "UPDATE"); kept as a plain union so this module is safe
// to import from both server and client components.

export type PostCategory = "NOTICE" | "NEWS" | "UPDATE";

export type CategoryMeta = {
  value: PostCategory;
  label: string; // Japanese display label
  slug: string; // URL filter value (?type=)
  badgeClass: string; // CSS modifier on .news-cat
};

export const POST_CATEGORIES: CategoryMeta[] = [
  { value: "NOTICE", label: "お知らせ", slug: "notice", badgeClass: "news-cat--info" },
  { value: "NEWS", label: "ブログ", slug: "news", badgeClass: "news-cat--service" },
  { value: "UPDATE", label: "アップデート", slug: "update", badgeClass: "news-cat--media" },
];

export function isPostCategory(value: unknown): value is PostCategory {
  return value === "NOTICE" || value === "NEWS" || value === "UPDATE";
}

export function categoryMeta(value: PostCategory): CategoryMeta {
  return POST_CATEGORIES.find((c) => c.value === value) ?? POST_CATEGORIES[0];
}

export function categoryFromSlug(slug?: string | null): PostCategory | undefined {
  return POST_CATEGORIES.find((c) => c.slug === slug)?.value;
}
