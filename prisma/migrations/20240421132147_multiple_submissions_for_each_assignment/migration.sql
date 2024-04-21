/*
  Warnings:

  - You are about to drop the column `isSubmitted` on the `userAssignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userAssignment" DROP COLUMN "isSubmitted";

-- CreateTable
CREATE TABLE "submissionDetails" (
    "id" TEXT NOT NULL,
    "userAssignmentId" TEXT NOT NULL,
    "submissionLink" TEXT,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submissionDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submissionDetails" ADD CONSTRAINT "submissionDetails_userAssignmentId_fkey" FOREIGN KEY ("userAssignmentId") REFERENCES "userAssignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
