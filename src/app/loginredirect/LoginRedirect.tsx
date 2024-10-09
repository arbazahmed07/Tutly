"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const LoginRedirect = () => {
  const params = useSearchParams();
  const username = params.get("username");
  const tokenId = params.get("tokenId");
  const router = useRouter();

  const loginWithToken = async () => {
    if (!username || !tokenId) {
      toast.error("Invalid token");
      router.push("/signin");
      return;
    }

    try {
      toast.loading("Signing in...");
      const response = await signIn("credentials", {
        username: username.toUpperCase(),
        tokenId,
        callbackUrl: "/",
        redirect: false,
      });
      toast.dismiss();
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Login Successful...");
        router.push("/profile/manage-password");
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again later");
    }
  };

  useEffect(() => {
    loginWithToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center text-2xl font-bold">Redirecting...</div>
    </div>
  );
};

export default LoginRedirect;
