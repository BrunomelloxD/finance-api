/*
  Warnings:

  - You are about to drop the `passowrd_reset_token` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `spend_credit_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `spend_debit_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "passowrd_reset_token" DROP CONSTRAINT "passowrd_reset_token_userId_fkey";

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "spend_credit_card" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "spend_debit_card" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "token" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "passowrd_reset_token";
