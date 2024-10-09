"use client";
import { useRef, useEffect } from "react";
import { Chart, type ChartConfiguration } from "chart.js/auto";

interface LinechartProps {
  assignments: string[];
  countForEachAssignment: number[];
}

export default function Linechart({
  assignments,
  countForEachAssignment,
}: LinechartProps) {
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
          type: "line",
          data: {
            labels: assignments,
            datasets: [
              {
                label: "submissions",
                data: countForEachAssignment,
                backgroundColor: ["rgb(37,99,235)"],
                borderColor: "white",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: "linear",
              },
              y: {
                beginAtZero: true,
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
  }, [assignments, countForEachAssignment]);

  return (
    <div className="w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
