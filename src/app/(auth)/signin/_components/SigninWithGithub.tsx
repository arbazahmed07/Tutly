import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa6';

const SigninWithGithub = () => {
  const router = useRouter();
  const loginWithGithub = async () => {
    const response = await signIn('github', { callbackUrl: '/' });
    if (response?.ok) {
      toast.success('Signin successful');
      router.push('/');
    }
    if (response?.error) {
      toast.error(response.error);
    }
  };

  return (
    <div>
        <div className="bg-primary-600 text-secondary-100 my-2.5 p-3 text-sm rounded-lg font-semibold">
          <button onClick={(e) => { e.preventDefault(); loginWithGithub() }} className="flex items-center w-full justify-center"><FaGithub className="h-5 w-5 mr-5"/>Sign in with GitHub</button>
        </div>
    </div>
  );
};

export default SigninWithGithub;
