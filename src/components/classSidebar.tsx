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
    <>
      <div
        className={`${
          !open && "hidden"
        } flex flex-col px-4 items-center py-3 gap-2 shadow-xl min-h-[90vh] relative`}
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
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-0 top-[250px] bg-primary-700 py-2 rounded-l-lg cursor-pointer"
        >
          <IoIosArrowBack />
        </div>
      </div>
      {!open && (
        <div
          onClick={() => setOpen(!open)}
          className="absolute left-0 top-[300px] bg-primary-700 py-2 rounded-r-lg cursor-pointer"
        >
          <IoIosArrowForward />
        </div>
      )}
    </>
  );
}

export default ClassSidebar;
