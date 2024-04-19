import { getAllCourses, getCourseClasses } from "@/actions/getAllCourses"
import CourseCard from "@/components/courseCard";

export default async function Courses() {
    const courses = await getAllCourses();
    return (
        <div className="m-14 flex flex-wrap">
            {
                courses?.map(async(course) => {
                    // classes of each course
                    const classes = await getCourseClasses({id:course.id})
                    // calculation
                    const classesCompleted = 0;
                    let percent;
                    if(classes.length==0) percent=0;
                    else percent = classesCompleted*100/classes.length;

                    return (
                        <CourseCard key={course.id} course={course} percent={percent} classesCompleted={classesCompleted} classes={classes}/>
                    )
                })
            }
        </div>
    )
}