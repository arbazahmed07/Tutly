import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";

const SigninWithGoogle = () => {
  const router = useRouter();
  const loginWithGoogle = async () => {
    const response = await signIn("google", { callbackUrl: "/" });
    if (response?.ok) {
      toast.success("Signin successful");
      router.push("/");
    }
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <div className="">
      <h2 className="mt-2 text-center text-sm font-bold text-secondary-700">
        Or
      </h2>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await loginWithGoogle();
        }}
        className="my-2 w-full rounded-lg bg-gray-950 text-sm font-semibold text-white hover:bg-gray-800"
      >
        <div className="relative flex items-center justify-center gap-5 rounded-md bg-secondary-600 p-2.5 text-primary-50">
          <div>
            <FcGoogle />
          </div>
          <span>Continue with Google</span>
        </div>
      </button>
    </div>
  );
};

export default SigninWithGoogle;
