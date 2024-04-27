"use client"

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Profile = ({ currentUser } :any) => {
  const router = useRouter()
  const email = currentUser?.email;
  const { register, handleSubmit, formState: { errors } } = useForm();

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
    <div className="flex justify-center items-center h-[85vh]">
      <div className="p-5 m-auto bg-slate-300 text-secondary-800 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 md:w-[25vw]">
            <div>
              <label className="w-full block mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 outline-none px-3 py-2 rounded-md bg-slate-400/40 w-full"
                value={email}
                disabled
              />
            </div>
            {currentUser?.password && (
              <div>
                <label className="w-full block mb-1">Old Password <a onClick={handleForgotPassword} className="text-xs text-blue-500 hover:cursor-pointer hover:text-red-700">forgot?</a> </label>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="border border-gray-300 outline-none px-3 py-2 rounded-md w-full"
                  {...register("oldPassword")}
                />
              </div>
            )}
            <div>
              <label className="w-full block mb-1">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="border border-gray-300 outline-none px-3 py-2 rounded-md w-full"
                {...register("newPassword", { required: true, minLength: 8 })}
              />
            </div>
            {errors.newPassword?.type == "required" && <span className="text-red-500">Password is required</span>}
            {errors.newPassword?.type == "minLength" && <span className="text-red-500">Password must have more than 8 characters</span>}
            <div>

              <label className="w-full block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 outline-none px-3 py-2 rounded-md w-full"

                {...register("confirmPassword", { required: true, minLength: 8 })}
              />
            </div>
            {errors.confirmPassword?.type == "required" && <span className="text-red-500">Confirm Password is required</span>}


            <button
              type="submit"
              className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold p-3 rounded-md mt-4"
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