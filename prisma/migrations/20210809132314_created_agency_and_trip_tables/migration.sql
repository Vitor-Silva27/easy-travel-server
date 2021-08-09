-- CreateTable
CREATE TABLE "agencies" (
    "agency_id" TEXT NOT NULL,
    "agency_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("agency_id")
);

-- CreateTable
CREATE TABLE "trips" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "owner_agency" TEXT NOT NULL,

    PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "agencies.agency_name_unique" ON "agencies"("agency_name");

-- CreateIndex
CREATE UNIQUE INDEX "agencies.email_unique" ON "agencies"("email");

-- AddForeignKey
ALTER TABLE "trips" ADD FOREIGN KEY ("owner_agency") REFERENCES "agencies"("agency_id") ON DELETE CASCADE ON UPDATE CASCADE;
