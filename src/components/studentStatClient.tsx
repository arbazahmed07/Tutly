import { FaSquareArrowUpRight } from "react-icons/fa6";
import Link from "next/link";
import DoughnutChart from "@/components/charts/doughnut";
import CalendarHeatmap from "@/components/charts/heatmap";
import { FaRankingStar } from "react-icons/fa6";
import Barchart from "@/components/charts/barchart";
import Linechart from "@/components/charts/linechart";
import Piechart from "@/components/charts/piechart";
import Radarchart from "@/components/charts/radarchart";
export default function StudentStatClient({
    totalEvaluatedAssigmentsOfStudent,
    totalPoints,
    forBarChart,
}:any) {
  const rank = 5
  return (
    <div className="m-8 flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="w-1/4 shadow-xl shadow-blue-500/5 rounded-xl px-8">
          <DoughnutChart attendance={[200, 200]} />
          <h1 className="py-2 text-center font-bold text-xl text-gray-500">
            Attendance
          </h1>
        </div>
        <div className="w-3/4 rounded-xl shadow-xl shadow-blue-500/5 flex gap-2">
          <div className="w-1/3 flex flex-col justify-between p-14 text-gray-500">
            <div className="p-4 rounded-xl relative border">
              <h1 className="absolute -top-3 bg-background px-1"># Rank</h1>
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-primary-500">{rank}</h1>
                <h1>
                  <FaRankingStar className="text-4xl" />
                </h1>
              </div>
            </div>
            <div className="p-4 rounded-xl relative border">
              <h1 className="absolute -top-3 bg-background px-1">Score</h1>
              <h1 className="text-4xl font-bold text-primary-500">{totalPoints}</h1>
              <h1 className="text-gray-500 text-sm">/ {totalEvaluatedAssigmentsOfStudent} assignments </h1>
            </div>
          </div>
          <div className="w-2/3 p-2 flex justify-center items-center">
            <Barchart
              classes={["reviewed", "underreview", "unsubmitted"]}
              attendanceInEachClass={forBarChart}
              label={"Assignments"}
              bgColors={["rgb(22,163,74)", "rgb(202,138,4)", "rgb(37,99,235)"]}
            />
          </div>
        </div>
      </div>
      <div className="rounded-xl shadow-xl shadow-blue-500/5">
        <CalendarHeatmap data={["2024-05-27"]} />
      </div>
    </div>
  );
}
