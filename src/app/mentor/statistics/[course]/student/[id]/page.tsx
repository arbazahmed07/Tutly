import {
  getMentorPieChartData,
  getStudentEvaluatedAssigmentsForMentor,
} from "@/actions/assignments";
import { getAttendanceOfStudent } from "@/actions/attendance";
import StudentStatClient from "@/components/studentStatClient";

interface StudentEvaluatedAssignments {
  evaluated: number;
  underReview: number;
  unsubmitted: number;
  totalPoints: number;
}

interface AttendanceData {
  classes: string[];
  attendanceDates: string[];
}

interface PageParams {
  params: {
    id: string;
    course: string;
  };
}

export default async function Page({ params }: PageParams) {
  const evaluatedData: StudentEvaluatedAssignments | null = 
    await getStudentEvaluatedAssigmentsForMentor(params.id, params.course);
  const { evaluated, underReview, unsubmitted, totalPoints } =
    evaluatedData ?? { evaluated: 0, underReview: 0, unsubmitted: 0, totalPoints: 0 };

  const attendanceData: AttendanceData | null = await getAttendanceOfStudent(
    params.id,
    params.course
  );

  const { classes, attendanceDates } =
    attendanceData ?? { classes: [], attendanceDates: [] };

  return (
    <div>
      <h1 className="p-10 text-2xl font-bold text-blue-400">
        Student - {params.id}
      </h1>
      <StudentStatClient
        studentId={params.id}
        courseId={params.course}
        totalEvaluatedAssignments={evaluated}
        totalPoints={totalPoints}
        forBarChart={[evaluated, underReview, unsubmitted]}
        classes={classes}
        attendanceDates={attendanceDates}
      />
    </div>
  );
}
