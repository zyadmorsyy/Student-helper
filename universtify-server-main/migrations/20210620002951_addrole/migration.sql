-- AlterTable
ALTER TABLE "Coordinator" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'coordinator';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'student';

-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'supervisor';
