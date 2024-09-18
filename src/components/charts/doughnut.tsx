"use client";
import { useRef, useEffect } from "react";
import { Chart, type ChartConfiguration } from "chart.js/auto";

interface DoughnutchartProps {
  attendance: number[];
}

export default function Doughnutchart({ attendance }: DoughnutchartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const config: ChartConfiguration = {
          type: "doughnut",
          data: {
            datasets: [
              {
                label: "classes",
                data: attendance,
                backgroundColor: ["rgb(37,99,235)", "red"],
                borderColor: "white",
                borderWidth: 0,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: "top",
              },
            },
          },
        };

        chartInstanceRef.current = new Chart(ctx, config);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [attendance]);

  const attendancePercentage =
    attendance[0] && attendance[1]
      ? ((attendance[0] * 100) / (attendance[0] + attendance[1])).toFixed(2)
      : "0.00";

  return (
    <div className="relative mb-2 w-full">
      <canvas ref={chartRef} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl font-bold">
            {attendancePercentage === "100.00" ? "100" : attendancePercentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
