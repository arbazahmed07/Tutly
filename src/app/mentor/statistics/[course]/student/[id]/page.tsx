import {
    getMentorPieChartData,
    getStudentEvaluatedAssigmentsForMentor,
  } from "@/actions/assignments";
import { getAttendanceOfStudent } from "@/actions/attendance";
  import StudentStatClient from "@/components/studentStatClient";
  
  export default async function Page({params}:any) {
    const { evaluated, underReview, unsubmitted, totalPoints}:any = await getStudentEvaluatedAssigmentsForMentor(params.id,params.course);
  const {classes,attendanceDates} = await getAttendanceOfStudent(params.id,params.course);

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
  