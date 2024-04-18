"use client"
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";

import { RxDashboard } from "react-icons/rx";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { TbMessageQuestion } from "react-icons/tb";
import { MdOutlineCastForEducation } from "react-icons/md";
import { Suspense, useState } from "react";
import Loading from "@/app/loading";

const items = [
    {
        name: "Dashboard",
        icon: <RxDashboard />,
        path: "/"
    },
    {
        name: "Courses",
        icon: <MdOutlineCastForEducation />,
        path: "/courses"
    },
    {
        name: "Assignments",
        icon: <MdOutlineAssignment />,
        path: "/assignments"
    },
    {
        name: "Leaderboard",
        icon: <MdOutlineLeaderboard />,
        path: "/leaderboard"
    },
    {
        name: "Doubts",
        icon: <TbMessageQuestion />,
        path: "/doubts"
    }
]

export default function HomeLayout({ children, currentUser }: any) {
    const [menu, setMenu] = useState<boolean>(true);
    return (
        <div className="flex">
            <Sidebar items={items} menu={menu} />
            <div className="w-full">
                <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </div>
        </div>
    )
}