"use client";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function Leaderboard({ submissions, courses, currentUser }: any) {
  const [currentCourse, setCurrentCourse] = useState<string>(courses[0]?.id);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {
    const filteredSubmissions = submissions.filter(
      (x: any) => x?.assignment?.class?.course?.id === currentCourse
    );

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
        });
      }
    });

    const leaderboardArray = Array.from(leaderboardMap.values());

    leaderboardArray.sort((a, b) => b.totalPoints - a.totalPoints);

    setLeaderboardData(leaderboardArray);
  }, [currentCourse, submissions]);

  return (
    <div className="mx-2 md:mx-14 mt-1 flex flex-col gap-4">
      <div className="flex flex-col text-center">
        <FaCrown className="h-20 w-20 m-auto text-yellow-400" />
        <h1 className="text-2xl font-semibold text-yellow-300">Leaderboard</h1>
      </div>
      <div className="flex gap-3 mt-4">
        {courses?.map((course: any) => (
          <button
            hidden={course.isPublished === false}
            onClick={() => setCurrentCourse(course.id)}
            className={`rounded p-2 w-20 sm:w-auto ${
              currentCourse === course.id && "border rounded"
            }`}
            key={course.id}
          >
            <h1 className="truncate max-w-xs text-sm font-medium">
              {course.title}
            </h1>
          </button>
        ))}
      </div>
      <div className="flex flex-col">
        {leaderboardData.length === 0 ? (
          <div>
            <p className=' text-xl font-semibold mt-5 flex justify-center items-center'>
              No course is enrolled yet!
            </p>
            <Image
                src="https://i.postimg.cc/N0JMHNDw/undraw-Notify-re-65on-1-removebg-preview.png"
                height={400}
                className="m-auto "
                width={400}
                alt=""
              />
          </div>
        ) : (
          leaderboardData.map((data: any, index: number) => {
            if(data.totalPoints === 0||(currentUser?.role==="STUDENT"&&index>10)) return null
            return (
            <div
              className={`p-2 px-4 border-b-2 bg-gradient-to-r hover:text-white hover:from-blue-600 hover:to-sky-500`}
              key={index}
            > 
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 md:gap-10 items-center">
                    <h1>{index + 1}</h1>
                    <Image
                      src={data?.image || "/images/placeholder.jpg"}
                      alt={`User ${index + 1}`}
                      width={35}
                      height={35}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="py-2">
                      <h1 className="text-sm font-medium">{data.name}</h1>
                      <h1 className="text-xs">@{data.username}</h1>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-medium text-xs md:text-sm">
                      {data.totalPoints} points
                    </h1>
                  </div>
                </div>
            </div>
          )})
        )}
      </div>
    </div>
  );
}
