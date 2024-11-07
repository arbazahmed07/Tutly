import {
  getMentorPieChartData,
  getStudentEvaluatedAssigments,
} from "@/actions/assignments";
import {
  getAttendanceOfStudent,
} from "@/actions/attendance";
import getCurrentUser from "@/actions/getCurrentUser";
import StudentStatClient from "@/components/studentStatClient";
import { json } from "stream/consumers";

export default async function Statistics({ params }: any) {
  const mentorPieChart = await getMentorPieChartData(params.course);
  const { evaluated, underReview, unsubmitted, totalPoints }: any =
    await getStudentEvaluatedAssigments(params.course);
  let loaderValue = !mentorPieChart
    ? 0
    : String(
        (mentorPieChart[0] * 100) / (mentorPieChart[0] + mentorPieChart[1]),
      );
  loaderValue += "%";
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <div className="text-center text-xl font-bold">
        Please Login to view your Statistics
      </div>
    );
  const { classes, attendanceDates } = await getAttendanceOfStudent(
    currentUser.username,
    params.course,
  );
  // return <div>
  //   <pre>{JSON.stringify(attendanceDates, null, 2)}</pre>
  //   <pre>{JSON.stringify(classes, null, 2)}</pre>
  // </div>
  return (
    <div>
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
