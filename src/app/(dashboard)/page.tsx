import { getDashboardData,getMentorLeaderboardData } from "@/actions/getLeaderboard";
import Image from "next/image";
import { MdOutlineNoteAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { getMentorStudents,getMentorCourses, getAllCourses,getEnrolledStudents } from "@/actions/courses";
export default async function Home() {
  const data = await getDashboardData();
  const mstudents = await getMentorStudents()
  const mcourses=await getMentorCourses()
  const mleaderboard=await getMentorLeaderboardData()
  const created=await getAllCourses()
  const students=await getEnrolledStudents()

  if(!data) return;
  let total=0

  const { position , points, assignmentsSubmitted, assignmentsPending, currentUser } = data;
  if (created) {
    for (const courses of created) {
        total += courses?._count.classes || 0;
    }
  }

  return (
    <div className="h-60 bg-gradient-to-l from-blue-400 to-blue-600 m-2 rounded-lg">
      <div className="p-10">
        <h1 className="text-secondary-50 font-bold text-2xl">Welcome back {currentUser?.name} 👏</h1>
          <p className="text-secondary-50 font-medium text-base mt-3">Here is your report for { }</p>
      </div>
        {
          currentUser?.role==="STUDENT"&&
          <div className="flex mb-10 p-2 text-center gap-4 justify-center flex-wrap">
            <div className="w-80 rounded-md shadow-xl p-2 bg-secondary-50 text-secondary-900">
              <Image src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png" alt="" height={100} width={110} className="m-auto" />
              <p className="text-primary-600 font-bold pt-2">{points ? points : 0}</p>
              <h1 className="p-1 text-sm font-bold">Your current Score in the Leaderboard.</h1>
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
              <Image src="https://cdn-icons-png.flaticon.com/512/3150/3150115.png" alt="" height={100} width={110} className="m-auto" />
              <p className="text-primary-600 font-bold pt-2">{position? position : "NA"}</p>
              <h1 className="p-1 text-sm font-bold">Your current rank in the Leaderboard.</h1>
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
              <Image src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png" alt="" height={100} width={110} className="m-auto" />
              <p className="text-primary-600 font-bold pt-2">{assignmentsSubmitted}</p>
              <h1 className="p-1 text-sm font-bold">No. of assignments submitted.</h1>
            </div>
          </div>
        }
        {
          currentUser?.role==="MENTOR"&&
          <div className="flex mb-10 p-2 text-center gap-4 justify-center flex-wrap">
            <div className="w-80 rounded-md shadow-xl p-2 bg-secondary-50 text-secondary-900">
              <Image src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png" alt="" height={100} width={110} className="m-auto" />
              <p className="text-primary-600 font-bold pt-2">{mstudents?.length}</p>
              <h1 className="p-1 text-sm font-bold">Assigned mentees</h1>
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
              <Image src="https://cdn-icons-png.flaticon.com/512/3150/3150115.png" alt="" height={100} width={110} className="m-auto" />
              <p className="text-primary-600 font-bold pt-2">{mcourses?.length}</p>
              <h1 className="p-1 text-sm font-bold">No of courses present</h1>   
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
              <Image src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png" alt="" height={100} width={110} className="m-auto" />
              <div>
                <p className="text-primary-600 font-bold pt-2">{mleaderboard?.sortedSubmissions?.length}</p>
                <h1 className="p-1 text-sm font-bold">No of assignments evaluated</h1>
              </div>
            </div>
          </div>
        }
        {
          currentUser?.role==="INSTRUCTOR"&&
          <div className="flex mb-10 p-2 text-center gap-4 justify-center flex-wrap">
            <div className="w-80 rounded-md shadow-xl p-2 bg-secondary-50 text-secondary-900">
              <MdOutlineNoteAlt className="m-auto h-24 w-24 text-zinc-500"/>
               <p className="text-primary-600 font-bold pt-2">{created?.length}</p>
              <h1 className="p-1 text-sm font-bold">No of courses created</h1>
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
              <SiGoogleclassroom className="m-auto h-24 w-24 text-zinc-500"/>
              <p className="text-primary-600 font-bold pt-2">{total}</p>
              <h1 className="p-1 text-sm font-bold">Total no of classes uploaded</h1>
            </div>
            <div className="w-80 rounded-md shadow-xl bg-secondary-50 text-secondary-900 p-2">
              <PiStudentBold  className="m-auto h-24 w-24 text-zinc-500"/>
              <p className="text-primary-600 font-bold pt-2">{students?.length}</p>
              <h1 className="p-1 text-sm font-bold">Total no of students</h1>
            </div>
          </div>
        }
    </div>
  );
}
