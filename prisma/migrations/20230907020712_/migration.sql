/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `spend_debit_card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "spend_debit_card" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "profile";
