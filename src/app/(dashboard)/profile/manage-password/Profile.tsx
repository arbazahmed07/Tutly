"use client";

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Profile = ({ currentUser }: any) => {
  const email = currentUser?.email;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (type: string) => {
    switch (type) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!currentUser?.email) {
      toast.error("An error occurred while updating the profile");
      return;
    }

    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, email }),
      });

      if (response?.ok) {
        toast.success("Profile updated successfully");
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("/api/profile/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response?.ok) {
        toast.success("Login again to create new password");
        localStorage.clear();
        signOut({ callbackUrl: "/signin?callbackUrl=manage-password" });
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending password reset link");
    }
  };

  return (
    <div className="mt-10 flex justify-center text-sm font-semibold text-black dark:text-white">
      <div className="m-auto rounded-lg p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-[300px] flex-col gap-2">
            <div>
              <label className="mb-1 block w-full">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 outline-none"
                value={email}
                disabled
              />
            </div>
            {currentUser?.password && (
              <div>
                <label className="mb-1 block w-full">
                  Old Password{" "}
                  <a
                    onClick={handleForgotPassword}
                    className="text-xs text-blue-500 hover:cursor-pointer hover:text-red-700"
                  >
                    forgot?
                  </a>{" "}
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Old Password"
                    className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 outline-none"
                    {...register("oldPassword")}
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("old")}
                  >
                    {showOldPassword ? (
                      <FaRegEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaRegEye className="h-5 w-5" />
                    )}
                  </span>
                </div>
              </div>
            )}
            <div>
              <label className="mb-1 block w-full">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 outline-none"
                  {...register("newPassword", { required: true, minLength: 8 })}
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showNewPassword ? (
                    <FaRegEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaRegEye className="h-5 w-5" />
                  )}
                </span>
              </div>
            </div>
            {errors.newPassword?.type == "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.newPassword?.type == "minLength" && (
              <span className="text-red-500">
                Password must have more than 8 characters
              </span>
            )}
            <div>
              <label className="mb-1 block w-full">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 outline-none"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                  })}
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showConfirmPassword ? (
                    <FaRegEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaRegEye className="h-5 w-5" />
                  )}
                </span>
              </div>
            </div>
            {errors.confirmPassword?.type == "required" && (
              <span className="text-red-500">Confirm Password is required</span>
            )}

            <button
              type="submit"
              className="mt-4 rounded-md bg-blue-600 p-3 text-sm font-semibold text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
