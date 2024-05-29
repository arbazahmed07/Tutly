import {
  getMentorPieChartData,
  getStudentEvaluatedAssigments,
  getSubmissionsForMentorLineChart,
} from "@/actions/assignments";
import { getAttendanceForMentorBarChart, getAttendanceOfStudent } from "@/actions/attendance";
import { getEnrolledStudents, getMentorStudents } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import StudentStatClient from "@/components/studentStatClient";
import { json } from "stream/consumers";

export default async function Statistics() {
  const mentorPieChart = await getMentorPieChartData();
  const { evaluated, underReview, unsubmitted, totalPoints}:any = await getStudentEvaluatedAssigments();
  let loaderValue = !mentorPieChart
    ? 0
    : String(
        (mentorPieChart![0] * 100) / (mentorPieChart![0] + mentorPieChart![1])
      );
  loaderValue += "%";
  const currentUser = await getCurrentUser();
  if(!currentUser) return <div className="text-center text-xl font-bold">Please Login to view your Statistics</div>
  const attendanceDates = await getAttendanceOfStudent(currentUser.username);
  // return <pre>{JSON.stringify(attendanceDates,null,2)}</pre>

  return (
    <div>
      <StudentStatClient 
      totalEvaluatedAssigmentsOfStudent={evaluated} 
      totalPoints={totalPoints}
      forBarChart={[evaluated,underReview,unsubmitted]}
      attendanceDates={attendanceDates}
      />
    </div>
  );
}
