import {
  getMentorPieChartData,
  getStudentEvaluatedAssigmentsForMentor,
} from "@/actions/assignments";
import { getAttendanceOfStudent } from "@/actions/attendance";
import StudentStatClient from "@/components/studentStatClient";

export default async function Page({ params }: {
  params: { course: string; studentId: string };}) {
  const mentorPieChart = await getMentorPieChartData(params.course);
  const { evaluated, underReview, unsubmitted, totalPoints }: any =
    await getStudentEvaluatedAssigmentsForMentor(
      params.studentId,
      params.course,
    );
  let loaderValue = !mentorPieChart
    ? 0
    : String(
        (mentorPieChart[0] * 100) / (mentorPieChart[0] + mentorPieChart[1]),
      );
  loaderValue += "%";
  const { classes, attendanceDates } = await getAttendanceOfStudent(
    params.studentId,
    params.course,
  );
  return (
    <div>
      <h1 className="p-10 text-2xl font-bold text-blue-400">
        Student - {params.studentId}
      </h1>
      <StudentStatClient
        totalEvaluatedAssigmentsOfStudent={evaluated}
        totalPoints={totalPoints}
        forBarChart={[evaluated, underReview, unsubmitted]}
        classes={classes}
        attendanceDates={attendanceDates}
      />
    </div>
  );
}
