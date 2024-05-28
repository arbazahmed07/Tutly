/*
  Warnings:

  - A unique constraint covering the columns `[username,classId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Attendance_username_key";

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_username_classId_key" ON "Attendance"("username", "classId");
