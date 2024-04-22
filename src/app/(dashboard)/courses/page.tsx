import { getEnrolledCourses } from "@/actions/courses"
import CourseCard from "@/components/courseCard";

export default async function Courses() {
    const courses = await getEnrolledCourses();
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 m-2 md:m-6">
            {
                courses?.map(async(course) => {
                    const classesCompleted = 0;
                    let percent;
                    if(course._count.classes==0) percent=0;
                    else percent = (classesCompleted*100)/(course._count.classes);

                    return (
                        <CourseCard key={course.id} course={course} percent={percent} classesCompleted={classesCompleted}/>
                    )
                })
            }
        </div>
    )
}