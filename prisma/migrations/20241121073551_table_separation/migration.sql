/*
  Warnings:

  - You are about to drop the column `account_created` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `approver_id` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `days_off_remain` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `is_approver` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `approver_id` on the `monthly_request` table. All the data in the column will be lost.
  - You are about to drop the column `approver_id` on the `pto_request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_key]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_key` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor_id` to the `monthly_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor_id` to the `pto_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_approver_id_fkey";

-- DropForeignKey
ALTER TABLE "monthly_request" DROP CONSTRAINT "monthly_request_approver_id_fkey";

-- DropForeignKey
ALTER TABLE "pto_request" DROP CONSTRAINT "pto_request_approver_id_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "account_created",
DROP COLUMN "approver_id",
DROP COLUMN "days_off_remain",
DROP COLUMN "is_admin",
DROP COLUMN "is_approver",
ADD COLUMN     "auth_key" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "supervisor_id" INTEGER;

-- AlterTable
ALTER TABLE "attendance_record" ADD COLUMN     "special_pto" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "monthly_request" DROP COLUMN "approver_id",
ADD COLUMN     "supervisor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pto_request" DROP COLUMN "approver_id",
ADD COLUMN     "supervisor_id" INTEGER NOT NULL,
ALTER COLUMN "all_day" SET DEFAULT false;

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "special_pto_request" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "supervisor_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "special_pto_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privileges" (
    "account_id" INTEGER NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_supervisor" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "pto" (
    "account_id" INTEGER NOT NULL,
    "remaining_pto" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "special_pto" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "special_pto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "privileges_account_id_key" ON "privileges"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "pto_account_id_key" ON "pto"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_auth_key_key" ON "account"("auth_key");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pto_request" ADD CONSTRAINT "pto_request_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_pto_request" ADD CONSTRAINT "special_pto_request_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_pto_request" ADD CONSTRAINT "special_pto_request_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_request" ADD CONSTRAINT "monthly_request_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privileges" ADD CONSTRAINT "privileges_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pto" ADD CONSTRAINT "pto_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_pto" ADD CONSTRAINT "special_pto_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
