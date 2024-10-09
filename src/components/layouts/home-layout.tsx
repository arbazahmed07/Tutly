"use client";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import { RxDashboard } from "react-icons/rx";
import { MdAirplay, MdOutlineAssignment } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import { usePathname } from "next/navigation";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { BsPersonRaisedHand } from "react-icons/bs";
import { MdOutlineQueryStats } from "react-icons/md";
import type { Role, User } from "@prisma/client";
import { TbReportAnalytics } from "react-icons/tb";

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser?: User | null;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const pathname = usePathname();
  const isCoursePage = pathname.startsWith("/courses/");

  interface sidebarItem {
    name: string;
    icon: React.ReactNode;
    path: string;
    isActive: boolean;
  }

  const InstructorItems = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      path: "/",
      isActive: pathname === "/",
    },
    {
      name: "Courses",
      icon: <FaChalkboardTeacher />,
      path: "/courses",
      isActive: pathname.startsWith("/courses"),
    },
    {
      name: "Assignments",
      icon: <MdOutlineAssignment />,
      path: "/instructor/assignments",
      isActive: pathname.includes("/assignments"),
    },
    {
      name: "Leaderboard",
      icon: <MdOutlineLeaderboard />,
      path: "/instructor/leaderboard",
      isActive: pathname === "/instructor/leaderboard",
    },
    {
      name: "Community",
      icon: <HiOutlineUserGroup />,
      path: "/community",
      isActive: pathname === "/community",
    },
    {
      name: "Attendance",
      icon: <BsPersonRaisedHand />,
      path: "/instructor/attendance",
      isActive: pathname.includes("/attendance"),
    },
    {
      name: "Statistics",
      icon: <MdOutlineQueryStats />,
      path: "/instructor/statistics",
      isActive: pathname.includes("/statistics"),
    },
    {
      name: "Report",
      icon: <TbReportAnalytics />,
      path: "/instructor/report",
      isActive: pathname === "/instructor/report",
    },
  ];

  const MentorItems = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      path: "/",
      isActive: pathname === "/",
    },
    {
      name: "Courses",
      icon: <FaChalkboardTeacher />,
      path: "/courses",
      isActive: pathname.startsWith("/courses"),
    },
    {
      name: "Assignments",
      icon: <MdOutlineAssignment />,
      path: "/mentor/assignments",
      isActive: pathname.includes("/assignments"),
    },
    {
      name: "Leaderboard",
      icon: <MdOutlineLeaderboard />,
      path: "/mentor/leaderboard",
      isActive: pathname === "/mentor/leaderboard",
    },
    {
      name: "Community",
      icon: <HiOutlineUserGroup />,
      path: "/community",
      isActive: pathname === "/community",
    },
    {
      name: "Attendance",
      icon: <BsPersonRaisedHand />,
      path: "/mentor/attendance",
      isActive: pathname === "/mentor/attendance",
    },
    {
      name: "Statistics",
      icon: <MdOutlineQueryStats />,
      path: "/mentor/statistics",
      isActive: pathname.includes("/statistics"),
    },
    {
      name: "Report",
      icon: <TbReportAnalytics />,
      path: "/mentor/report",
      isActive: pathname === "/mentor/report",
    },
  ];

  const StudentItems = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      path: "/",
      isActive: pathname === "/",
    },
    {
      name: "Courses",
      icon: <FaChalkboardTeacher />,
      path: "/courses",
      isActive: pathname.startsWith("/courses"),
    },
    {
      name: "Assignments",
      icon: <MdOutlineAssignment />,
      path: "/assignments",
      isActive: pathname.startsWith("/assignments"),
    },
    {
      name: "Leaderboard",
      icon: <MdOutlineLeaderboard />,
      path: "/leaderboard",
      isActive: pathname.startsWith("/leaderboard"),
    },
    {
      name: "Community",
      icon: <HiOutlineUserGroup />,
      path: "/community",
      isActive: pathname === "/community",
    },
    {
      name: "Playgrounds",
      icon: <MdAirplay />,
      path: "/playgrounds",
      isActive: pathname.startsWith("/playgrounds"),
    },
    {
      name: "Statistics",
      icon: <MdOutlineQueryStats />,
      path: "/statistics",
      isActive: pathname === "/statistics",
    },
  ];

  const roleMap: Record<Role, sidebarItem[]> = {
    MENTOR: MentorItems,
    INSTRUCTOR: InstructorItems,
    STUDENT: StudentItems,
  };

  const items = currentUser?.role ? roleMap[currentUser.role] : [];

  return (
    <div className="w-full">
      <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
      <div className="flex">
        {!isCoursePage && (
          <Sidebar items={items} menu={menu} setMenu={setMenu} />
        )}
        <Suspense fallback={<Loading />}>
          <div
            className={`w-full ${
              !isCoursePage && (menu ? "sm:pl-48" : "sm:pl-20")
            }`}
          >
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
