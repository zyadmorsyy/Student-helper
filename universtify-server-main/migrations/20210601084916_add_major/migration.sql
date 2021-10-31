/*
  Warnings:

  - You are about to drop the column `major` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "major",
ADD COLUMN     "majorId" INTEGER,
ADD COLUMN     "minorId" INTEGER;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "major",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "majorId" INTEGER,
ADD COLUMN     "minorId" INTEGER;

-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "avatar" TEXT;

-- CreateTable
CREATE TABLE "Major" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Major.code_unique" ON "Major"("code");

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("minorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("minorId") REFERENCES "Major"("id") ON DELETE SET NULL ON UPDATE CASCADE;
