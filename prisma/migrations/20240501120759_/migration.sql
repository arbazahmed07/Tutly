/*
  Warnings:

  - A unique constraint covering the columns `[username,courseId,mentorUsername]` on the table `EnrolledUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EnrolledUsers" DROP CONSTRAINT "EnrolledUsers_mentorUsername_fkey";

-- DropIndex
DROP INDEX "EnrolledUsers_username_courseId_key";

-- AlterTable
ALTER TABLE "EnrolledUsers" ALTER COLUMN "mentorUsername" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EnrolledUsers_username_courseId_mentorUsername_key" ON "EnrolledUsers"("username", "courseId", "mentorUsername");

-- AddForeignKey
ALTER TABLE "EnrolledUsers" ADD CONSTRAINT "EnrolledUsers_mentorUsername_fkey" FOREIGN KEY ("mentorUsername") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
