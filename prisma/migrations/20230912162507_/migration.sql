-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordReseExpires" TIMESTAMP(3),
ADD COLUMN     "passwordReseToken" TEXT;
