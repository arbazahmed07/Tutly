"use client"

import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border border-secondary-300 text-sm font-medium p-2.5 outline-none rounded-lg"
            {...register("username", { required: true })}
          />
          {errors.username && <p className="text-sm font-medium">* Username is required</p>}
          <input
            type="password"
            placeholder="Password"
            className="border border-secondary-300 text-sm font-medium p-2.5 outline-none rounded-lg"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p className="text-sm font-medium">* Password must have more than 8 characters</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-400 text-secondary-100 p-3 text-sm rounded-lg font-medium"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

