"use client";

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

type MapProps = {
  data: { [index: string]: number | string }[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
  },
};

const Barchart = ({ data }: MapProps) => {
  console.log(data);

  const labels = data.map((e) => e?.country);

  const demodata = {
    labels,
    datasets: [
      {
        label: "Country",
        data: data.map((e) => e?.active),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={demodata} />;
};

export default Barchart;
