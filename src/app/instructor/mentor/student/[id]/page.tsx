import {
    getMentorPieChartData,
    getStudentEvaluatedAssigmentsForMentor,
  } from "@/actions/assignments";
import { getAttendanceOfStudent } from "@/actions/attendance";
  import StudentStatClient from "@/components/studentStatClient";
  
  export default async function Page({params}:any) {
    const mentorPieChart = await getMentorPieChartData();
    const { evaluated, underReview, unsubmitted, totalPoints}:any = await getStudentEvaluatedAssigmentsForMentor(params.id);
    let loaderValue = !mentorPieChart
      ? 0
      : String(
          (mentorPieChart![0] * 100) / (mentorPieChart![0] + mentorPieChart![1])
        );
    loaderValue += "%";
    const {classes,attendanceDates} = await getAttendanceOfStudent(params.id);
  
    return (
      <div>
        <h1 className="text-blue-400 text-2xl p-10 font-bold">Student - {params.id}</h1>
        <StudentStatClient 
        totalEvaluatedAssigmentsOfStudent={evaluated}
        totalPoints={totalPoints}
        forBarChart={[evaluated,underReview,unsubmitted]}
        classes={classes}
        attendanceDates={attendanceDates}
        />
      </div>
    );
  }
  