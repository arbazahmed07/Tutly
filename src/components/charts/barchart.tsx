"use client";
import { useRef, useEffect } from "react";
import  { Chart, type ChartConfiguration } from "chart.js/auto";

interface BarchartProps {
  classes: string[];
  attendanceInEachClass: number[];
  label: string;
  bgColors: string[];
}

export default function Barchart({
  classes,
  attendanceInEachClass,
  label,
  bgColors,
}: BarchartProps) {
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
          type: "bar",
          data: {
            labels: classes,
            datasets: [
              {
                label: label,
                data: attendanceInEachClass,
                backgroundColor: bgColors,
                borderColor: "white",
                borderWidth: 0,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "category",
              },
              y: {
                beginAtZero: true,
              },
            },
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
  }, [classes, attendanceInEachClass, label, bgColors]);

  return (
    <div className="h-full w-4/5">
      <canvas ref={chartRef} />
    </div>
  );
}
