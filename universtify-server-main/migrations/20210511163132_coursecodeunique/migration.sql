/*
  Warnings:

  - A unique constraint covering the columns `[courseCode]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course.courseCode_unique" ON "Course"("courseCode");
