/*
  Warnings:

  - Added the required column `date` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "included" TEXT[],
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_TripToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TripToUser_AB_unique" ON "_TripToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TripToUser_B_index" ON "_TripToUser"("B");

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD FOREIGN KEY ("A") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
