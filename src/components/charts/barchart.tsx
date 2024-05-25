"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function Barchart({classes,attendanceInEachClass,label}:{classes:any,attendanceInEachClass:any,label:string}) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context,{
        type:"bar",
        data:{
          labels:classes,
          datasets:[
            {
              label:label,
              data:attendanceInEachClass,
              backgroundColor: [
                'rgb(37,99,235)'
              ],
              borderColor:'white',
              borderWidth: 0,
            }
          ]
        },
        options:{
          responsive:true,
          scales:{
            x:{
              type:'category',
            },
            y:{
              beginAtZero:true
            }
          },
          plugins:{
            legend:{
              position:"top"
            }
          }
        },
      })
      chartRef.current.chart = newChart;
    }
  },[]);

  return <div className=" max-h-[300px]">
    <canvas ref={chartRef}/>
  </div>;
}
