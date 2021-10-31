/*
  Warnings:

  - You are about to drop the column `creditDone` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `creditHave` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "creditDone",
DROP COLUMN "creditHave";
