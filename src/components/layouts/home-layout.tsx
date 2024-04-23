"use client";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";

import { RxDashboard } from "react-icons/rx";
import { MdAirplay, MdOutlineAssignment } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { TbMessageQuestion } from "react-icons/tb";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: any;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const pathname = usePathname();
  const isCoursePage = pathname.startsWith("/courses/");
  const access =
    currentUser?.role === "MENTOR" || currentUser?.role === "INSTRUCTOR";

  let items;
  if (access) {
    items = [
      {
        name: "Dashboard",
        icon: <RxDashboard />,
        path: "/",
      },
      {
        name: "Courses",
        icon: <FaChalkboardTeacher />,
        path: "/courses",
      },
      {
        name: "Assignments",
        icon: <MdOutlineAssignment />,
        path: "/mentor/assignments",
      },
      {
        name: "Leaderboard",
        icon: <MdOutlineLeaderboard />,
        path: "/leaderboard",
      },
      {
        name: "Doubts",
        icon: <TbMessageQuestion />,
        path: "/mentor/doubts",
      },
      {
        name: "Playgrounds",
        icon: <MdAirplay />,
        path: "/playground/html-css-js",
      },
    ];
  } else {
    items = [
      {
        name: "Dashboard",
        icon: <RxDashboard />,
        path: "/",
      },
      {
        name: "Courses",
        icon: <FaChalkboardTeacher />,
        path: "/courses",
      },
      {
        name: "Assignments",
        icon: <MdOutlineAssignment />,
        path: "/assignments",
      },
      {
        name: "Leaderboard",
        icon: <MdOutlineLeaderboard />,
        path: "/leaderboard",
      },
      {
        name: "Doubts",
        icon: <TbMessageQuestion />,
        path: "/doubts",
      },
      {
        name: "Playgrounds",
        icon: <MdAirplay />,
        path: "/playground/html-css-js",
      },
    ];
  }

  return (
    <div className="w-full">
      <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
      <div className="flex">
        {!isCoursePage && <Sidebar items={items} menu={menu} setMenu={setMenu} />}
        <Suspense fallback={<Loading />}>
          <div className="w-full">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
