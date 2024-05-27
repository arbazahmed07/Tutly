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
            //   label:label,
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
          responsive:true,
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

  return <div className="relative max-h-[300px]">
    <canvas ref={chartRef}/>
    <div className="absolute flex justify-center items-center w-full h-full top-0 font-bold text-3xl">{(attendance[0]*100/(attendance[0]+attendance[1])).toFixed(2)}</div>
  </div>;
}
