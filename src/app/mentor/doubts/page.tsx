import { getMentorCourses } from "@/actions/courses"
import { getAllDoubtsForMentor } from "@/actions/doubts";
import MentorDoubts from "@/components/mentorDoubts";

export default async function mentorDoubts() {
    const courses = await getMentorCourses();
    const doubts = await getAllDoubtsForMentor();
    return (
        <div className="mx-2 md:mx-14 px-2 py-2 flex flex-col gap-4">
          <h1 className="text-center mx-10 text-xl font-bold border py-2">Resolve doubts</h1>
          {!courses ? <div className="text-center">Mentees have no enrolled courses!</div> : <MentorDoubts courses={courses} doubts={doubts}/>}
        </div>
      );
}