import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// Helper function to generate random RGB color

const colors = [
  "rgb(229, 152, 155)",
  "rgb(252, 227, 138)",
  "rgb(162, 217, 206)",
  "rgb(255, 210, 210)",
  "rgb(159, 204, 255)",
  "rgb(221, 170, 255)",
];

const colors_50_opacity = [
  "rgba(229, 152, 155, 0.5)",
  "rgba(252, 227, 138, 0.5)",
  "rgba(162, 217, 206, 0.5)",
  "rgba(255, 210, 210, 0.5)",
  "rgba(159, 204, 255, 0.5)",
  "rgba(221, 170, 255, 0.5)",
];

const BaseGraph = ({ datasets = [], title = "" }) => {
  const maxLenght = Math.max(...datasets.map((dataset) => dataset.data.length));
  const formattedData = {
    labels: Array.from({ length: maxLenght }, (_, i) => i + 1), // X-axis labels based on data length

    datasets: datasets.map((dataset, index) => {
      const color = colors[index % colors.length];
      return {
        label: `Dataset ${dataset.title}`,
        data: dataset.data,
        borderColor: color,
        backgroundColor: colors_50_opacity[index % colors.length], // with 50% opacity
        borderWidth: 1,
        fill: true,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line data={formattedData} options={options} />;
};

export default BaseGraph;
