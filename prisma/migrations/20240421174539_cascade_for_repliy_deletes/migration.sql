-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_doubtId_fkey";

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_doubtId_fkey" FOREIGN KEY ("doubtId") REFERENCES "Doubt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
