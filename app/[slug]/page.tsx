import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import CountryDetails from "./CountryDetails";
import PieChart from "./PieChart";
import CategoryBarPlot from "./CategoryBarPlot";
import { prisma } from "@/db";

type PageProps = {
  params: {
    slug: string;
  };
};

const CountryView = async ({ params }: PageProps) => {
  
  const data = await prisma.countries.findFirst({
    where: {
      country: { equals: params?.slug, mode: "insensitive" },
    },
  });
  console.log('sdffdff');
  console.log(data);
  return (
    <div className="px-5">
      <div className="border-b border-b-as-banner flex items-baseline gap-1">
        <Link href={"/"}>
          <HomeIcon className="w-8 h-8" />
        </Link>{" "}
        <h1>{params?.slug}</h1>
      </div>
      <div className="flex w-full">
        <div className="basis-2/4">
            <CategoryBarPlot data={data || {}} />
            <CountryDetails data={data || {}} />
        </div>
        <div className="basis-2/4 h-30 flex justify-center">
            <PieChart data={data||{}}/>
        </div>
            
        {/* <CountryView data={data} /> */}
      </div>
    </div>
  );
};

export default CountryView;
