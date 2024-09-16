"use client";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";
import { useState, useEffect } from "react";
import NoDataFound from "./NoDataFound";

export default function Leaderboard({
  submissions,
  courses,
  currentUser,
  mentors,
}: {
  submissions: any[];
  courses: any[];
  currentUser: any;
  mentors?: any[];
}) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [mentorUsername, setMentorUsername] = useState<any>(
    mentors ? mentors[0]?.username : null,
  );
  useEffect(() => {
    let filteredSubmissions;
    if (currentUser.role === "INSTRUCTOR") {
      filteredSubmissions = submissions.filter(
        (x: any) =>
          x.enrolledUser.mentor.username === mentorUsername &&
          x?.assignment?.class?.course?.id === currentCourse,
      );
    } else {
      filteredSubmissions = submissions.filter(
        (x: any) => x?.assignment?.class?.course?.id === currentCourse,
      );
    }

    const leaderboardMap = new Map();

    filteredSubmissions.forEach((submission: any) => {
      const userId = submission?.enrolledUser?.user?.id;
      const totalPoints = submission.totalPoints;
      if (leaderboardMap.has(userId)) {
        leaderboardMap.get(userId).totalPoints += totalPoints;
      } else {
        leaderboardMap.set(userId, {
          userId: userId,
          totalPoints: totalPoints,
          name: submission.enrolledUser.user.name,
          username: submission.enrolledUser.user.username,
          image: submission.enrolledUser.user.image,
          rank: submission.rank,
        });
      }
    });

    const leaderboardArray = Array.from(leaderboardMap.values());

    leaderboardArray.sort((a, b) => b.totalPoints - a.totalPoints);

    setLeaderboardData(leaderboardArray);
  }, [currentCourse, submissions, mentorUsername]);

  return (
    <div className="mx-2 mb-10 mt-6 flex flex-col gap-4 md:mx-14">
      {/* Leaderboard-header */}
      <div className="flex flex-col text-center">
        <FaCrown className="m-auto h-20 w-20 text-blue-500 dark:text-yellow-400" />
        <h1 className="text-2xl font-semibold text-blue-500 dark:text-yellow-400">
          Leaderboard
        </h1>
      </div>
      {/* Mentors list for instructor */}
      {currentUser.role === "INSTRUCTOR" && (
        <div className="mt-4 flex gap-3">
          {mentors?.map((mentor: any) => (
            <button
              onClick={() => setMentorUsername(mentor.username)}
              key={mentor.id}
              className={`rounded p-1 px-2 text-blue-500 dark:text-primary-500 ${
                mentor.username === mentorUsername
                  ? "shadow-sm shadow-primary-500"
                  : ""
              }`}
            >
              {mentor.username}
            </button>
          ))}
        </div>
      )}
      {/* Courses list */}
      <div className="mt-4 flex gap-3">
        {courses?.map((course: any) => (
          <button
            hidden={course.isPublished === false}
            onClick={() => setCurrentCourse(course.id)}
            className={`w-20 rounded p-1 px-2 sm:w-auto ${
              currentCourse === course.id && "rounded border"
            }`}
            key={course.id}
          >
            <h1 className="max-w-xs truncate text-sm font-medium">
              {course.title}
            </h1>
          </button>
        ))}
      </div>
      {/* Leaderboard*/}
      {leaderboardData.length === 0 ? (
        <NoDataFound message="No data found!" />
      ) : (
        <table>
          <thead className="bg-slate-600 text-white">
            <tr>
              <th className="py-2 pl-12 text-start text-sm uppercase">
                <div className="flex items-center gap-2">Rank</div>
              </th>
              <th className="text-start text-sm uppercase">
                <div className="flex items-center gap-2">Name</div>
              </th>
              <th className="text-start text-sm uppercase">
                <div className="flex items-center gap-2">Points</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((data: any, index: number) => {
              if (data.totalPoints === 0) return null;
              return (
                <tr
                  className={`border-b-2 bg-gradient-to-r p-2 px-4 hover:text-white ${
                    currentUser.username === data.username
                      ? "from-yellow-500/65 via-yellow-600/80 to-yellow-700"
                      : "hover:from-blue-600 hover:to-sky-500"
                  }`}
                  key={index}
                >
                  <td className="pl-12">{index + 1}</td>
                  <td className="flex items-center md:gap-4">
                    <Image
                      unoptimized
                      src={data?.image || "/images/placeholder.jpg"}
                      alt={`User ${index + 1}`}
                      width={35}
                      height={35}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="py-2">
                      <h1 className="text-md font-medium">{data.name}</h1>
                      <h1 className="text-xs">@{data.username}</h1>
                    </div>
                  </td>
                  <td>
                    <h1 className="text-xs font-medium md:text-sm">
                      {data.totalPoints} points
                    </h1>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
