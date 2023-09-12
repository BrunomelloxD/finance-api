/*
  Warnings:

  - You are about to drop the column `passwordReseExpires` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordReseExpires",
DROP COLUMN "token",
ADD COLUMN     "passwordResetExpires" TIMESTAMP(3);
