import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa6';

const SigninWithGithub = ({
  assignmentId
}: {
  assignmentId: string
}) => {
  const router = useRouter();
  //use previous url as callback url

  const loginWithGithub = async () => {
    const response = await signIn('github', { callbackUrl: `/playground/html-css-js?confirm-submssion=${assignmentId}` });
    if (response?.ok) {
      toast.success('Signin successful');
    }
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <div>
      <div className="bg-primary-600 text-secondary-100 p-2 text-sm rounded-lg font-semibold">
        <button onClick={(e) => { e.preventDefault(); loginWithGithub() }} className="flex items-center w-full justify-center"><FaGithub className="h-5 w-5 mr-3" />connect to submit</button>
      </div>
    </div>
  );
};

export default SigninWithGithub;
