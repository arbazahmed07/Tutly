/*
  Warnings:

  - You are about to drop the column `userId` on the `submission` table. All the data in the column will be lost.
  - Added the required column `enrolledUserId` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_userId_fkey";

-- AlterTable
ALTER TABLE "submission" DROP COLUMN "userId",
ADD COLUMN     "enrolledUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_enrolledUserId_fkey" FOREIGN KEY ("enrolledUserId") REFERENCES "EnrolledUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
