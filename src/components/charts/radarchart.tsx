"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function Radarchart() {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "radar",
        data: {
          labels: ["John", "ivuhoi", "utdytgu", "uyckljho", "hxtuygo"],
          datasets: [
            {
              label: "Info",
              data: [87, 56, 12, 56, 89],
              backgroundColor: ["rgb(255,99,132,0.2)"],
              borderColor: ["rgb(255,99,132)"],
              borderWidth: 2,
            },
            {
              label: "Info 2",
              data: [65, 45, 32, 42, 90],
              backgroundColor: ["rgb(255,159,64,0.2)"],
              borderColor: ["rgb(255,99,132)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
      chartRef.current.chart = newChart;
    }
  }, []);

  return (
    <div className="w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
