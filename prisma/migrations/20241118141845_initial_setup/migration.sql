-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "is_approver" BOOLEAN NOT NULL,
    "approver_id" INTEGER,
    "company_id" INTEGER NOT NULL,
    "days_off_remain" INTEGER NOT NULL,
    "account_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3) NOT NULL,
    "join_date" TIMESTAMP(3) NOT NULL,
    "leave_date" TIMESTAMP(3),
    "username" TEXT NOT NULL,
    "salted_hash" TEXT,
    "role" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_record" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "punch_in" TIMESTAMP(3) NOT NULL,
    "punch_out" TIMESTAMP(3) NOT NULL,
    "break_amount" DOUBLE PRECISION NOT NULL,
    "totalHours" DOUBLE PRECISION NOT NULL,
    "absence" BOOLEAN NOT NULL DEFAULT false,
    "full_pto" BOOLEAN NOT NULL,
    "half_pto" BOOLEAN NOT NULL,

    CONSTRAINT "attendance_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pto_request" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "day_start" TIMESTAMP(3),
    "day_end" TIMESTAMP(3),
    "day" TIMESTAMP(3),
    "all_day" BOOLEAN NOT NULL,
    "hour_start" TIMESTAMP(3),
    "hour_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pto_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyRequest" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_record" ADD CONSTRAINT "attendance_record_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pto_request" ADD CONSTRAINT "pto_request_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyRequest" ADD CONSTRAINT "MonthlyRequest_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
