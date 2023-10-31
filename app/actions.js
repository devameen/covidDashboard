import { PrismaClient } from "@prisma/client";

export const getAlldata = async () => {
  const prisma = new PrismaClient();
  const allCountries = await prisma.countries.findMany();
  return allCountries;
};
