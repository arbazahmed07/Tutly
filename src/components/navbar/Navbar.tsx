"use client";
import React, { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import ThemeSwitch from "./ThemeSwitch";
import { GrMenu } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import Actions from "./Actions";
interface Props {
  // todo: change types
  currentUser?: any;
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
    <div className="shadow-md px-2 z-50 sticky top-0 backdrop-blur-3xl">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <div className="flex items-center gap-3">
            {!isCoursePage ? (
              <div
                onClick={Menu}
                className="p-2 rounded-full dark:hover:bg-secondary-800 hover:bg-neutral-300 cursor-pointer"
              >
                <GrMenu className="text-xl" />
              </div>
            ) : (
              <div
                onClick={Back}
                className="p-2 rounded-full dark:hover:bg-secondary-800 hover:bg-neutral-300 cursor-pointer"
              >
                <IoMdArrowRoundBack className="text-xl" />
              </div>
            )}
            <Link href="/" className="hidden md:flex">
              LMS
            </Link>
          </div>
        </div>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Actions currentUser={currentUser} />
        </Suspense> */}
        <div className="flex gap-3 items-center">
          <h1 className="text-sm font-medium">
            {
              currentUser?.role
            }
          </h1>
          <ThemeSwitch />
          <div className="rounded-full cursor-pointer dark:hover:bg-secondary-800 hover:bg-neutral-300 p-2">
              <div onClick={() => setPopover((prev)=>!prev)}>
                <IoMdNotificationsOutline className="text-xl"/>
                {/* <div className="absolute top-2 right-24 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </div> */}
              </div>
              {popover && (
                <div className="flex flex-col justify-between absolute right-0 text-zinc-700 w-64 mr-5 h-60 mt-5 text-center bg-white rounded-lg shadow-lg p-2">
                  <div>
                    <h1 className="text-xl font-bold text-blue-500">Notifications</h1> 
                    <p className="my-2 text-sm font-medium">No notifications recieved yet</p>  
                  </div>
                  <div>
                    <button className="w-full p-2.5 bg-blue-500 text-white rounded-md text-sm  font-medium">Clear all</button>
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
