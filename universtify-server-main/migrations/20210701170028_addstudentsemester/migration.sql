/*
  Warnings:

  - You are about to drop the column `semesterId` on the `FinishedCourses` table. All the data in the column will be lost.
  - You are about to drop the `_SemesterToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FinishedCourses" DROP CONSTRAINT "FinishedCourses_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "_SemesterToStudent" DROP CONSTRAINT "_SemesterToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_SemesterToStudent" DROP CONSTRAINT "_SemesterToStudent_B_fkey";

-- AlterTable
ALTER TABLE "FinishedCourses" DROP COLUMN "semesterId",
ADD COLUMN     "studentSemestersId" INTEGER;

-- DropTable
DROP TABLE "_SemesterToStudent";

-- CreateTable
CREATE TABLE "StudentSemesters" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "semesterId" INTEGER,
    "studentId" INTEGER,
    "semesterGPA" INTEGER,
    "creditHoures" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FinishedCourses" ADD FOREIGN KEY ("studentSemestersId") REFERENCES "StudentSemesters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesters" ADD FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemesters" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
