-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "numericalLastTermGPA" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentSemester" ALTER COLUMN "semesterGPA" SET DEFAULT 4;
