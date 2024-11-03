import {
  getDashboardData,
  getMentorLeaderboardDataForDashboard,
} from "@/actions/getLeaderboard";
import Image from "next/image";
import { MdOutlineNoteAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { SiTicktick } from "react-icons/si";
import {
  getMentorStudents,
  getMentorCourses,
  getAllCourses,
  getEnrolledStudents,
} from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
const getGreeting = () => {
  const currentIST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
  const hour = currentIST.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};
// import OneSignal from "react-onesignal";
export default async function Home() {
  const greeting = getGreeting();
  const currentUser = await getCurrentUser();
  if (currentUser?.role === "STUDENT") {
    // student
    const data = await getDashboardData();
    if (!data) return;
    const {
      sortedSubmissions,
      assignmentsSubmitted,
      currentUser,
    } = data;

    const position = 0;
    let total = 0;

    sortedSubmissions.forEach((submission: any) => {
      if (submission?.enrolledUser?.user?.id === currentUser?.id) {
        total += submission?.totalPoints;
      }
    });

    let leaderboardMap = new Map();

    sortedSubmissions.forEach((submission: any) => {
      const userId = submission?.enrolledUser?.user?.id;
      const totalPoints = submission.totalPoints;

      if (leaderboardMap.has(userId)) {
        leaderboardMap.get(userId).totalPoints += totalPoints;
      } else {
        leaderboardMap.set(userId, {
          totalPoints: totalPoints,
        });
      }
    });

    const sortedLeaderboardArray = Array.from(leaderboardMap.entries()).sort(
      (a, b) => b[1].totalPoints - a[1].totalPoints,
    );

    sortedLeaderboardArray.forEach((entry, index) => {
      entry[1].rank = index + 1;
    });

    leaderboardMap = new Map(sortedLeaderboardArray);

    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-secondary-50">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-secondary-50">
            Here is your report
          </p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <Image
              unoptimized
              src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-game-score-wood-sign-style-png-image_6072790.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-primary-600">
              {total === 0 ? "NA" : total}
            </p>
            <h1 className="p-1 text-sm font-bold">
              Your current Score in the Leaderboard.
            </h1>
          </div>
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <Image
              unoptimized
              src="https://cdn-icons-png.flaticon.com/512/3150/3150115.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-primary-600">
              {total === 0
                ? "NA"
                : leaderboardMap.get(currentUser.id).rank
                  ? leaderboardMap.get(currentUser.id).rank
                  : "NA"}
            </p>
            <h1 className="p-1 text-sm font-bold">
              Your current rank in the Leaderboard.
            </h1>
          </div>
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <Image
              unoptimized
              src="https://i.postimg.cc/439rxz8g/images-removebg-preview.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-primary-600">
              {assignmentsSubmitted}
            </p>
            <h1 className="p-1 text-sm font-bold">
              No. of assignments submitted.
            </h1>
          </div>
        </div>
      </div>
    );
  } else if (currentUser?.role === "MENTOR") {
    // mentor
    // const mstudents = await getMentorStudents();
    const greeting = getGreeting();
    const mcourses = await getMentorCourses();
    const mleaderboard = await getMentorLeaderboardDataForDashboard();
    // return <pre>{JSON.stringify(mleaderboard, null, 2)}</pre>

    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-secondary-50">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-secondary-50">
            Here is your report
          </p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <PiStudentBold className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-primary-600">
              {/* {mstudents?.length} */}for now
            </p>
            <h1 className="p-1 text-sm font-bold">Assigned mentees</h1>
          </div>
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-primary-600">
              {mcourses?.length}
            </p>
            <h1 className="p-1 text-sm font-bold">No of courses mentoring</h1>
          </div>
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <SiTicktick className="m-auto my-2 h-20 w-20 text-blue-400" />
            <p className="pt-2 font-bold text-primary-600">{mleaderboard}</p>
            <h1 className="p-1 text-sm font-bold">
              No of assignments evaluated
            </h1>
          </div>
        </div>
      </div>
    );
  } else if (currentUser?.role === "INSTRUCTOR") {
    // instructor
    const created = await getAllCourses();
    const greeting = getGreeting();
    // const students = await getEnrolledStudents();
    let total = 0;
    const count = 0;
    if (created) {
      for (const courses of created) {
        total += courses?._count.classes || 0;
      }
    }
    // if (students) {
    //   for (const student of students) {
    //     if (student?.role === "STUDENT") {
    //       count += 1;
    //     }
    //   }
    // }

    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-secondary-50">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-secondary-50">
            Here is your report
          </p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-primary-600">{created?.length}</p>
            <h1 className="p-1 text-sm font-bold">No of courses created</h1>
          </div>
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <SiGoogleclassroom className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-primary-600">{total}</p>
            <h1 className="p-1 text-sm font-bold">
              Total no of classes uploaded
            </h1>
          </div>
          <div className="w-80 rounded-md bg-secondary-50 p-2 text-secondary-900 shadow-xl">
            <PiStudentBold className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-primary-600">{count}</p>
            <h1 className="p-1 text-sm font-bold">
              Total no of students enrolled
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
