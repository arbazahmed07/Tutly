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
      <h2 className="text-center my-2">Or</h2>

      <button onClick={(e) => { e.preventDefault(); loginWithGithub() }} className='bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg w-full  '>
        <div className='flex justify-center items-center gap-5 relative'>

          <div
          >
            <FaGithub />
          </div>
          Continue with Github
        </div>
      </button>
    </div>
  );
};

export default SigninWithGithub;
