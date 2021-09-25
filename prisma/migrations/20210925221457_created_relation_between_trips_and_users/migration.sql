/*
  Warnings:

  - You are about to drop the `_TripToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TripToUser" DROP CONSTRAINT "_TripToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TripToUser" DROP CONSTRAINT "_TripToUser_B_fkey";

-- DropTable
DROP TABLE "_TripToUser";

-- CreateTable
CREATE TABLE "PassengerOnTrip" (
    "trip_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("trip_id","user_id")
);

-- AddForeignKey
ALTER TABLE "PassengerOnTrip" ADD FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassengerOnTrip" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
