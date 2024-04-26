"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import React, { useState } from "react";
import { MdAddToQueue } from "react-icons/md";


function ClassSidebar({ params, classes,currentUser }: any) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  
  return (
    <div className="relative">
      <div
        className={`${
          !open && "hidden"
        } max-sm:absolute sticky sm:top-10 flex flex-col w-44 px-2 bg-background items-center py-3 gap-2 h-dvh shadow-xl`}
      >
        <Link href={`/courses/${params.id}`} className=" cursor-pointer">
          <h1 className="p-3 text-sm font-medium border-b-2">{classes[0]?.course?.title}</h1>
        </Link>
        {classes.map((x: any) => {
          return (
            <Link
              key={x.id}
              href={`/courses/${params.id}/class/${x.id}`}
              className={`px-6 py-2 flex items-center gap-2 cursor-pointer rounded-md hover:bg-blue-500 ${
                pathname === `/courses/${params.id}/class/${x.id}` &&
                "bg-sky-500"
              }`}
            >
              <MdOndemandVideo />
              {x.title}
            </Link>
          );
        })}
        {
          pathname !== `/courses/${params.id}/class/new` && currentUser?.role==='INSTRUCTOR' && (
            <Link
              href={`/courses/${params.id}/class/new`}
              className={`px-6 py-2 flex items-center gap-2 cursor-pointer rounded hover:bg-blue-500`}
            >
              <MdAddToQueue />
              class +
            </Link>
          )
        }

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-0 top-[250px] bg-blue-500 py-2 rounded-l-lg cursor-pointer"
        >
          <IoIosArrowBack />
        </div>
      </div>
      <div className="">
      {!open && (
        <div
          onClick={() => setOpen(!open)}
          className="fixed left-0 top-[300px] bg-blue-500 py-2 rounded-r-lg cursor-pointer"
        >
          <IoIosArrowForward />
        </div>
      )}
    </div>
    </div>
  );
}

export default ClassSidebar;
