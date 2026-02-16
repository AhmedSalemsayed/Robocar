"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDarkMode } from "usehooks-ts";
import { motion } from "motion/react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

type ChartData = {
  brand: string;
  model: string;
  maintenance: Array<{
    name: string;
    currentKilometrage: number;
    changeEvery: number;
    lastHistoryLog: { kilometrageNextMaintenance: number } | null;
  }>;
};

const BarChart = ({ MaintenanceData }: { MaintenanceData: ChartData[] }) => {
  const isMobile = useIsMobile();
  const { isDarkMode } = useDarkMode();
  if (!MaintenanceData || MaintenanceData.length === 0) return null;
  const colorPalette = [
    "rgba(153, 102, 255, 0.9)", // purple
    "rgba(75, 192, 192, 0.9)", // teal
    "rgba(238, 211, 9, 0.9)", // yellow
    "rgba(233, 118, 4, 0.9)", // orange
    "rgba(246, 19, 68, 0.9)", // red
    "rgba(54, 162, 235, 0.6)", // blue
  ];
  const data = {
    labels: MaintenanceData?.at(-1)?.maintenance.map((item) => item.name),
    datasets: MaintenanceData?.map((car, i) => {
      return {
        label: car.brand + " " + car.model,
        data: car.maintenance.map((item) => {
          const kilometrageNextMaintenance =
            item?.lastHistoryLog?.kilometrageNextMaintenance ?? 0;
          if (!item.lastHistoryLog) return 0;
          if (kilometrageNextMaintenance - item.currentKilometrage <= 0)
            return 0;
          return Math.round(
            ((kilometrageNextMaintenance - item.currentKilometrage) /
              Number(item.changeEvery)) *
              100,
          );
        }),
        backgroundColor: colorPalette[i],
        borderRadius: 2,
      };
    }),
  };

  const options = {
    maintainAspectRatio: !isMobile,
    aspectRatio: isMobile ? undefined : 2,
    scales: {
      y: {
        title: {
          display: true,
          text: "Condition (%)",
          color: isDarkMode ? "#8b8c8dff" : "#8d0606ff",
          font: {
            size: 14,
          },
        },
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: (value: number | string) => value + " %",
          color: isDarkMode ? "#8b8c8dff" : "#4b5563",
        },
        grid: {
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(211, 204, 204, 0.1)",
          drawOnChartArea: true,
          drawTicks: true,
          drawBorder: true,
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 7 : 12,
            family: "Roboto",
          },
          color: isDarkMode ? "#8b8c8dff" : "#4b5563",
        },
        grid: {
          color: isDarkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(211, 204, 204, 0.1)",
          drawOnChartArea: true,
          drawTicks: true,
          drawBorder: true,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Car Parts Condition",
      },
    },
  };

  return (
    <motion.div
      className={isMobile ? "min-h-[400px] h-[400px]" : ""}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "interia" }}
    >
      <Bar data={data} options={options} />
    </motion.div>
  );
};

export default BarChart;
