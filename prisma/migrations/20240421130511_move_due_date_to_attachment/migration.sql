/*
  Warnings:

  - You are about to drop the column `dueDate` on the `userAssignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "dueDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "userAssignment" DROP COLUMN "dueDate";
