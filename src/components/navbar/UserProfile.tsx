import React from "react";
import MenuItem from "./MenuItem";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_SIGN_IN_URL } from "@/utils/constants";
import useClickOutside from "@/hooks/useClickOutside";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { type User } from "@prisma/client";

const UserProfile = ({ currentUser }: { currentUser?: User | null }) => {
  const router = useRouter();

  const [isOpen, setIsOpen, componentRef] =
    useClickOutside<HTMLDivElement>(false);

  return (
    <div className="">
      <div className="flex items-center gap-1 sm:gap-3">
        <div
          ref={componentRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1 shadow-md transition dark:bg-secondary-800"
        >
          <div className="">
            <Image
              unoptimized
              className="rounded-full"
              src={currentUser?.image ?? "/images/placeholder.jpg"}
              width={30}
              height={30}
              alt="profile img"
            />
          </div>
          {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          {isOpen && (
            <div className="absolute right-0 top-12 flex min-w-max cursor-pointer flex-col overflow-hidden rounded-lg bg-blue-500 text-sm text-white shadow-md">
              <div className=" ">
                <MenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                  label="Profile"
                />
                <hr />
                <MenuItem
                  onClick={async () => {
                    await signOut({ callbackUrl: NEXT_PUBLIC_SIGN_IN_URL });
                    localStorage.clear();
                  }}
                  label="SignOut"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
