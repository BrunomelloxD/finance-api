/*
  Warnings:

  - You are about to drop the column `passwordReseToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordReseToken",
ADD COLUMN     "passwordResetToken" TEXT;
