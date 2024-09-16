import {
  getMentorPieChartData,
  getSubmissionsForMentorLineChart,
} from "@/actions/assignments";
import { getAttendanceForMentorBarChart } from "@/actions/attendance";
import { getEnrolledMentees, getEnrolledStudents } from "@/actions/courses";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import Link from "next/link";
import MentorInfoForInstructor from "@/components/mentorInfoForInstructor";
import Piechart from "@/components/charts/piechart";
import Barchart from "@/components/charts/barchart";

interface StatisticsPageProps {
  params: {
    course: string;
  };
}

export default async function StatisticsPage({ params }: StatisticsPageProps) {
  const { classes, attendanceInEachClass } = await getAttendanceForMentorBarChart(params.course);

  return (
    <div>
      <h1>Statistics for Course {params.course}</h1>
      <Barchart
        classes={classes}
        attendanceInEachClass={attendanceInEachClass}
        label="Attendance"
        bgColors={["#FF6384", "#36A2EB", "#FFCE56"]}
      />
    </div>
  );
}
