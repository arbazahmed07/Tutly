import { type Class, Folder, User } from "@prisma/client";
import { useState } from "react";
import { FaFolder } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";

import NewClassDialog from "./newClass";

function ClassSidebar({
  courseId,
  classes,
  title,
  currentUser,
  isCourseAdmin = false,
}: {
  courseId: string;
  classes: (Class & { Folder: Folder | null })[];
  title: string;
  currentUser: User;
  isCourseAdmin: boolean;
}) {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [open, setOpen] = useState(true);
  const pathname = window.location.pathname;

  const toggleFolder = (folderId: string) => {
    if (openFolders.includes(folderId)) {
      setOpenFolders(openFolders.filter((id) => id !== folderId));
    } else {
      setOpenFolders([...openFolders, folderId]);
    }
  };

  const groupedClasses: Record<string, Class[]> = {};
  const classesWithoutFolders: Class[] = [];
  classes?.forEach((classItem: Class) => {
    if (classItem.folderId) {
      if (!groupedClasses[classItem.folderId]) {
        groupedClasses[classItem.folderId] = [];
      }

      groupedClasses[classItem.folderId]?.push(classItem);
    } else {
      classesWithoutFolders.push(classItem);
    }
  });

  return (
    <div className="relative z-10">
      <div
        className={`w-[190px] ${
          !open && "hidden"
        } sticky flex h-dvh flex-col items-start gap-2 bg-background px-2 py-3 shadow-xl max-sm:absolute sm:top-10`}
      >
        <div className="flex items-center justify-center">
          <a href={`/courses/${courseId}`} className="cursor-pointer">
            <h1 className="border-b-2 p-3 text-sm font-medium">{title}</h1>
          </a>
        </div>
        {Object.keys(groupedClasses).map((folderId: string) => {
          const folder = classes.find(
            (c: Class & { Folder: Folder | null }) => c.folderId === folderId
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
                    {groupedClasses[folderId]?.map((classItem: any) => (
                      <a
                        key={classItem.id}
                        href={`/courses/${courseId}/classes/${classItem.id}`}
                        className={`flex cursor-pointer items-center gap-2 rounded-md px-6 py-2 hover:bg-blue-500 hover:text-white ${
                          pathname === `/courses/${courseId}/classes/${classItem.id}` &&
                          "bg-sky-500 text-white"
                        }`}
                      >
                        <MdOndemandVideo />
                        {classItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
        {classesWithoutFolders.map((classItem: any) => (
          <a
            key={classItem.id}
            href={`/courses/${courseId}/classes/${classItem.id}`}
            className={`flex cursor-pointer items-center gap-2 rounded-md px-6 py-2 text-white hover:bg-blue-500 ${
              pathname === `/courses/${courseId}/classes/${classItem.id}` && "bg-sky-500 text-white"
            }`}
          >
            <MdOndemandVideo />
            {classItem.title}
          </a>
        ))}
        <div className="grow"></div>
        {pathname !== `/courses/${courseId}/classes/new` &&
          (currentUser?.role === "INSTRUCTOR" || isCourseAdmin) && (
            <NewClassDialog courseId={courseId} />
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
            className="fixed left-12 top-[300px] cursor-pointer rounded-r-lg bg-blue-500 py-2"
          >
            <IoIosArrowForward />
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassSidebar;
