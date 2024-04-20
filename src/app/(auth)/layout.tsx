import { FC, ReactNode } from 'react';
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='flex h-screen w-full justify-center bg-secondary-800 items-center'>
    <div className='p-7 m-2 md:p-10 sm:w-[400px] rounded-lg shadow-[0_20px_20px_20px_rgba(0,0,0,0.1)]'>
      {children}
    </div>
  </div>;
};

export default AuthLayout;
