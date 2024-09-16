"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SigninWithGoogle from "./SigninWithGoogle";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.loading("Signing in...");
      const response = await signIn("credentials", {
        username: username.toUpperCase(),
        password,
        callbackUrl: "/",
        redirect: false,
      });
      toast.dismiss();
      if (response?.error) {
        toast.error("Invalid username or password");
      } else {
        toast.success("Redirecting to dashboard...");
        setShowPassword(false);
        router.push("/");
      }
    } catch {
      toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
        <div className="grow">
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-lg border border-secondary-300 bg-gray-500 p-2.5 text-sm font-medium outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-lg border border-secondary-300 bg-gray-500 p-2.5 text-sm font-medium outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          {showPassword ? (
            <FaRegEye
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-zinc-700 dark:text-white"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-zinc-700 dark:text-white"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        {password.length > 0 && password.length < 8 && (
          <p className="text-sm font-medium text-zinc-600">
            * Password must have at least 8 characters
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
