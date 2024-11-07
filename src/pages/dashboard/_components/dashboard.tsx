import { MdOutlineNoteAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { SiTicktick } from "react-icons/si";
import { useEffect, useState } from "react";

const getGreeting = () => {
  const currentIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hour = currentIST.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

interface DashboardProps {
  currentUser: any;
  data: {
    sortedSubmissions: any[];
    assignmentsSubmitted: number;
    currentUser: any;
    hasCourse: boolean;
  } | null;
}

export default function Dashboard({ currentUser, data }: DashboardProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [courseStats, setCourseStats] = useState({
    total: 0,
    rank: "NA",
    assignmentsSubmitted: 0
  });

  const greeting = getGreeting();

  useEffect(() => {
    if (data?.sortedSubmissions && selectedCourse) {
      calculateCourseStats(data.sortedSubmissions, selectedCourse);
    }
  }, [selectedCourse, data]);

  const calculateCourseStats = (submissions: any[], courseId: string) => {
    // Filter submissions for selected course
    const courseSubmissions = submissions.filter(
      (sub: any) => sub.assignment?.class?.course?.id === courseId
    );

    // Calculate total points for current user in this course
    const total = courseSubmissions.reduce((acc: number, submission: any) => {
      if (submission?.enrolledUser?.user?.id === currentUser?.id) {
        return acc + (submission?.totalPoints || 0);
      }
      return acc;
    }, 0);

    // Calculate rank for current user in this course
    const leaderboardMap = new Map();
    courseSubmissions.forEach((submission: any) => {
      const userId = submission?.enrolledUser?.user?.id;
      const points = submission.totalPoints || 0;

      if (leaderboardMap.has(userId)) {
        leaderboardMap.get(userId).totalPoints += points;
      } else {
        leaderboardMap.set(userId, { totalPoints: points });
      }
    });

    const sortedLeaderboard = Array.from(leaderboardMap.entries())
      .sort((a, b) => b[1].totalPoints - a[1].totalPoints);

    const userRank = sortedLeaderboard.findIndex(
      ([userId]) => userId === currentUser.id
    ) + 1;

    // Count assignments submitted for this course
    const assignmentsSubmitted = courseSubmissions.filter(
      (x: any) => x.enrolledUser.user.id === currentUser.id
    ).length;

    setCourseStats({
      total,
      rank: userRank.toString() || "NA",
      assignmentsSubmitted
    });
  };

  if (currentUser?.role === "STUDENT") {
    const courses = data?.sortedSubmissions
      ?.map((sub: any) => sub.assignment?.class?.course)
      .filter((course: any) => course != null)
      .filter((course: any, index: number, self: any[]) => 
        index === self.findIndex((c) => c.id === course.id)
      );

    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-white">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-white">Here is your report for </p>
          <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
            {courses?.map((course: any) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <img
              src="/score.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-blue-600">
              {courseStats.total === 0 ? "NA" : courseStats.total}
            </p>
            <h1 className="p-1 text-sm font-bold">Your current Score in the Leaderboard.</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <img
              src="/leaderboard.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-blue-600">{courseStats.rank}</p>
            <h1 className="p-1 text-sm font-bold">Your current rank in the Leaderboard.</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <img
              src="/assignment.png"
              alt=""
              height={100}
              width={110}
              className="m-auto"
            />
            <p className="pt-2 font-bold text-blue-600">{courseStats.assignmentsSubmitted}</p>
            <h1 className="p-1 text-sm font-bold">No. of assignments submitted.</h1>
          </div>
        </div>
      </div>
    );
  } else if (currentUser?.role === "MENTOR") {
    // mentor
    const greeting = getGreeting();
    // const mcourses = await getMentorCourses();
    // const mleaderboard = await getMentorLeaderboardDataForDashboard();
    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-white">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-white">Here is your report</p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <PiStudentBold className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-blue-600">{/* {mstudents?.length} */}for now</p>
            <h1 className="p-1 text-sm font-bold">Assigned mentees</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
            {/* <p className="pt-2 font-bold text-blue-600">{mcourses?.length}</p> */}
            <h1 className="p-1 text-sm font-bold">No of courses mentoring</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <SiTicktick className="m-auto my-2 h-20 w-20 text-blue-400" />
            {/* <p className="pt-2 font-bold text-blue-600">{mleaderboard}</p> */}
            <h1 className="p-1 text-sm font-bold">No of assignments evaluated</h1>
          </div>
        </div>
      </div>
    );
  } else if (currentUser?.role === "INSTRUCTOR") {
    // instructor
    // const created = await getAllCourses();
    const greeting = getGreeting();
    let total = 0;
    const count = 0;
    // if (created) {
    //   for (const courses of created) {
    //     total += courses?._count.classes || 0;
    //   }
    // }
    return (
      <div className="m-2 h-60 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-white">
            {greeting} {currentUser?.name} 👋
          </h1>
          <p className="mt-3 text-base font-medium text-white">Here is your report</p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-4 p-2 text-center">
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <MdOutlineNoteAlt className="m-auto h-24 w-24 text-blue-400" />
            {/* <p className="pt-2 font-bold text-blue-600">{created?.length}</p> */}
            <h1 className="p-1 text-sm font-bold">No of courses created</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <SiGoogleclassroom className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-blue-600">{total}</p>
            <h1 className="p-1 text-sm font-bold">Total no of classes uploaded</h1>
          </div>
          <div className="w-80 rounded-md bg-white p-2 text-gray-900 shadow-xl">
            <PiStudentBold className="m-auto h-24 w-24 text-blue-400" />
            <p className="pt-2 font-bold text-blue-600">{count}</p>
            <h1 className="p-1 text-sm font-bold">Total no of students enrolled</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No user found!</div>
  }
}
