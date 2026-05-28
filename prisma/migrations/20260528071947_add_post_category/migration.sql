-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('NOTICE', 'NEWS', 'UPDATE');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategory" NOT NULL DEFAULT 'NOTICE';

-- CreateIndex
CREATE INDEX "Post_category_published_createdAt_idx" ON "Post"("category", "published", "createdAt");
