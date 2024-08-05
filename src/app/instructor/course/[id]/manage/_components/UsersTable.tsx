"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaSort,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaUserPlus,
} from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import { TbUserOff } from "react-icons/tb";
import { TbUserSearch } from "react-icons/tb";
import { MdOutlineBlock } from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";
import Image from "next/image";

const UserTable = ({ users, params }: { users: Array<any>; params: any }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [searchBar, setSearchBar] = useState("");
  const roles = ["STUDENT", "MENTOR"];
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchBar.trim().toLowerCase())
  );

  const displayedUsers = showAllUsers
    ? filteredUsers
    : filteredUsers.filter((user) => user.enrolledUsers.length === 0);

  const mentors = users.filter(
    (user) =>
      user.role === "MENTOR" &&
      user.enrolledUsers.find(
        ({ course }: { course: any }) => course.id === params.id
      ) !== undefined
  );

  const handleEnroll = async (username: string) => {
    toast.loading("Enrolling user...");
    try {
      setLoading(true);
      const res = await axios.post("/api/course/enrollUser", {
        courseId: params.id,
        username,
      });
      console.log(res.data);
      toast.dismiss();
      toast.success(`${username} enrolled successfully`);
      setLoading(false);
      router.refresh();
    } catch (err: any) {
      setLoading(false);
      toast.dismiss();
      toast.error(err.response.data.error);
    }
  };

  const handleUnenroll = async (username: string) => {
    toast.loading("Unenrolling user...");
    try {
      setLoading(true);
      const res = await axios.post("/api/course/unenrollUser", {
        courseId: params.id,
        username,
      });
      console.log(res.data);
      toast.dismiss();
      toast.success(`${username} unenrolled successfully`);
      setLoading(false);
      router.refresh();
    } catch (err: any) {
      setLoading(false);
      toast.dismiss();
      toast.error(err.response.data.error);
    }
  };

  const handleRoleChange = async (username: string, role: string) => {
    toast.loading("Updating user role...");
    try {
      setLoading(true);
      const res = await axios.post("/api/course/updateToMentor", {
        username,
        role,
      });
      console.log(res.data);
      toast.dismiss();
      toast.success(`User role updated to ${role}`);
      setLoading(false);
      router.refresh();
    } catch (err: any) {
      setLoading(false);
      toast.dismiss();
      toast.error(err.response.data.error);
    }
  };

  const handleMentorChange = async (
    username: string,
    mentorUsername: string
  ) => {
    toast.loading("Updating mentor...");
    try {
      setLoading(true);
      const res = await axios.post("/api/course/updateMentor", {
        courseId: params.id,
        username,
        mentorUsername: mentorUsername === "" ? null : mentorUsername,
      });
      console.log(res.data);
      toast.dismiss();
      toast.success(`Mentor updated successfully`);
      setLoading(false);
      router.refresh();
    } catch (err: any) {
      setLoading(false);
      toast.dismiss();
      toast.error(err.response.data.error);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getSortedUsers = () => {
    // console.log(sortColumn, sortOrder);

    const sortedUsers = [...displayedUsers];
    sortedUsers.sort((a, b) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn]) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortOrder === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
    return sortedUsers;
  };

  const sortedUsers = getSortedUsers();
return (
  <div className="mb-8 max-w-full overflow-x-auto">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <TbUserSearch className="w-5 h-5 absolute top-2 right-2" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <label className="cursor-pointer flex items-center">
          <input
            type="radio"
            name="userFilter"
            checked={showAllUsers}
            onChange={() => setShowAllUsers(true)}
            className="mr-2"
          />
          All <RiGlobalLine className="w-5 h-5 ml-1" />
        </label>
        <label className="cursor-pointer flex items-center">
          <input
            type="radio"
            name="userFilter"
            checked={!showAllUsers}
            onChange={() => setShowAllUsers(false)}
            className="mr-2"
          />
          Not Enrolled <TbUserOff className="w-5 h-5 ml-1" />
        </label>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border border-collapse border-gray-300 min-w-[600px]">
        <thead>
          <tr className="bg-sky-800">
            <th className="border border-gray-300 px-2 py-2 text-sm">S.No</th>
            <th className="border border-gray-300 px-2 py-2 text-sm">
              <div className="flex items-center justify-center">
                Username &nbsp;
                {sortColumn !== "username" && (
                  <FaSort
                    onClick={() => handleSort("username")}
                    className="cursor-pointer"
                  />
                )}
                {sortColumn === "username" && sortOrder === "desc" && (
                  <FaSortAlphaDownAlt
                    onClick={() => handleSort("username")}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}
                {sortColumn === "username" && sortOrder === "asc" && (
                  <FaSortAlphaDown
                    onClick={() => handleSort("username")}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}
              </div>
            </th>
            <th className="border border-gray-300 px-2 py-2 text-sm">Name</th>
            <th className="border border-gray-300 px-2 py-2 text-sm">
              <div className="flex items-center justify-center">
                Role &nbsp;
                {sortColumn !== "role" && (
                  <FaSort
                    onClick={() => handleSort("role")}
                    className="cursor-pointer"
                  />
                )}
                {sortColumn === "role" && sortOrder === "desc" && (
                  <FaSortAlphaDownAlt
                    onClick={() => handleSort("role")}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}
                {sortColumn === "role" && sortOrder === "asc" && (
                  <FaSortAlphaDown
                    onClick={() => handleSort("role")}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}
              </div>
            </th>
            <th className="border border-gray-300 px-2 py-2 text-sm">Email</th>
            <th className="border border-gray-300 px-2 py-2 text-sm">Mentor</th>
            <th className="border border-gray-300 px-2 py-2 text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-xl py-4">
                <div className="flex items-center justify-center px-4">
                  No users found <MdOutlineBlock className="w-8 h-8 ml-2" />
                </div>
              </td>
            </tr>
          )}
          {sortedUsers.map((user, index) => (
            <tr key={user.id} className="hover:bg-slate-600">
              <td className="border border-gray-300 px-2 py-2 text-sm">{index + 1}</td>
              <td className="border border-gray-300 px-2 py-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.image || "/images/placeholder.jpg"}
                    alt="user"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.username}</span>
                </div>
              </td>
              <td className="border border-gray-300 px-2 py-2 text-sm">{user.name}</td>
              <td className="border border-gray-300 px-2 py-2 text-sm text-center">
                {user.role !== "INSTRUCTOR" ? (
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.username, e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="px-2 py-1 rounded-md disabled select-none cursor-not-allowed bg-zinc-700 text-white font-semibold text-sm">
                    {user.role}
                  </span>
                )}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-sm">{user.email}</td>
              <td className="border border-gray-300 px-2 py-2 text-sm">
                {user.role === "STUDENT" &&
                user.enrolledUsers.find(
                  ({ course }:{
                    course: any
                  }) => course.id === params.id
                ) !== undefined ? (
                  <select
                    value={user.mentor}
                    onChange={(e) => handleMentorChange(user.username, e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                  >
                    <option value="">None</option>
                    {mentors.map((mentor) => (
                      <option
                        key={mentor.id}
                        value={mentor.username}
                        selected={
                          mentor.username ===
                          user.enrolledUsers.find(
                            ({ course }:{
                              course: any
                            }) => course.id === params.id
                          )?.mentorUsername
                        }
                      >
                        {mentor.username}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="px-2 py-1 rounded-md disabled select-none cursor-not-allowed bg-zinc-700 text-white font-semibold text-sm">
                    None
                  </span>
                )}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-sm">
                {user.enrolledUsers.find(
                  ({ course }:{
                    course: any
                  }) => course.id === params.id
                ) === undefined ? (
                  <button
                    disabled={loading}
                    onClick={() => handleEnroll(user.username)}
                    className="px-2 py-1 flex items-center justify-center bg-emerald-700 text-white rounded-full hover:bg-emerald-800 select-none focus:outline-none focus:bg-emerald-800 text-sm"
                  >
                    Enroll <FaUserPlus className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    disabled={loading}
                    onClick={() => handleUnenroll(user.username)}
                    className="px-2 py-1 flex items-center justify-center bg-red-800 text-white rounded-full hover:bg-red-700 select-none focus:outline-none focus:bg-red-800 text-sm"
                  >
                    Unenroll <FaUserXmark className="w-4 h-4 ml-1" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default UserTable
