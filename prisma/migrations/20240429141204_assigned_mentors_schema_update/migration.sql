/*
  Warnings:

  - Added the required column `courseId` to the `AssignedMentors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignedMentors" DROP CONSTRAINT "AssignedMentors_enrolledUsername_fkey";

-- AlterTable
ALTER TABLE "AssignedMentors" ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AssignedMentors" ADD CONSTRAINT "AssignedMentors_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedMentors" ADD CONSTRAINT "AssignedMentors_enrolledUsername_courseId_fkey" FOREIGN KEY ("enrolledUsername", "courseId") REFERENCES "EnrolledUsers"("username", "courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
