"use client";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SigninWithGoogle from "./SigninWithGoogle";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState("password");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      toast.loading("Signing in...");
      const response = await signIn("credentials", {
        username: data.username.toUpperCase(),
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });
      toast.dismiss();
      if (response?.error) {
        toast.error("Invalid username or password");
      } else {
        toast.success("Redirecting to dashboard...");
        setShowPassword("password");
        router.push("/");
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-lg border border-secondary-300 bg-gray-500 p-2.5 text-sm font-medium outline-none"
            {...register("username", { required: true })}
          />
        </div>
        {errors.username && (
          <p className="text-sm font-medium text-zinc-600">
            * Username is required
          </p>
        )}
        <div className="relative flex items-center">
          <input
            type={showPassword}
            placeholder="Password"
            className="w-full rounded-lg border border-secondary-300 bg-gray-500 p-2.5 text-sm font-medium outline-none"
            {...register("password", { required: true, minLength: 8 })}
          />
          {showPassword === "password" ? (
            <FaRegEyeSlash
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-zinc-700 dark:text-white"
              onClick={() => setShowPassword("text")}
            />
          ) : (
            <FaRegEye
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-zinc-700 dark:text-white"
              onClick={() => setShowPassword("password")}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-sm font-medium text-zinc-600">
            * Password must have more than 8 characters
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 p-2 text-sm font-medium text-secondary-100"
        >
          Sign In
        </button>
      </form>
      <SigninWithGoogle />
    </div>
  );
};

export default SignIn;
