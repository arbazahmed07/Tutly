import {
  getMentorPieChartData,
  getStudentEvaluatedAssigments,
  getSubmissionsForMentorLineChart,
} from "@/actions/assignments";
import { getAttendanceForMentorBarChart } from "@/actions/attendance";
import { getEnrolledStudents, getMentorStudents } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import StudentStatClient from "@/components/studentStatClient";

export default async function Statistics() {
  const mentorPieChart = await getMentorPieChartData();
  const { evaluated, underReview, unsubmitted, totalPoints}:any = await getStudentEvaluatedAssigments();
  let loaderValue = !mentorPieChart
    ? 0
    : String(
        (mentorPieChart![0] * 100) / (mentorPieChart![0] + mentorPieChart![1])
      );
  loaderValue += "%";
  const sampleData: string[] = [
    "2024-05-01",
    "2024-05-02",
    "2024-05-03",
    "2024-05-15",
    "2024-05-16",
    "2024-05-17",
    // Add more dates
  ];

  return (
    <div>
      <StudentStatClient 
      totalEvaluatedAssigmentsOfStudent={evaluated} 
      totalPoints={totalPoints}
      forBarChart={[evaluated,underReview,unsubmitted]}
      />
    </div>
  );
}
