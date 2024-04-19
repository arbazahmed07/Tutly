import { getAllCourses, getCourseClasses } from "@/actions/courses"
import CourseCard from "@/components/courseCard";

export default async function Courses() {
    const courses = await getAllCourses();
    return (
        <div className="m-14 flex gap-14 flex-wrap">
            {
                courses?.map(async(course) => {
                    const classesCompleted = 0;
                    let percent;
                    if(course._count.Classes==0) percent=0;
                    else percent = (classesCompleted*100)/(course._count.Classes);

                    return (
                        <CourseCard key={course.id} course={course} percent={percent} classesCompleted={classesCompleted}/>
                    )
                })
            }
        </div>
    )
}