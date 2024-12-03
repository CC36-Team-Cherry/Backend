-- DropForeignKey
ALTER TABLE "attendance_record" DROP CONSTRAINT "attendance_record_account_id_fkey";

-- DropForeignKey
ALTER TABLE "monthly_request" DROP CONSTRAINT "monthly_request_account_id_fkey";

-- DropForeignKey
ALTER TABLE "pto_request" DROP CONSTRAINT "pto_request_account_id_fkey";

-- DropForeignKey
ALTER TABLE "special_pto_request" DROP CONSTRAINT "special_pto_request_account_id_fkey";

-- AddForeignKey
ALTER TABLE "attendance_record" ADD CONSTRAINT "attendance_record_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pto_request" ADD CONSTRAINT "pto_request_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_pto_request" ADD CONSTRAINT "special_pto_request_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_request" ADD CONSTRAINT "monthly_request_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
