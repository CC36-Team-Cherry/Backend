/*
  Warnings:

  - You are about to drop the column `salted_hash` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_team_id_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "salted_hash",
DROP COLUMN "username",
ALTER COLUMN "last_login" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "team_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
