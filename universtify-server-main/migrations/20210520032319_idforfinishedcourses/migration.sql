/*
  Warnings:

  - The primary key for the `FinishedCourses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Course.courseCode_unique";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "courseCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FinishedCourses" DROP CONSTRAINT "FinishedCourses_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
