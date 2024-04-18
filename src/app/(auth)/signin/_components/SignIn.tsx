"use client"

import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SigninWithGithub from "./SigninWithGithub";
import { useState } from "react";


const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      toast.loading("Signing in...");
      const response = await signIn('credentials', {
        username: data.username.toUpperCase(),
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });
      toast.dismiss();
      if (response?.error) {
        toast.error(response.error);
      } else{
        toast.success("Redirecting to dashboard...");
        router.push("/");
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 px-2 py-1 rounded-lg"
            {...register("username", { required: true })}
          />
          {errors.username && <p className="text-red-500">Username is required</p>}
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-2 py-1 rounded-lg"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p className="text-red-500">Password must have more than 8 characters</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg disabled:opacity-50"
          >
            Sign In
          </button>
        </div>
        {/* <SigninWithGithub /> */}
      </form>
    </div>
  );
};

export default SignIn;
