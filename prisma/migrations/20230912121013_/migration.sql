-- CreateTable
CREATE TABLE "passowrd_reset_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passowrd_reset_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passowrd_reset_token_id_key" ON "passowrd_reset_token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "passowrd_reset_token_token_key" ON "passowrd_reset_token"("token");

-- AddForeignKey
ALTER TABLE "passowrd_reset_token" ADD CONSTRAINT "passowrd_reset_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
