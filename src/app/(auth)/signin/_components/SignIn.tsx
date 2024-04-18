"use client"

import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SigninWithGithub from "./SigninWithGithub";


const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await signIn('credentials', {
        username: data.username.toUpperCase(),
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });

      console.log(response);

      if (response?.error) {
        toast.error(response.error);
      } else{
        router.push("/");
        toast.success("Signed in successfully");
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again later");
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
            className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg"
          >
            Sign In
          </button>
        </div>
        <SigninWithGithub />
      </form>
    </div>
  );
};

export default SignIn;
