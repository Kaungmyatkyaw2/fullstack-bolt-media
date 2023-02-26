/*
  Warnings:

  - Added the required column `greeting` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "greeting" TEXT NOT NULL,
ADD COLUMN     "password" INTEGER NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tweet" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_categoryTotweet" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_categoryTotweet_AB_unique" ON "_categoryTotweet"("A", "B");

-- CreateIndex
CREATE INDEX "_categoryTotweet_B_index" ON "_categoryTotweet"("B");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTotweet" ADD CONSTRAINT "_categoryTotweet_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTotweet" ADD CONSTRAINT "_categoryTotweet_B_fkey" FOREIGN KEY ("B") REFERENCES "tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
