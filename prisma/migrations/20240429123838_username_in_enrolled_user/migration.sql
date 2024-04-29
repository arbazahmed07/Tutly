/*
  Warnings:

  - You are about to drop the column `courseId` on the `AssignedMentors` table. All the data in the column will be lost.
  - You are about to drop the column `folderTitle` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `EnrolledUsers` table. All the data in the column will be lost.
  - You are about to drop the `Attendence` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mentorId,enrolledUserId]` on the table `AssignedMentors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username,courseId]` on the table `EnrolledUsers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[submissionId,category]` on the table `Point` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `EnrolledUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignedMentors" DROP CONSTRAINT "AssignedMentors_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Attendence" DROP CONSTRAINT "Attendence_classId_fkey";

-- DropForeignKey
ALTER TABLE "Attendence" DROP CONSTRAINT "Attendence_userId_fkey";

-- DropForeignKey
ALTER TABLE "EnrolledUsers" DROP CONSTRAINT "EnrolledUsers_userId_fkey";

-- DropIndex
DROP INDEX "AssignedMentors_mentorId_enrolledUserId_courseId_key";

-- DropIndex
DROP INDEX "EnrolledUsers_userId_courseId_key";

-- AlterTable
ALTER TABLE "AssignedMentors" DROP COLUMN "courseId";

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "courseId" TEXT;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "folderTitle",
ADD COLUMN     "folderId" TEXT;

-- AlterTable
ALTER TABLE "EnrolledUsers" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "data" JSONB;

-- DropTable
DROP TABLE "Attendence";

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Folder',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "attendedDuration" INTEGER,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_userId_key" ON "Attendance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignedMentors_mentorId_enrolledUserId_key" ON "AssignedMentors"("mentorId", "enrolledUserId");

-- CreateIndex
CREATE UNIQUE INDEX "EnrolledUsers_username_courseId_key" ON "EnrolledUsers"("username", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Point_submissionId_category_key" ON "Point"("submissionId", "category");

-- AddForeignKey
ALTER TABLE "EnrolledUsers" ADD CONSTRAINT "EnrolledUsers_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
