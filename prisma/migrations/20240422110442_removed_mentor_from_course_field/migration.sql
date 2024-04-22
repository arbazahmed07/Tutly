/*
  Warnings:

  - You are about to drop the column `courseId` on the `AssignedMentors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mentorId,enrolledUserId]` on the table `AssignedMentors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AssignedMentors" DROP CONSTRAINT "AssignedMentors_courseId_fkey";

-- DropIndex
DROP INDEX "AssignedMentors_mentorId_enrolledUserId_courseId_key";

-- AlterTable
ALTER TABLE "AssignedMentors" DROP COLUMN "courseId";

-- CreateIndex
CREATE UNIQUE INDEX "AssignedMentors_mentorId_enrolledUserId_key" ON "AssignedMentors"("mentorId", "enrolledUserId");
