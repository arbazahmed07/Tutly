import {
  getMentorPieChartData,
  getSubmissionsForMentorLineChart,
} from "@/actions/assignments";
import Barchart from "../../../../components/charts/barchart";
import Piechart from "../../../../components/charts/piechart";
import { getAttendanceForMentorBarChart } from "@/actions/attendance";
import { getMentorStudents } from "@/actions/courses";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import Link from "next/link";
import getCurrentUser from "@/actions/getCurrentUser";
import StudentsInfoForMentor from "@/components/studentsInfoForMentor";

interface StatisticsParams {
  params: {
    course: string;
  };
}

interface AttendanceData {
  classes: string[];
  attendanceInEachClass: number[];
}

interface SubmissionsData {
  assignments: string[];
  countForEachAssignment: number[];
}

export default async function Statistics({ params }: StatisticsParams) {
  const mentorPieChart: number[] | null = await getMentorPieChartData(
    params.course,
  );
  const currentUser = await getCurrentUser();

  const attendanceData: AttendanceData | null =
    await getAttendanceForMentorBarChart(params.course);
  const submissionData: SubmissionsData | null =
    await getSubmissionsForMentorLineChart(params.course);
  const mstudents = await getMentorStudents(params.course);

  // Use default values if data is null or undefined
  const pieChartData: any = mentorPieChart ?? [0, 0];
  const totalPieChartValue = pieChartData[0] + pieChartData[1];
  const loaderValue =
    totalPieChartValue > 0
      ? `${((pieChartData[0] * 100) / totalPieChartValue).toFixed(2)}%`
      : "0%";

  if (!currentUser) return null;

  return (
    <div className="m-8 flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="w-1/4 rounded-xl p-8 shadow-xl shadow-blue-500/5">
          <Piechart mentorPieChart={pieChartData} />
        </div>
        <div className="flex w-3/4 gap-2 rounded-xl shadow-xl shadow-blue-500/5">
          <div className="flex w-1/3 flex-col gap-6 p-14 text-gray-500">
            <div className="relative rounded-xl border p-4">
              <h1 className="absolute -top-3 bg-background px-1">
                Total Students
              </h1>
              <h1 className="flex items-baseline justify-between text-4xl font-bold text-primary-500">
                {mstudents?.length ?? 0}
                <span className="text-sm text-gray-500">[Mentees]</span>
              </h1>
            </div>
            <div className="relative rounded-xl border p-4">
              <h1 className="absolute -top-3 bg-background px-1">
                Total Sessions
              </h1>
              <h1 className="text-4xl font-bold text-primary-500">
                {attendanceData?.classes.length ?? 0}
              </h1>
            </div>
          </div>
          <div className="w-2/3 p-2">
            <Barchart
              classes={attendanceData?.classes ?? []}
              attendanceInEachClass={
                attendanceData?.attendanceInEachClass ?? []
              }
              label={"Attendees"}
              bgColors={["rgb(37,99,235)"]}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="relative max-h-[300px] w-3/4 rounded-xl p-4 shadow-xl shadow-blue-500/5">
          <Barchart
            classes={submissionData?.assignments ?? []}
            attendanceInEachClass={submissionData?.countForEachAssignment ?? []}
            label={"Submissions"}
            bgColors={["rgb(37,99,235)"]}
          />
          <Link
            href="/mentor/assignments/getbyassignment"
            className="absolute right-2 top-2"
          >
            <FaSquareArrowUpRight className="text-xl text-gray-500" />
          </Link>
        </div>
        <div className="w-1/4 rounded-xl p-8 shadow-xl shadow-blue-500/5">
          <h1 className="pb-14 text-gray-500">Evaluation</h1>
          <div className="px-16 text-center font-semibold text-blue-500">
            <span className="text-3xl font-bold">{pieChartData[0]}</span>
            <span>/{totalPieChartValue}</span>
          </div>
          <div className="m-auto my-4 w-4/5 rounded-full border border-gray-700">
            <div
              className={`w-[ h-[10px]${loaderValue}] rounded-full bg-blue-500`}
            ></div>
          </div>
          <h1 className="p-2 text-center text-gray-500">
            Assignments to be evaluated
          </h1>
        </div>
      </div>
      <div className="w-full rounded-xl p-4 shadow-xl shadow-blue-500/5">
        {!mstudents || mstudents.length === 0 ? (
          <div>No Mentees are assigned!</div>
        ) : (
          <StudentsInfoForMentor
            currentUser={currentUser}
            mstudents={mstudents}
            mentorUsername={currentUser.username}
            courseId={params.course}
          />
        )}
      </div>
    </div>
  );
}
