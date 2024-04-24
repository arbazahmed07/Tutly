/*
  Warnings:

  - You are about to drop the column `classId` on the `Doubt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doubt" DROP CONSTRAINT "Doubt_classId_fkey";

-- AlterTable
ALTER TABLE "Doubt" DROP COLUMN "classId",
ADD COLUMN     "courseId" TEXT;

-- AddForeignKey
ALTER TABLE "Doubt" ADD CONSTRAINT "Doubt_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
