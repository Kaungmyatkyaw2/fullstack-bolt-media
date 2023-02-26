/*
  Warnings:

  - You are about to drop the column `greeting` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_categoryTotweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_categoryTotweet" DROP CONSTRAINT "_categoryTotweet_A_fkey";

-- DropForeignKey
ALTER TABLE "_categoryTotweet" DROP CONSTRAINT "_categoryTotweet_B_fkey";

-- DropForeignKey
ALTER TABLE "tweet" DROP CONSTRAINT "tweet_author_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "greeting";

-- DropTable
DROP TABLE "_categoryTotweet";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "tweet";

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_reactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "post_reactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_reactions" ADD CONSTRAINT "post_reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_reactions" ADD CONSTRAINT "post_reactions_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
