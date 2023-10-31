"use client";

import axios from "axios";
import * as d3 from "d3";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { HashLoader, MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";

type MapProps = {
  data: { [index: string]: number | string }[];
};

const WorldMap = ({ data }: MapProps) => {
  const [geoData, setGeoData] = useState<d3.GeoPermissibleObjects[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [popOver, setPopOver] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    [index: string]: number | string;
  }>({});
  const [popOverPosition, setPopoverPosition] = useState<{
    [index: string]: number;
  }>({ left: 0, top: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [minMaxActiveCases, setMinMaxActiveCases] = useState<{
    [index: string]: number;
  }>({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
      )
      .then((res) => {
        console.log(res.data);
        setGeoData(res?.data?.features);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    //collect mimax values for color scaling
    const activeases = data.map(
      (each) => parseInt(each.active.toString()) || 0
    );
    setMinMaxActiveCases({
      min: Math.min(...activeases),
      max: Math.max(...activeases),
    });
  }, [data]);

  //calculate width from parent div
  const width: number = ref.current?.offsetWidth
    ? ref.current?.offsetWidth - 50
    : 600;

  //Calculate height based on parent
  const height: number = ref.current?.offsetHeight
    ? ref.current?.offsetWidth - 350
    : 600;

  // color scale from min max values
  const colorscale = d3
    .scaleSequential(["blue", "red"])
    .rangeRound([minMaxActiveCases?.min, minMaxActiveCases?.max]);

  // gets scaled color for repective counties's active casess
  const getColorScale = (country: string): string => {
    let matchedCounry: { [index: string]: number } = {};
    for (const item of data) {
      if (item.country.toString().toLowerCase() == country.toLowerCase()) {
        matchedCounry = { active: parseInt(item.active.toString()) };
      }
    }

    return colorscale(matchedCounry["active"]);
  };

  const projection = d3
    .geoNaturalEarth1()
    .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2]);

  const handleMouseOver = (
    event: MouseEvent<SVGPathElement>,
    country: string
  ) => {
    setPopoverPosition({ left: event.clientX, top: event.clientY });
    let matchedCounry: { [index: string]: number | string } = {};
    for (const item of data) {
      country = country.toLocaleLowerCase() == "usa" ? "us" : country;
      if (item.country.toString().toLowerCase() == country.toLowerCase()) {
        matchedCounry = item;
      }
    }
    setSelectedCountry(matchedCounry);
    setPopOver(true);
  };

  const hanldeMouseLeave = (event: MouseEvent<SVGPathElement>) => {
    setPopOver(false);
    setSelectedCountry({});
  };

  if (isLoading) {
    return <MoonLoader />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <span className="text-error"> Unable to fetch geo Data</span>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-full" ref={ref}>
        <svg width={width} height={height}>
          {geoData?.map((geo: any, geoInd: number) => (
            <g key={geoInd}>
              <path
                className="fill-as-banner-yellow hover:fill-as-banner transition-all duration-250 cursor-pointer"
                d={d3.geoPath().projection(projection)(geo)?.toString()}
                onMouseOver={(e) => handleMouseOver(e, geo?.properties?.name)}
                onMouseLeave={(e) => hanldeMouseLeave(e)}
                onClick={() => {
                  router.push(
                    "/" + geo?.properties?.name.toLowerCase() !== "usa"
                      ? geo?.properties?.name.toLowerCase()
                      : "us"
                  );
                }}
              />
            </g>
          ))}
        </svg>
      </div>
      <div
        ref={tooltipRef}
        className={`${
          popOver ? "opacity-1" : "opacity-0"
        }drop-shadow-lg transition-all duration-200 absolute block border border-as-hilight bg-as-white text-as-banner-yellow`}
        style={{
          left: popOverPosition.left + "px",
          top: popOverPosition.top + "px",
        }}
      >
        {Object.keys(selectedCountry).length > 0 ? (
          <div className="flex flex-col">
            <span className="px-1 py-2 bg-as-banner text-as-white">
              {selectedCountry["country"]}
            </span>
            <table>
              <tbody>
                <th>Active Cases:</th>
                <td>{selectedCountry["active"]}</td>
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WorldMap;
