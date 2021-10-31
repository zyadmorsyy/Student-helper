/*
  Warnings:

  - The `type` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('majorElective', 'majorRequirment', 'minorRequirment', 'universityRequirment', 'facultyRequirment');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "isElective" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "type",
ADD COLUMN     "type" "Type";
