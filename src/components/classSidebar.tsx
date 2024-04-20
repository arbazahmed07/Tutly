"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function ClassSidebar({ params, classes }: any) {
    const pathname = usePathname();
  return (
    <div className="flex flex-col px-4 py-3 gap-2 shadow-xl min-h-[90vh]">
      <h1 className="px-4">{classes[0].Course?.title}</h1>
      {classes.map((x: any) => {
        return (
          <Link
            key={x.id}
            href={`/courses/${params.id}/class/${x.id}`}
            className={`px-4 py-2 cursor-pointer rounded hover:bg-primary-900 ${pathname===`/courses/${params.id}/class/${x.id}`&&"bg-primary-700"}`}
          >
            {x.title}
          </Link>
        );
      })}
    </div>
  );
}

export default ClassSidebar;
