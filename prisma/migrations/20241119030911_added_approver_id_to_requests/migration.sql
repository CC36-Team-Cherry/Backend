/*
  Warnings:

  - Added the required column `approver_id` to the `monthly_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `monthly_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approver_id` to the `pto_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monthly_request" ADD COLUMN     "approver_id" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pto_request" ADD COLUMN     "approver_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pto_request" ADD CONSTRAINT "pto_request_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_request" ADD CONSTRAINT "monthly_request_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
