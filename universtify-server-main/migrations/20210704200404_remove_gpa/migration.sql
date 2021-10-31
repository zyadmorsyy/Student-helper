/*
  Warnings:

  - You are about to drop the column `GPA` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastTermGPA` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "GPA",
DROP COLUMN "lastTermGPA";
