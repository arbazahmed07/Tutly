/*
  Warnings:

  - You are about to drop the column `enrolledUserId` on the `AssignedMentors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mentorId,enrolledUsername]` on the table `AssignedMentors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enrolledUsername` to the `AssignedMentors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignedMentors" DROP CONSTRAINT "AssignedMentors_enrolledUserId_fkey";

-- DropIndex
DROP INDEX "AssignedMentors_mentorId_enrolledUserId_key";

-- AlterTable
ALTER TABLE "AssignedMentors" DROP COLUMN "enrolledUserId",
ADD COLUMN     "enrolledUsername" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AssignedMentors_mentorId_enrolledUsername_key" ON "AssignedMentors"("mentorId", "enrolledUsername");

-- AddForeignKey
ALTER TABLE "AssignedMentors" ADD CONSTRAINT "AssignedMentors_enrolledUsername_fkey" FOREIGN KEY ("enrolledUsername") REFERENCES "EnrolledUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
