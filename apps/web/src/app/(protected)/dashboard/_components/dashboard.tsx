"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  DashboardData,
  InstructorDashboardData,
  MentorDashboardData,
} from "../types";

import { InstructorCards } from "./InstructorCards";
import { MentorCards } from "./MentorCards";
import { StudentCards } from "./StudentCards";

const getGreeting = () => {
  const currentIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hour = currentIST.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

interface Props {
  data: DashboardData | null;
  name: string | null;
  currentUser: { role: string };
}

const Dashboard = ({ data, name, currentUser }: Props) => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  useEffect(() => {
    if (data && "courses" in data && data.courses.length > 0) {
      setSelectedCourse(data.courses[0]?.courseId ?? "");
    }
  }, [data]);

  if (!data) return <div>No data available</div>;

  const renderCards = () => {
    if (currentUser.role === "STUDENT" && "currentUser" in data) {
      return <StudentCards data={data} selectedCourse={selectedCourse} />;
    } else if (currentUser.role === "MENTOR" && "courses" in data) {
      return <MentorCards data={data as MentorDashboardData} selectedCourse={selectedCourse} />;
    } else if (currentUser.role === "INSTRUCTOR") {
      return <InstructorCards data={data as InstructorDashboardData} selectedCourse={selectedCourse} />;
    }
    return null;
  };

  const renderCourseSelector = () => {
    if ("courses" in data && data.courses.length > 0) {
      return (
        <div className="text-base font-medium text-white">
          <Select
            value={selectedCourse}
            onValueChange={(value: string) => setSelectedCourse(value)}
            defaultValue={data.courses[0]?.courseId ?? ""}
          >
            <SelectTrigger className="ml-2 rounded-md bg-white px-2 py-1 text-gray-900">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent align="end">
              {data.courses.map((course) => (
                <SelectItem key={course.courseId} value={course.courseId ?? ""}>
                  {course.courseTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="m-2 h-40 rounded-lg bg-gradient-to-l from-blue-400 to-blue-600">
        <div className="flex md:flex-row flex-col justify-between items-center p-8">
          <h1 className="text-2xl font-bold text-white">
            {getGreeting()} {name} 👋
          </h1>
          <div className="md:mt-0 mt-6">{renderCourseSelector()}</div>
        </div>
        <div className="p-2 text-center">{renderCards()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
