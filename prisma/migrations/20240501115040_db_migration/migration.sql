/*
  Warnings:

  - You are about to drop the column `userId` on the `Attendance` table. All the data in the column will be lost.
  - The `data` column on the `Attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `AssignedMentors` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentorUsername` to the `EnrolledUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignedMentors" DROP CONSTRAINT "AssignedMentors_courseId_fkey";

-- DropForeignKey
ALTER TABLE "AssignedMentors" DROP CONSTRAINT "AssignedMentors_enrolledUsername_courseId_fkey";

-- DropForeignKey
ALTER TABLE "AssignedMentors" DROP CONSTRAINT "AssignedMentors_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_userId_fkey";

-- DropIndex
DROP INDEX "Attendance_userId_key";

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "maxSubmissions" INTEGER DEFAULT 1;

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "data",
ADD COLUMN     "data" JSONB[];

-- AlterTable
ALTER TABLE "EnrolledUsers" ADD COLUMN     "mentorUsername" TEXT NOT NULL;

-- DropTable
DROP TABLE "AssignedMentors";

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_username_key" ON "Attendance"("username");

-- AddForeignKey
ALTER TABLE "EnrolledUsers" ADD CONSTRAINT "EnrolledUsers_mentorUsername_fkey" FOREIGN KEY ("mentorUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
