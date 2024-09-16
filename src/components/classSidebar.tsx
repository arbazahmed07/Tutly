"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useState } from "react";
import { MdAddToQueue } from "react-icons/md";
import { FaFolder } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa6";

function ClassSidebar({
  params,
  classes,
  title,
  currentUser,
  isCourseAdmin = false,
}: {
  params: any;
  classes: any;
  title: any;
  currentUser: any;
  isCourseAdmin: boolean;
}) {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const toggleFolder = (folderId: string) => {
    if (openFolders.includes(folderId)) {
      setOpenFolders(openFolders.filter((id) => id !== folderId));
    } else {
      setOpenFolders([...openFolders, folderId]);
    }
  };

  const groupedClasses: Record<string, any[]> = {};
  const classesWithoutFolders: any[] = [];
  classes.forEach((classItem: any) => {
    if (classItem.folderId) {
      if (!groupedClasses[classItem.folderId]) {
        groupedClasses[classItem.folderId] = [];
      }
      groupedClasses[classItem.folderId].push(classItem);
    } else {
      classesWithoutFolders.push(classItem);
    }
  });

  return (
    <div className="relative z-10">
      <div
        className={`min-w-[170px] ${
          !open && "hidden"
        } sticky flex h-dvh flex-col items-start gap-2 bg-background px-2 py-3 shadow-xl max-sm:absolute sm:top-10`}
      >
        <div className="flex items-center justify-center">
          <Link href={`/courses/${params.id}`} className="cursor-pointer">
            <h1 className="border-b-2 p-3 text-sm font-medium">{title}</h1>
          </Link>
        </div>
        {Object.keys(groupedClasses).map((folderId: string) => {
          const folder = classes.find(
            (c: any) => c.folderId === folderId,
          )?.Folder;
          if (folder) {
            return (
              <div key={folder.id}>
                <h2
                  onClick={() => toggleFolder(folder.id)}
                  className="flex cursor-pointer items-center justify-start px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {openFolders.includes(folder.id) ? (
                    <FaFolderOpen className="h-4 w-4" />
                  ) : (
                    <FaFolder className="h-4 w-4" />
                  )}
                  &nbsp; {folder.title}
                </h2>
                {openFolders.includes(folder.id) && (
                  <div className="ml-4">
                    {groupedClasses[folderId].map((classItem: any) => (
                      <Link
                        key={classItem.id}
                        href={`/courses/${params.id}/class/${classItem.id}`}
                        className={`flex cursor-pointer items-center gap-2 rounded-md px-6 py-2 hover:bg-blue-500 hover:text-white ${
                          pathname ===
                            `/courses/${params.id}/class/${classItem.id}` &&
                          "bg-sky-500 text-white"
                        }`}
                      >
                        <MdOndemandVideo />
                        {classItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
        })}
        {classesWithoutFolders.map((classItem: any) => (
          <Link
            key={classItem.id}
            href={`/courses/${params.id}/class/${classItem.id}`}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-6 py-2 text-white hover:bg-blue-500 ${
              pathname === `/courses/${params.id}/class/${classItem.id}` &&
              "bg-sky-500 text-white"
            }`}
          >
            <MdOndemandVideo />
            {classItem.title}
          </Link>
        ))}
        <div className="grow"></div>
        {pathname !== `/courses/${params.id}/class/new` &&
          (currentUser?.role === "INSTRUCTOR" || isCourseAdmin) && (
            <Link
              href={`/courses/${params.id}/class/new`}
              className={`mb-16 flex cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-6 py-2 text-white`}
            >
              <MdAddToQueue />
              Add Class
            </Link>
          )}

        <div
          onClick={() => setOpen(!open)}
          className="absolute right-0 top-[250px] cursor-pointer rounded-l-lg bg-blue-500 py-2"
        >
          <IoIosArrowBack />
        </div>
      </div>
      <div className="">
        {!open && (
          <div
            onClick={() => setOpen(!open)}
            className="fixed left-0 top-[300px] cursor-pointer rounded-r-lg bg-blue-500 py-2"
          >
            <IoIosArrowForward />
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassSidebar;
