import WorldMap from "./WorldMap";
import Barchart from "./BarChart";
import { prisma } from "@/db";

export default async function Home() {
  const countryData = await prisma.countries.findMany();

  return (
    <main>
      {/* main container */}

      <div className="flex px-1 h-[90vh]">
        {/* worldMap container */}
        <div className="basis-8/12  justify-center mt-3 border border-as-solmon border-opacity-25 ">
          <div className="w-full font-semibold antialiased text-center bg-as-solmon text-as-white">
            Country Wise Active Cases
          </div>
          <div className="">
            <div className="basis-1/4">
              <WorldMap data={countryData} />
            </div>
          </div>
        </div>

        {/* barchart container */}
        <div className="basis-4/12 mt-3 border border-as-solmon h-full">
          <div className="w-full font-semibold antialiased text-center bg-as-solmon text-as-white">
            Distribution
          </div>
          <div className="bg-as-white h-full">
            <Barchart data={countryData} />
          </div>
        </div>
      </div>
    </main>
  );
}
