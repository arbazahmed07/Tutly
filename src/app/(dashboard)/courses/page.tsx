import { createCourse, getEnrolledCourses } from "@/actions/courses";
import CourseCard from "@/components/courseCard";
import Image from "next/image";
import getCurrentUser from "@/actions/getCurrentUser";
import AddCourse from "@/components/addCourse";

export default async function Courses() {
  const courses = await getEnrolledCourses();
  const currentUser = await getCurrentUser();
  return (
    <div className="w-full">
      <div className="flex justify-center">
        {courses?.length === 0  ? (
            <div hidden={currentUser?.role === 'INSTRUCTOR'}>
                <div>
                  <p className=' text-xl font-semibold mt-5 flex justify-center items-center'>
                    No course is enrolled yet!
                  </p>
                  <Image
                      src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
                      height={400}
                      className="m-auto "
                      width={400}
                      alt=""
                    />
                </div>
              {currentUser?.role === "INSTRUCTOR" && <AddCourse />}
            </div> 
        ) : (
          <div className="flex flex-wrap">
            {courses?.map( (course) => {
              return <CourseCard currentUser={currentUser} key={course.id} course={course} />;
            })}
            {currentUser?.role === "INSTRUCTOR" && <AddCourse />}
          </div>
        )}
      </div>
    </div>

  );
}
