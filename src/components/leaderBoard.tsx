"use client";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Leaderboard({
  submissions,
  courses,
  currentUser,
  mentors,
  noOfSubmissions,
  attendance,
  totalClasses,
}: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [mentorUsername, setMentorUsername] = useState<any>(
    mentors ? mentors[0]?.username : null
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    let filteredSubmissions;
    if (currentUser.role === "INSTRUCTOR") {
      filteredSubmissions = submissions.filter(
        (x: any) =>
          x.enrolledUser.mentor.username === mentorUsername &&
          x?.assignment?.class?.course?.id === currentCourse
      );
    } else {
      filteredSubmissions = submissions.filter(
        (x: any) => x?.assignment?.class?.course?.id === currentCourse
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
          rank: submission.rank
        });
      }
    });

    const leaderboardArray = Array.from(leaderboardMap.values());

    leaderboardArray.forEach((data: any, index: any) => {
      data.assignments = noOfSubmissions[data.username] || 0;
      data.attendance = attendance[data.username]
        ? (attendance[data.username] * 100) / totalClasses
        : 0;
    });

    if (sortConfig) {
      leaderboardArray.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    } else {
      leaderboardArray.sort((a, b) => b.totalPoints - a.totalPoints);
    }

    setLeaderboardData(leaderboardArray);
  }, [currentCourse, submissions, mentorUsername, sortConfig]);

  const handleSort = (key: string) => {
    let direction = "descending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    } else if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "default";
    }

    if (direction === "default") {
      setSortConfig(null); // Reset to default sorting
    } else {
      setSortConfig({ key, direction });
    }
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaSort />;
    }
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };
  return (
    <div className="mx-2 md:mx-14 mt-1 flex flex-col gap-4">
      {/* Leaderboard-header */}
      <div className="flex flex-col text-center">
        <FaCrown className="h-20 w-20 m-auto text-yellow-400" />
        <h1 className="text-2xl font-semibold text-yellow-300">Leaderboard</h1>
      </div>
      {/* Mentors list for instructor */}
      {currentUser.role === "INSTRUCTOR" && (
        <div className="flex gap-3 mt-4">
          {mentors?.map((mentor: any) => (
            <button
              onClick={() => setMentorUsername(mentor.username)}
              key={mentor.id}
              className={`p-1 px-2 text-primary-500 rounded ${mentor.username === mentorUsername
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
      <div className="flex gap-3 mt-4">
        {courses?.map((course: any) => (
          <button
            hidden={course.isPublished === false}
            onClick={() => setCurrentCourse(course.id)}
            className={`rounded p-1 px-2 w-20 sm:w-auto ${currentCourse === course.id && "border rounded"
              }`}
            key={course.id}
          >
            <h1 className="truncate max-w-xs text-sm font-medium">
              {course.title}
            </h1>
          </button>
        ))}
      </div>
      {/* Leaderboard*/}
      {leaderboardData.length === 0 ? (
        <div>
          <p className=" text-xl font-semibold mt-5 flex justify-center items-center">
            No course is enrolled yet!
          </p>
          <Image
            src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
            height={400}
            className="m-auto"
            width={400}
            alt="icon"
          />
        </div>
      ) : (
        <table>
          <thead className="bg-slate-600">
            <tr>
              <th
                className="text-start pl-12 py-2 uppercase text-sm cursor-pointer"
                onClick={() => handleSort("rank")}
              >
                <div className="flex items-center gap-2">
                  Rank {getSortIcon("rank")}
                </div>
              </th>
              <th
                className="text-start uppercase text-sm cursor-pointer "
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Name {getSortIcon("name")}
                </div>
              </th>
              <th
                className="text-start uppercase text-sm cursor-pointer"
                onClick={() => handleSort("totalPoints")}
              >
                <div className="flex items-center gap-2">
                  Points {getSortIcon("totalPoints")}
                </div>
              </th>
              <th
                className="text-center uppercase text-sm cursor-pointer"
                onClick={() => handleSort("assignments")}
              >
                <div className="flex items-center gap-2">
                  Assignments {getSortIcon("assignments")}
                </div>
              </th>
              {currentUser.role !== "STUDENT" &&
                <th
                  className="text-center uppercase text-sm cursor-pointer"
                  onClick={() => handleSort("attendance")}
                >
                  <div className="flex items-center gap-2">
                    Attendance {getSortIcon("attendance")}
                  </div>
                </th>}
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((data: any, index: number) => {
              if (data.totalPoints === 0) return null;
              return (
                <tr
                  className={`p-2 px-4 border-b-2 bg-gradient-to-r hover:text-white hover:from-blue-600 hover:to-sky-500 ${currentUser.username === data.username && "from-yellow-500 to-yellow-600"}`}
                  key={index}
                >
                  <td className="pl-12">{index + 1}</td>
                  <td className="flex md:gap-4 items-center">
                    <Image
                      src={data?.image || "/images/placeholder.jpg"}
                      alt={`User ${index + 1}`}
                      width={35}
                      height={35}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="py-2">
                      <h1 className="text-md font-medium">{data.name}</h1>
                      <h1 className="text-xs">@{data.username}</h1>
                    </div>
                  </td>
                  <td>
                    <h1 className="font-medium text-xs md:text-sm">
                      {data.totalPoints} points
                    </h1>
                  </td>
                  <td className="text-center">{data.assignments}</td>

                  {
                    currentUser.role !== "STUDENT" &&
                    <td className="text-center">{data.attendance.toFixed(2)}%</td>
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
