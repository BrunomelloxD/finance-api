/*
  Warnings:

  - Added the required column `description` to the `spend_credit_card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `spend_debit_card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "spend_credit_card" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "spend_debit_card" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "spend_debit_card" ADD CONSTRAINT "spend_debit_card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
