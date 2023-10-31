-- CreateTable
CREATE TABLE "CounryData" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "confirmed" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "recovered" INTEGER NOT NULL,
    "active" INTEGER NOT NULL,
    "new_cases" INTEGER NOT NULL,
    "new_deaths" INTEGER NOT NULL,
    "new_recovered" INTEGER NOT NULL,
    "deaths_per_100_cases" DOUBLE PRECISION NOT NULL,
    "Recovered_per_100_cases" DOUBLE PRECISION NOT NULL,
    "deaths_100_recovered" DOUBLE PRECISION NOT NULL,
    "confirmed_last_week" INTEGER NOT NULL,
    "one_week_change" INTEGER NOT NULL,
    "one_week_percentage_increase" DOUBLE PRECISION NOT NULL,
    "who_region" TEXT NOT NULL,

    CONSTRAINT "CounryData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CounryData_country_key" ON "CounryData"("country");
