/*
  Warnings:

  - The primary key for the `post_reactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `post_reactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post_reactions" DROP CONSTRAINT "post_reactions_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "post_reactions_pkey" PRIMARY KEY ("user_id", "post_id");
