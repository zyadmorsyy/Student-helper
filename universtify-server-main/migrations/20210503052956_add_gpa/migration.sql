/*
  Warnings:

  - You are about to drop the column `program` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "major" TEXT,
ADD COLUMN     "level" TEXT;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'in review';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "program",
ADD COLUMN     "GPA" INTEGER,
ADD COLUMN     "lastTermGPA" INTEGER;

-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "phone" TEXT;
