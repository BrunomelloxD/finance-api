/*
  Warnings:

  - Changed the type of `final_code` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "cards_userId_key";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "final_code",
ADD COLUMN     "final_code" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_final_code_key" ON "cards"("final_code");
