import { FC, ReactNode } from 'react';
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='relative h-screen w-full bg-white'>
  <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
    <div className='absolute w-48 h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full -left-24 -top-24 transform rotate-45'></div>
  </div>
  <div className='absolute bottom-0 right-0 w-full h-full overflow-hidden'>
    <div className='absolute w-48 h-48 bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 rounded-full -right-24 -bottom-24 transform rotate-45'></div>
  </div>
  <div className='flex justify-center items-center h-full ' style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
    <div className='relative z-10 p-7 m-2 md:p-10 sm:w-[400px] rounded-lg bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg' style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
      {children}
    </div>
  </div>
</div>


};

export default AuthLayout;
