import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Country = {
  country: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  new_cases: number;
  new_deaths: number;
  new_recovered: number;
  deaths_per_100_cases: number;
  Recovered_per_100_cases: number;
  deaths_100_recovered: number;
  confirmed_last_week: number;
  one_week_change: number;
  one_week_percentage_increase: number;
  who_region: string;
};

const csvFilePath = path.resolve(__dirname, "country_wise_latest.csv");

const headers = [
  "country",
  "confirmed",
  "deaths",
  "recovered",
  "active",
  "new_cases",
  "new_deaths",
  "new_recovered",
  "deaths_per_100_cases",
  "Recovered_per_100_cases",
  "deaths_100_recovered",
  "confirmed_last_week",
  "one_week_change",
  "one_week_percentage_increase",
  "who_region",
];

async function main() {
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: headers,
      from_line: 2,
      cast: (columnValue, context) => {
        if (
          ![
            "country",
            "who_region",
            "deaths_per_100_cases",
            "Recovered_per_100_cases",
            "deaths_100_recovered",
            "one_week_percentage_increase",
          ].includes(context.column.toString())
        ) {
          return parseInt(columnValue);
        }

        if (
          [
            "deaths_per_100_cases",
            "Recovered_per_100_cases",
            "deaths_100_recovered",
            "one_week_percentage_increase",
          ].includes(context.column.toString())
        ) {
          //   console.log(context.column, parseFloat(columnValue));
          return parseFloat(columnValue) || 0;
        }

        return columnValue;
      },
    },
    async (error, result: Country[]) => {
      if (error) {
        // console.error(error);
      }

      //   console.log("Result", result);
      const insertedRows = await prisma.countries.createMany({ data: result });
      console.log(`Inserted ${insertedRows.count} rows`);
    }
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
