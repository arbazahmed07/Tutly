"use client";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import UserProfile from "./UserProfile";
import ThemeSwitch from "./ThemeSwitch";
import { GrMenu } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { type User } from "@prisma/client";

interface Props {
  currentUser?: User | null;
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ currentUser, menu, setMenu }: Props) => {
  const router = useRouter();
  const [popover, setPopover] = useState(false);
  const pathname = usePathname();
  const Back = () => {
    router.back();
  };
  const Menu = () => {
    setMenu(!menu);
  };
  const isCoursePage = pathname.startsWith("/courses/");

  return (
    <div className="sticky top-0 z-50 px-2 shadow-md backdrop-blur-3xl">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <div className="flex items-center gap-3">
            {!isCoursePage ? (
              <div
                onClick={Menu}
                className="cursor-pointer rounded-full p-2 hover:bg-neutral-300 dark:hover:bg-secondary-800"
              >
                <GrMenu className="text-xl" />
              </div>
            ) : (
              <div
                onClick={Back}
                className="cursor-pointer rounded-full p-2 hover:bg-neutral-300 dark:hover:bg-secondary-800"
              >
                <IoMdArrowRoundBack className="text-xl" />
              </div>
            )}
            <Link href="/" className="hidden md:flex">
              LMS
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-medium">{currentUser?.role}</h1>
          <ThemeSwitch />
          <div className="cursor-pointer rounded-full p-2 hover:bg-neutral-300 dark:hover:bg-secondary-800">
            <div onClick={() => setPopover((prev) => !prev)}>
              <IoMdNotificationsOutline className="text-xl" />
              {/* <div className="absolute top-2 right-24 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </div> */}
            </div>
            {popover && (
              <div className="absolute right-0 mr-5 mt-5 flex h-60 w-64 flex-col justify-between rounded-lg bg-white p-2 text-center text-zinc-700 shadow-lg">
                <div>
                  <h1 className="text-xl font-bold text-blue-500">
                    Notifications
                  </h1>
                  <p className="my-2 text-sm font-medium">
                    No notifications recieved yet
                  </p>
                </div>
                <div>
                  <button className="w-full rounded-md bg-blue-500 p-2.5 text-sm font-medium text-white">
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
