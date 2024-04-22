"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import React, { useState } from "react";

function ClassSidebar({ params, classes }: any) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  return (
    <div className="fixed z-50">
      <div
        className={`${
          !open && "hidden"
        } flex max-sm:absolute flex-col w-44 px-4 bg-background items-center py-3 gap-2 shadow-xl h-[93vh] relative`}
      >
        <h1 className="px-4 my-2">{classes[0].course?.title}</h1>
        {classes.map((x: any) => {
          return (
            <Link
              key={x.id}
              href={`/courses/${params.id}/class/${x.id}`}
              className={`px-6 py-2 flex items-center gap-2 cursor-pointer rounded hover:bg-primary-900 ${
                pathname === `/courses/${params.id}/class/${x.id}` &&
                "bg-primary-700"
              }`}
            >
              <MdOndemandVideo />
              {x.title}
            </Link>
          );
        })}
        <Link
          href={`/courses/${params.id}/class/new`}
          className={`px-6 py-2 flex items-center gap-2 cursor-pointer rounded hover:bg-primary-900`}
        >
          <MdOndemandVideo />
          class +
        </Link>
          
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-0 top-[250px] bg-primary-700 py-2 rounded-l-lg cursor-pointer"
        >
          <IoIosArrowBack />
        </div>
      </div>
      <div className="fixed">
      {!open && (
        <div
          onClick={() => setOpen(!open)}
          className="fixed left-0 top-[300px] bg-primary-700 py-2 rounded-r-lg cursor-pointer"
        >
          <IoIosArrowForward />
        </div>
      )}
    </div>
    </div>
  );
}

export default ClassSidebar;
