"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function Doughnutchart({attendance}:{attendance:any}) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context,{
        type:"doughnut",
        data:{
          // labels:classes,
          datasets:[
            {
              label:"classes",
              data:attendance,
              backgroundColor: [
                'rgb(37,99,235)',
                // 'green',
                'red'
              ],
              borderColor:'white',
              borderWidth: 0,
            }
          ]
        },
        options:{
          // responsive:true,
          // scales:{
          //   x:{
          //     type:'category',
          //   },
          //   y:{
          //     beginAtZero:true
          //   }
          // },
          // plugins:{
          //   legend:{
          //     position:"top"
          //   }
          // }
        },
      })
      chartRef.current.chart = newChart;
    }
  },[]);

  const attendancePercentage = (attendance[0] * 100 / (attendance[0] + attendance[1])).toFixed(2)

  return (
    <div className="relative w-full h-[300px]">
      <canvas ref={chartRef} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="font-bold text-3xl">{attendancePercentage}%</span>
        </div>
      </div>
    </div>
  )
}
