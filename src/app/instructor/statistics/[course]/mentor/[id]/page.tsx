import {
  getMentorPieChartById,
  getSubmissionsForMentorByIdLineChart,
} from "@/actions/assignments";
import Barchart from "@/components/charts/barchart";
import Piechart from "@/components/charts/piechart";
import { getAttendanceForMentorByIdBarChart } from "@/actions/attendance";
import { getMentorStudentsById } from "@/actions/courses";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import Link from "next/link";
import getCurrentUser from "@/actions/getCurrentUser";
import StudentsInfoForMentor from "@/components/studentsInfoForMentor";
import { getMentorNameById } from "@/actions/mentors";

interface MentorStatisticsPageProps {
  params: {
    course: string;
    id: string;
  };
}

export default async function MentorStatisticsPage({
  params,
}: MentorStatisticsPageProps) {
  const { classes, attendanceInEachClass } =
    await getAttendanceForMentorByIdBarChart(params.id, params.course);

  return (
    <div>
      <h1>
        Statistics for Mentor {params.id} in Course {params.course}
      </h1>

      <Barchart
        classes={classes}
        attendanceInEachClass={attendanceInEachClass}
        label="Attendance"
        bgColors={["#FF6384", "#36A2EB", "#FFCE56"]}
      />
    </div>
  );
}
