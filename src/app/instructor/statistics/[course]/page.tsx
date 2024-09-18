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

export default async function Statistics({
  params,
}: {
  params: { course: string };
}) {
  const courseId = params.course;
  const mentorPieChart = await getMentorPieChartData(courseId);
  const { classes, attendanceInEachClass } =
    await getAttendanceForMentorBarChart(courseId);
  const { assignments, countForEachAssignment }: any =
    await getSubmissionsForMentorLineChart(courseId);
  const mstudents = await getEnrolledStudents(courseId);
  const mmentees = await getEnrolledMentees(courseId);
  let loaderValue = !mentorPieChart
    ? 0
    : String(
        (mentorPieChart[0] * 100) / (mentorPieChart[0] + mentorPieChart[1]),
      );
  loaderValue += "%";

  return (
    <div className="m-4 flex flex-col gap-4 md:m-8 md:gap-8">
      <div className="flex flex-col gap-4 md:gap-8 lg:flex-row">
        <div className="w-full rounded-xl p-4 shadow-xl shadow-blue-500/5 md:p-8 lg:w-1/4">
          <Piechart mentorPieChart={mentorPieChart} />
        </div>
        <div className="flex w-full flex-col gap-2 rounded-xl shadow-xl shadow-blue-500/5 md:flex-row lg:w-3/4">
          <div className="flex w-full flex-col gap-4 p-4 text-gray-500 md:w-1/3 md:gap-6 md:p-14">
            <div className="relative rounded-xl border p-4">
              <h1 className="absolute -top-3 bg-background px-1 text-sm md:text-base">
                Total Students
              </h1>
              <h1 className="flex items-baseline justify-between text-2xl font-bold text-primary-500 md:text-4xl">
                {mstudents?.length}
              </h1>
            </div>
            <div className="relative rounded-xl border p-4">
              <h1 className="absolute -top-3 bg-background px-1 text-sm md:text-base">
                Total Sessions
              </h1>
              <h1 className="text-2xl font-bold text-primary-500 md:text-4xl">
                {classes.length}
              </h1>
            </div>
          </div>
          <div className="w-full p-2 md:w-2/3">
            <Barchart
              classes={classes}
              attendanceInEachClass={attendanceInEachClass}
              label={"Attendees"}
              bgColors={["rgb(37,99,235)"]}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-8 lg:flex-row">
        <div className="relative max-h-[300px] w-full rounded-xl p-4 shadow-xl shadow-blue-500/5 lg:w-3/4">
          <Barchart
            classes={assignments}
            attendanceInEachClass={countForEachAssignment}
            label={"Submissions"}
            bgColors={["rgb(37,99,235)"]}
          />
          <Link
            href="/instructor/assignments/getByAssignment"
            className="absolute right-2 top-2"
          >
            <FaSquareArrowUpRight className="text-xl text-gray-500" />
          </Link>
        </div>
        <div className="w-full rounded-xl p-4 shadow-xl shadow-blue-500/5 md:p-8 lg:w-1/4">
          <h1 className="pb-4 text-gray-500 md:pb-14">Evaluation</h1>
          <div className="px-4 text-center font-semibold text-blue-500 md:px-16">
            <span className="text-2xl font-bold md:text-3xl">
              {mentorPieChart ? mentorPieChart[0] : 0}
            </span>
            <span>
              /{mentorPieChart ? mentorPieChart[0] + mentorPieChart[1] : 0}
            </span>
          </div>
          <div className="m-auto my-4 w-4/5 rounded-full border border-gray-700">
            <div
              className={`h-[10px] rounded-full bg-blue-500`}
              style={{ width: loaderValue }}
            ></div>
          </div>
          <h1 className="p-2 text-center text-sm text-gray-500 md:text-base">
            Assignments to be evaluated by all the mentors
          </h1>
        </div>
      </div>
      <div className="w-full rounded-xl p-4 shadow-xl shadow-blue-500/5">
        {!mstudents || mstudents.length === 0 ? (
          <div>No Mentees are assigned!</div>
        ) : (
          <MentorInfoForInstructor mstudents={mmentees} courseId={courseId} />
        )}
      </div>
    </div>
  );
}
