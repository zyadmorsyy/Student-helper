/*
  Warnings:

  - You are about to drop the column `semester` on the `FinishedCourses` table. All the data in the column will be lost.
  - You are about to drop the column `semester` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SemesterType" AS ENUM ('FALL', 'SPRING', 'SUMMER');

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "semesterId" INTEGER;

-- AlterTable
ALTER TABLE "FinishedCourses" DROP COLUMN "semester",
ADD COLUMN     "semesterId" INTEGER;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "semester";

-- DropEnum
DROP TYPE "Semester";

-- CreateTable
CREATE TABLE "Semester" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "SemesterType" NOT NULL DEFAULT E'FALL',
    "year" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT E'current',
    "coordinatorId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToSemester" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SemesterToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToSemester_AB_unique" ON "_CourseToSemester"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToSemester_B_index" ON "_CourseToSemester"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SemesterToStudent_AB_unique" ON "_SemesterToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_SemesterToStudent_B_index" ON "_SemesterToStudent"("B");

-- AddForeignKey
ALTER TABLE "Semester" ADD FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedCourses" ADD FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToSemester" ADD FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToSemester" ADD FOREIGN KEY ("B") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SemesterToStudent" ADD FOREIGN KEY ("A") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SemesterToStudent" ADD FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
