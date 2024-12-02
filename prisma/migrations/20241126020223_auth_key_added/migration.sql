/*
  Warnings:

  - A unique constraint covering the columns `[auth_key]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_company_id_fkey";

-- DropForeignKey
ALTER TABLE "privileges" DROP CONSTRAINT "privileges_account_id_fkey";

-- DropForeignKey
ALTER TABLE "pto" DROP CONSTRAINT "pto_account_id_fkey";

-- DropForeignKey
ALTER TABLE "special_pto" DROP CONSTRAINT "special_pto_account_id_fkey";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "auth_key" TEXT,
ADD COLUMN     "language_preference" TEXT NOT NULL DEFAULT 'en',
ALTER COLUMN "last_login" DROP NOT NULL,
ALTER COLUMN "last_login" DROP DEFAULT;

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "company_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_auth_key_key" ON "account"("auth_key");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pto" ADD CONSTRAINT "pto_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_pto" ADD CONSTRAINT "special_pto_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
