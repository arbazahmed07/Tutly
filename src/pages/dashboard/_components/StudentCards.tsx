import { StudentDashboardData } from "@/types/dashboard";

interface Props {
  data: StudentDashboardData;
  selectedCourse: string;
}

export function StudentCards({ data, selectedCourse }: Props) {
  const course = data.courses.find(c => c.courseId === selectedCourse);
  const completionPercentage = course 
    ? Math.round((course.assignmentsSubmitted / course.totalAssignments) * 100)
    : 0;

  return (
    <>
      <div className="w-80 rounded-md bg-white p-4 text-gray-900 shadow-xl">
        <div className="m-auto h-24 w-24 flex items-center justify-center">
          <img src="/score.png" alt="pencil" className="w-20 h-20 object-contain" />
        </div>
        <p className="pt-3 text-2xl font-bold text-blue-600">{course?.totalPoints || 0}</p>
        <h1 className="p-1 text-sm font-bold text-gray-700">Total Points Earned</h1>
      </div>
      <div className="w-80 rounded-md bg-white p-4 text-gray-900 shadow-xl">
        <div className="m-auto h-24 w-24 flex items-center justify-center">
          <img src="/leaderboard.png" alt="completion" className="w-20 h-20 object-contain" />
        </div>
        <p className="pt-3 text-2xl font-bold text-blue-600">{completionPercentage}%</p>
        <h1 className="p-1 text-sm font-bold text-gray-700">Course Completion</h1>
      </div>
      <div className="w-80 rounded-md bg-white p-4 text-gray-900 shadow-xl">
        <div className="m-auto h-24 w-24 flex items-center justify-center">
          <img src="/assignment.png" alt="assignment" className="w-20 h-20 object-contain" />
        </div>
        <p className="pt-3 text-2xl font-bold text-blue-600">
          {course?.assignmentsSubmitted || 0}
        </p>
        <h1 className="p-1 text-sm font-bold text-gray-700">Assignments Submitted</h1>
      </div>
    </>
  );
}