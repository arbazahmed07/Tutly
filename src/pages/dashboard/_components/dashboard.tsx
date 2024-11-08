import { getGreeting } from "@/utils/getGreeting";
import { DashboardData } from "@/types/dashboard";
import { useEffect, useState } from "react";
import { StudentCards } from "./StudentCards";
import { MentorCards } from "./MentorCards";
import { InstructorCards } from "./InstructorCards";

interface Props {
  data: DashboardData | null;
}

const Dashboard = ({ data }: Props) => {
  if (!data) return <div>No data available</div>;

  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const hasCourses = (data: DashboardData): data is { courses: any[], currentUser: any } => {
    return "courses" in data && Array.isArray(data.courses);
  };


  useEffect(() => {
    if (hasCourses(data) && data.courses.length > 0) {
      setSelectedCourse(data.courses[0]?.courseId || "");
    }
  }, [data]);

  const renderCards = () => {
    if ("currentUser" in data && "courses" in data) {
      return <StudentCards data={data} selectedCourse={selectedCourse} />;
    } else if ("courses" in data) {
      return <MentorCards data={data} selectedCourse={selectedCourse} />;
    } else {
      return <InstructorCards data={data} />;
    }
  };

  return (
    <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
      <div className="p-10">
        <h1 className="text-2xl font-bold text-white">
          {getGreeting()} 👋
        </h1>
        {hasCourses(data) && (
          <p className="mt-3 text-base font-medium text-white">
            Here is your report for
            <select 
              className="ml-2 rounded-md bg-white px-2 py-1 text-gray-900" 
              onChange={(e) => setSelectedCourse(e.target.value)} 
              value={selectedCourse}
            >
              {data.courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
          </p>
        )}
      </div>
      <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
        {renderCards()}
      </div>
    </div>
  );
};

export default Dashboard;