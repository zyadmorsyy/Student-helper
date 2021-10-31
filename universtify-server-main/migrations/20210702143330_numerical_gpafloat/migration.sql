/*
  Warnings:

  - Made the column `numericalGPA` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numericalLastTermGPA` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "numericalGPA" SET NOT NULL,
ALTER COLUMN "numericalLastTermGPA" SET NOT NULL;
