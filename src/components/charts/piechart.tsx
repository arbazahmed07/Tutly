"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function Piechart({ mentorPieChart }: { mentorPieChart: any }) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
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
      });
      chartRef.current.chart = newChart;
    }
  }, []);

  return (
    <div className="m-auto w-full max-w-[300px]">
      <canvas ref={chartRef} />
    </div>
  );
}
