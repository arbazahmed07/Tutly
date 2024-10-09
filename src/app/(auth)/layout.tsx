import type { FC, ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen w-full bg-background">
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute h-48 w-48"></div>
      </div>
      <div className="absolute bottom-0 right-0 h-full w-full overflow-hidden">
        <div className="absolute h-48 w-48"></div>
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="relative z-10 m-2 rounded-lg border-gray-300 p-7 shadow-lg backdrop-blur-lg dark:bg-secondary-800 sm:w-[400px] md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
