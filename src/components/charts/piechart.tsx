"use client";
import { useRef, useEffect } from "react";
import { Chart, type ChartConfiguration } from "chart.js/auto";

interface PiechartProps {
  mentorPieChart: number[];
}

export default function Piechart({ mentorPieChart }: PiechartProps) {
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
          type: "pie",
          data: {
            labels: ["Reviewed", "Under review", "Unsubmitted"],
            datasets: [
              {
                label: "Assignments",
                data: mentorPieChart,
                backgroundColor: [
                  "rgb(22,163,74)",
                  "rgb(202,138,4)",
                  "rgb(37,99,235)",
                ],
                borderColor: "black",
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
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
  }, [mentorPieChart]);

  return (
    <div className="m-auto w-full max-w-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
}
