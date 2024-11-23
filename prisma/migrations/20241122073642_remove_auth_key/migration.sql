/*
  Warnings:

  - You are about to drop the column `auth_key` on the `account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "account_auth_key_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "auth_key";
