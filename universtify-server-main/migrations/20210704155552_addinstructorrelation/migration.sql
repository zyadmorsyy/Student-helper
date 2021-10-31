/*
  Warnings:

  - You are about to drop the column `instructorName` on the `FinishedCourses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "instructorId" INTEGER;

-- AlterTable
ALTER TABLE "FinishedCourses" DROP COLUMN "instructorName",
ADD COLUMN     "instructorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("instructorId") REFERENCES "Supervisor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedCourses" ADD FOREIGN KEY ("instructorId") REFERENCES "Supervisor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
