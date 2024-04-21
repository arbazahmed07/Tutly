/*
  Warnings:

  - You are about to drop the column `userAssignmentId` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the `submissionDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userAssignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_userAssignmentId_fkey";

-- DropForeignKey
ALTER TABLE "submissionDetails" DROP CONSTRAINT "submissionDetails_userAssignmentId_fkey";

-- DropForeignKey
ALTER TABLE "userAssignment" DROP CONSTRAINT "userAssignment_attachmentId_fkey";

-- DropForeignKey
ALTER TABLE "userAssignment" DROP CONSTRAINT "userAssignment_userId_fkey";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "userAssignmentId",
ADD COLUMN     "submissionId" TEXT;

-- DropTable
DROP TABLE "submissionDetails";

-- DropTable
DROP TABLE "userAssignment";

-- CreateTable
CREATE TABLE "submission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attachmentId" TEXT NOT NULL,
    "overallFeedback" TEXT,
    "submissionLink" TEXT,
    "submissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
