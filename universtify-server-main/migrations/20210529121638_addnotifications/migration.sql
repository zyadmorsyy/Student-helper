-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    PRIMARY KEY ("id")
);
