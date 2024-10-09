"use client";
import Link from "next/link";

interface Props {
  items: {
    name: string;
    icon: React.ReactNode;
    path: string;
    isActive: boolean;
  }[];
  menu: boolean;
  setMenu: (menu: boolean) => void;
}

export default function Sidebar({ items, menu, setMenu }: Props) {
  return (
    <div
      className={`${
        !menu && "max-sm:hidden max-sm:pt-12"
      } absolute left-0 z-40 -mt-3 min-h-dvh bg-background p-3 px-2 shadow-sm shadow-blue-800/40 sm:fixed sm:top-14`}
    >
      {items.map((item) => {
        return (
          <div key={item.path}>
            <Link
              href={item.path}
              onClick={() => setMenu(false)}
              key={item.path}
              className={`${item.isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"} m-auto my-2 flex cursor-pointer items-center gap-4 rounded px-4 py-3 md:hidden`}
            >
              <div className={`px-2 text-2xl`}>{item.icon}</div>
              <h1 className={`${!menu && "hidden"}`}>{item.name}</h1>
            </Link>
            <Link
              href={item.path}
              key={item.path}
              className={`${item.isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500 hover:text-white"} m-auto my-2 hidden cursor-pointer items-center gap-4 rounded px-3 py-3 md:flex`}
            >
              <div className={`px-2 text-2xl`}>{item.icon}</div>
              <h1 className={`${!menu && "hidden"}`}>{item.name}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
