import { createCourse, getEnrolledCourses } from "@/actions/courses";
import CourseCard from "@/components/courseCard";
import Image from "next/image";
import getCurrentUser from "@/actions/getCurrentUser";
import AddCourse from "@/components/addCourse";
import NoDataFound from "@/components/NoDataFound";

export default async function Courses() {
  const courses = await getEnrolledCourses();
  const currentUser = await getCurrentUser();
  return (
    <div className="w-full">
      <div className="flex w-full">
        {courses?.length === 0 ? (
          <div>
            {currentUser?.role === "INSTRUCTOR" ? (
              <AddCourse />
            ) : (
              <NoDataFound message="No courses found!" />
            )}
          </div>
        ) : (
          <div className="flex flex-wrap">
            {courses?.map((course) => {
              return (
                <CourseCard
                  currentUser={currentUser}
                  key={course.id}
                  course={course}
                />
              );
            })}
            {currentUser?.role === "INSTRUCTOR" && <AddCourse />}
          </div>
        )}
      </div>
    </div>
  );
}
