/*
  Warnings:

  - You are about to drop the column `studentSemestersId` on the `FinishedCourses` table. All the data in the column will be lost.
  - The `year` column on the `Semester` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `StudentSemesters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "FinishedCourses" DROP CONSTRAINT "FinishedCourses_studentSemestersId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSemesters" DROP CONSTRAINT "StudentSemesters_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSemesters" DROP CONSTRAINT "StudentSemesters_studentId_fkey";

-- AlterTable
ALTER TABLE "FinishedCourses" DROP COLUMN "studentSemestersId",
ADD COLUMN     "semesterId" INTEGER;

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER DEFAULT 2021;

-- DropTable
DROP TABLE "StudentSemesters";

-- CreateTable
CREATE TABLE "StudentSemester" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "semesterGPA" INTEGER,
    "creditDone" INTEGER DEFAULT 0,
    "creditHave" INTEGER DEFAULT 18,

    PRIMARY KEY ("studentId","semesterId")
);

-- AddForeignKey
ALTER TABLE "Enrollment" ADD FOREIGN KEY ("studentID", "semesterId") REFERENCES "StudentSemester"("studentId", "semesterId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedCourses" ADD FOREIGN KEY ("studentID", "semesterId") REFERENCES "StudentSemester"("studentId", "semesterId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemester" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSemester" ADD FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;
