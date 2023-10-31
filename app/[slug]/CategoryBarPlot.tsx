"use client";

import { Cprops } from "./CountryDetails";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CategoryBarPlot = ({ data }: Cprops) => {
  const labels = [
    "Confirmed",
    "Deaths",
    "Recovered",
    "Active",
    "New cases",
    "New Deaths",
    "New recovered",
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };
  const demodata = {
    labels,
    datasets: [
      {
        label: "Cases",
        data: [
          data.confirmed,
          data.deaths,
          data.recovered,
          data.active,
          data.new_cases,
          data.new_deaths,
          data.new_recovered,
        ],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={demodata} />;
};

export default CategoryBarPlot;
