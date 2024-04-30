import { createCourse, getEnrolledCourses } from "@/actions/courses";
import CourseCard from "@/components/courseCard";
import img from "/public/assets/notEnrolled.png";
import { BsDropbox } from "react-icons/bs";
import Image from "next/image";
import getCurrentUser from "@/actions/getCurrentUser";
import AddCourse from "@/components/addCourse";

export default async function Courses() {
  const courses = await getEnrolledCourses();
  const currentUser = await getCurrentUser();
  return (
    <div className="w-full">
      <div className="flex max-sm:justify-center">
        {courses?.length === 0  ? (
          <div className="text-center text-2xl font-bold mt-14">
            <div hidden={currentUser?.role === 'INSTRUCTOR'}>
              <div className="mt-3 flex items-center justify-center space-y-3">
                No Courses enrolled &nbsp; <BsDropbox className="w-7 h-7" />
              </div>
              <div className="text-center w-full m-auto flex flex-1 mt-10">
                <Image
                  src={img}
                  alt="unenrolled.png"
                  className="block m-auto w-[50%] h-[50%]"
                />
              </div>
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
