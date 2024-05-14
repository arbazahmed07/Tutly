"use client"

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { signOut } from "next-auth/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";


const Profile = ({ currentUser } :any) => {
  const email = currentUser?.email;
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const onSubmit = async (data :any) => {

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!currentUser || !currentUser?.email) {
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
        signOut({ callbackUrl: "/signin?callbackUrl=manage-password" })
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
  }

  
  return (  
    <div className="flex justify-center mt-10 text-sm font-semibold dark:text-white text-black">
      <div className="p-5 m-auto rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 w-[300px]">
            <div>
              <label className="w-full block mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 outline-none px-3 py-2 rounded-md w-full bg-background"
                value={email}
                disabled
              />
            </div>
            {currentUser?.password && (
              <div  >
                <label className="w-full block mb-1">Old Password <a onClick={handleForgotPassword} className="text-xs text-blue-500 hover:cursor-pointer hover:text-red-700">forgot?</a> </label>
                <div className=" relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Old Password"
                    className="border border-gray-300 outline-none px-3 py-2 rounded-md w-full bg-background"
                    {...register("oldPassword")}
                    />
                    <span
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("old")}
                    >
                      {showOldPassword ? <FaRegEyeSlash className=" w-5 h-5" /> : <FaRegEye className=" w-5 h-5" />}
                    </span>
                </div>
              </div>
            )}
            <div >
              <label className="w-full block mb-1">New Password</label>
              <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    className="border border-gray-300 outline-none px-3 py-2 rounded-md w-full bg-background"
                    {...register("newPassword", { required: true, minLength: 8 })}
                    />
                    <span
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showNewPassword ? <FaRegEyeSlash className=" w-5 h-5" /> : <FaRegEye className=" w-5 h-5" />}
                    </span>
                </div>
            </div>
            {errors.newPassword?.type == "required" && <span className="text-red-500">Password is required</span>}
            {errors.newPassword?.type == "minLength" && <span className="text-red-500">Password must have more than 8 characters</span>}
            <div >
              <label className="w-full block mb-1">Confirm Password</label>
              <div className=" relative" >
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="border border-gray-300 outline-none px-3 py-2 rounded-md w-full bg-background"
                    
                    {...register("confirmPassword", { required: true, minLength: 8 })}
                    />
                    <span
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showConfirmPassword ? <FaRegEyeSlash className=" w-5 h-5" /> : <FaRegEye className=" w-5 h-5" />}
                    </span>
              </div>
            </div>
            {errors.confirmPassword?.type == "required" && <span className="text-red-500">Confirm Password is required</span>}


            <button
              type="submit"
              className="bg-blue-600 text-white text-sm font-semibold p-3 rounded-md mt-4"
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