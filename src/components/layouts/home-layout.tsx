"use client"
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";

import { RxDashboard } from "react-icons/rx";
import { MdAirplay, MdOutlineAssignment } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { TbMessageQuestion } from "react-icons/tb";
import { useState } from "react";

const items = [
    {
        name: "Dashboard",
        icon: <RxDashboard />,
        path: "/"
    },
    {
        name: "Courses",
        icon: <MdOutlineAssignment />,
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
    },
    {
        name: "Playgrounds",
        icon: <MdAirplay />,
        path: "/playground/html-css-js"
    }
]

export default function HomeLayout({ children, currentUser }: {
    children: React.ReactNode,
    currentUser: any
}) {
    const [menu, setMenu] = useState<boolean>(true);
    return (
        <div className="flex">
            <Sidebar items={items} menu={menu} />
            <div className="w-full">
                <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
                {children}
            </div>
        </div>
    )
}