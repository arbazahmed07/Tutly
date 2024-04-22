"use client"
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";

import { RxDashboard } from "react-icons/rx";
import { MdAirplay, MdOutlineAssignment } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { TbMessageQuestion } from "react-icons/tb";
import { MdOutlineCastForEducation } from "react-icons/md";
import { Suspense,  useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import { usePathname } from "next/navigation";

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
    const pathname = usePathname();
    const isCoursePage = pathname.startsWith('/courses/');
    return (
        <div className="flex">
            {!isCoursePage&&<Sidebar items={items} menu={menu} setMenu={setMenu}/>}
            <div className="w-full">
                <Navbar currentUser={currentUser} menu={menu} setMenu={setMenu} />
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
        </div>
    )
}