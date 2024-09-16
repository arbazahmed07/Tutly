import {
  getMentorPieChartData,
  getStudentEvaluatedAssigmentsForMentor,
  getSubmissionsForMentorLineChart,
} from "@/actions/assignments";
import Barchart from "../../../../components/charts/barchart";
import Linechart from "../../../../components/charts/linechart";
import Piechart from "../../../../components/charts/piechart";
import Radarchart from "../../../../components/charts/radarchart";
import { getAttendanceForMentorBarChart } from "@/actions/attendance";
import { getMentorStudents } from "@/actions/courses";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
import Link from "next/link";
import getCurrentUser from "@/actions/getCurrentUser";
import StudentsInfoForMentor from "@/components/studentsInfoForMentor";

export default async function Statistics({ params }: any) {
  const mentorPieChart = await getMentorPieChartData(params.course);
  const currentUser = await getCurrentUser();
  const { classes, attendanceInEachClass } =
    await getAttendanceForMentorBarChart(params.course);
  const { assignments, countForEachAssignment }: any =
    await getSubmissionsForMentorLineChart(params.course);
  const mstudents = await getMentorStudents(params.course);
  let loaderValue = !mentorPieChart
    ? 0
    : String(
        (mentorPieChart[0] * 100) / (mentorPieChart[0] + mentorPieChart[1]),
      );
  loaderValue += "%";

  if (!currentUser) return null;

  return (
    <div className="m-8 flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="w-1/4 rounded-xl p-8 shadow-xl shadow-blue-500/5">
          <Piechart mentorPieChart={mentorPieChart} />
        </div>
        <div className="flex w-3/4 gap-2 rounded-xl shadow-xl shadow-blue-500/5">
          <div className="flex w-1/3 flex-col gap-6 p-14 text-gray-500">
            <div className="relative rounded-xl border p-4">
              <h1 className="absolute -top-3 bg-background px-1">
                Total Students
              </h1>
              <h1 className="flex items-baseline justify-between text-4xl font-bold text-primary-500">
                {mstudents?.length}
                <span className="text-sm text-gray-500">[Mentees]</span>
              </h1>
            </div>
            <div className="relative rounded-xl border p-4">
              <h1 className="absolute -top-3 bg-background px-1">
                Total Sessions
              </h1>
              <h1 className="text-4xl font-bold text-primary-500">
                {classes.length}
              </h1>
            </div>
          </div>
          <div className="w-2/3 p-2">
            <Barchart
              classes={classes}
              attendanceInEachClass={attendanceInEachClass}
              label={"Attendees"}
              bgColors={["rgb(37,99,235)"]}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="relative max-h-[300px] w-3/4 rounded-xl p-4 shadow-xl shadow-blue-500/5">
          <Barchart
            classes={assignments}
            attendanceInEachClass={countForEachAssignment}
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
            <span className="text-3xl font-bold">
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
