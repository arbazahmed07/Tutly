-- AlterTable
ALTER TABLE "submission" ALTER COLUMN "editTime" SET DEFAULT (NOW() + '15 minutes'::interval);
