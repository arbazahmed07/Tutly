'use client'

import { useState, useEffect } from 'react'
import DoughnutChart from "@/components/charts/doughnut"
import CalendarHeatmap from "@/components/charts/heatmap"
import { FaRankingStar } from "react-icons/fa6"
import Barchart from "@/components/charts/barchart"

interface StudentStatClientProps {
  totalEvaluatedAssigmentsOfStudent: number
  totalPoints: number
  forBarChart: number[]
  classes: string[]
  attendanceDates: string[]
}

export default function StudentStatClient({
  totalEvaluatedAssigmentsOfStudent,
  totalPoints,
  forBarChart,
  classes,
  attendanceDates
}: StudentStatClientProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="m-4 md:m-8 flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-1/4 shadow-xl shadow-blue-500/5 rounded-xl px-4 md:px-8 py-4">
          <DoughnutChart attendance={[attendanceDates?.length, classes?.length]} />
          <h1 className="py-2 text-center font-bold text-lg md:text-xl text-gray-500">
            Attendance
          </h1>
        </div>
        <div className="w-full md:w-3/4 rounded-xl shadow-xl shadow-blue-500/5 flex flex-col md:flex-row gap-4 md:gap-2">
          <div className="w-full md:w-1/3 flex flex-col justify-between p-4 md:p-14 text-gray-500">
            <div className="p-4 rounded-xl relative border mb-4 md:mb-0">
              <h1 className="absolute -top-3 bg-background px-1 text-sm"># Rank</h1>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl md:text-4xl font-bold text-primary-500">NA</h1>
                <h1>
                  <FaRankingStar className="text-3xl md:text-4xl" />
                </h1>
              </div>
            </div>
            <div className="p-4 rounded-xl relative border">
              <h1 className="absolute -top-3 bg-background px-1 text-sm">Score</h1>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-500">{totalPoints}</h1>
              <h1 className="text-gray-500 text-xs md:text-sm">/ {totalEvaluatedAssigmentsOfStudent} assignments </h1>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-2 flex justify-center items-center">
            <Barchart
              classes={["reviewed", "underreview", "unsubmitted"]}
              attendanceInEachClass={forBarChart}
              label={"Assignments"}
              bgColors={["rgb(22,163,74)", "rgb(202,138,4)", "rgb(37,99,235)"]}
            />
          </div>
        </div>
      </div>
      <div className="rounded-xl shadow-xl shadow-blue-500/5 p-4">
        {isMobile ? (
          <p className="text-center text-gray-500">Calendar heatmap is not available on mobile devices.</p>
        ) : (
          <CalendarHeatmap classes={classes} data={attendanceDates} />
        )}
      </div>
    </div>
  )
}