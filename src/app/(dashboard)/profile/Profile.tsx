"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";

const formatDate = (e: string) => {
  const date = new Date(e);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12;

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
};

const UserProfile = ({ currentUser }: { currentUser: any }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(currentUser);

  return (
    <div className="m-5 mt-12 flex flex-col items-center font-semibold dark:text-white md:mt-20">
      <div className="relative">
        {currentUser.role === "MENTOR" && (
          <FaCrown className="absolute -left-9 -top-9 h-16 w-16 -rotate-45 text-yellow-400 shadow-yellow-500 drop-shadow-sm hover:text-yellow-500" />
        )}
        {currentUser.role === "INSTRUCTOR" && (
          <FaCrown className="absolute -left-9 -top-9 h-16 w-16 -rotate-45 text-red-400 shadow-yellow-500 drop-shadow-sm hover:text-red-500" />
        )}
        <Image
          unoptimized
          src={formData?.image || "/images/placeholder.jpg"}
          alt="User Image"
          width={120}
          height={120}
          className="mb-5 rounded-full bg-slate-300"
        />
      </div>

      <form className="flex flex-col justify-center dark:text-white md:flex-row md:gap-10">
        <div className="mt-2 w-full dark:text-white md:w-2/5">
          <label className="text-sm dark:text-secondary-50">Username:</label>
          <input
            type="text"
            name="username"
            disabled
            title="name"
            value={formData?.username || ""}
            className="mb-2 w-full rounded border border-blue-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <label className="mb-1 block text-sm">
            Email:
            <input
              type="email"
              name="email"
              disabled
              value={formData?.email || ""}
              className="mb-2 w-full rounded border border-blue-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
        <div className="w-full dark:text-white md:mt-3 md:w-2/5">
          <label className="mb-1 block text-sm">
            Name:
            <input
              type="text"
              name="name"
              disabled
              value={formData?.name || "null"}
              className="mb-2 w-full rounded border border-blue-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="mb-2 block text-sm dark:text-white">
            Role:
            <input
              type="text"
              name="role"
              disabled
              value={formData?.role || "STUDENT"}
              className="w-full rounded border border-blue-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
      </form>

      <div className="mt-5 flex cursor-pointer flex-row-reverse items-center justify-end rounded-lg bg-primary-500 px-3 py-2 hover:bg-primary-600">
        <button
          onClick={() => router.push("/profile/manage-password")}
          className="text-white"
        >
          Manage Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
