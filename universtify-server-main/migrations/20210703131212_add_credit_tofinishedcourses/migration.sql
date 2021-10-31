-- AlterTable
ALTER TABLE "FinishedCourses" ADD COLUMN     "credit" INTEGER;

-- AlterTable
ALTER TABLE "StudentSemester" ALTER COLUMN "semesterGPA" SET DATA TYPE DOUBLE PRECISION;
