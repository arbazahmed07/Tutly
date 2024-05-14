import { FC, ReactNode } from 'react';
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='relative h-screen w-full bg-background'>
  <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
    <div className='absolute w-48 h-48'></div>
  </div>
  <div className='absolute bottom-0 right-0 w-full h-full overflow-hidden'>
    <div className='absolute w-48 h-48'></div>
  </div>
  <div className='flex justify-center items-center h-full'>
    <div className='relative z-10 p-7 m-2 md:p-10 sm:w-[400px] rounded-lg border-gray-300 dark:bg-secondary-800 backdrop-blur-lg shadow-lg'>
      {children}
    </div>
  </div>
</div>


};

export default AuthLayout;
