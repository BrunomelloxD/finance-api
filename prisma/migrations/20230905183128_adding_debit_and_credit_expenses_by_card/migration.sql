/*
  Warnings:

  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_userId_fkey";

-- DropTable
DROP TABLE "cards";

-- CreateTable
CREATE TABLE "spend_debit_card" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "spend_debit_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spend_credit_card" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "spend_credit_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "final_code" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "spend_debit_card_id_key" ON "spend_debit_card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "spend_credit_card_id_key" ON "spend_credit_card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "card_id_key" ON "card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "card_final_code_key" ON "card"("final_code");

-- AddForeignKey
ALTER TABLE "spend_debit_card" ADD CONSTRAINT "spend_debit_card_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spend_credit_card" ADD CONSTRAINT "spend_credit_card_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
