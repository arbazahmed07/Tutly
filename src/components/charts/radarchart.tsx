"use client";
import { useRef, useEffect } from "react";
import { Chart, type ChartConfiguration } from "chart.js/auto";

export default function Radarchart() {
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
          type: "radar",
          data: {
            labels: ["John", "ivuhoi", "utdytgu", "uyckljho", "hxtuygo"],
            datasets: [
              {
                label: "Info",
                data: [87, 56, 12, 56, 89],
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgb(255,99,132)",
                borderWidth: 2,
              },
              {
                label: "Info 2",
                data: [65, 45, 32, 42, 90],
                backgroundColor: "rgba(255,159,64,0.2)",
                borderColor: "rgb(255,159,64)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
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
  }, []);

  return (
    <div className="w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
