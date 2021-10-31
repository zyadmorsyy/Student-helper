-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "coordinatorId" INTEGER;

-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "coordinatorId" INTEGER;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "coordinatorId" INTEGER,
ALTER COLUMN "level" SET DEFAULT 1,
ALTER COLUMN "creditDone" SET DEFAULT 0,
ALTER COLUMN "creditHave" SET DEFAULT 18,
ALTER COLUMN "GPA" SET DEFAULT 0,
ALTER COLUMN "lastTermGPA" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "coordinatorId" INTEGER;

-- CreateTable
CREATE TABLE "Coordinator" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fname" VARCHAR(255) NOT NULL,
    "lname" VARCHAR(255) NOT NULL,
    "phone" TEXT,
    "gender" "Gender",
    "password" TEXT,
    "email" TEXT NOT NULL,
    "avatar" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordinator.email_unique" ON "Coordinator"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supervisor" ADD FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
