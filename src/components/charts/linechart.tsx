"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function Linechart({assignments,countForEachAssignment}:any) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context,{
        type:"line",
        data:{
          labels:assignments,
          datasets:[
            {
              label:"submissions",
              data:countForEachAssignment,
              backgroundColor: [
                'rgb(37,99,235)'
              ],
              borderColor:'white',
              borderWidth: 1,
            }
          ]
        },
        options:{
          responsive:true,
          scales:{
            x:{
              type:'linear',
            },
            y:{
              beginAtZero:true
            }
          }
        },
      })
      chartRef.current.chart = newChart;
    }
  },[]);

  return <div className="w-full">
    <canvas ref={chartRef}/>
  </div>;
}
