"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import UserProfile from './UserProfile';
import ThemeSwitch from './ThemeSwitch';
import { GrMenu } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { usePathname,useRouter, useSearchParams } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from 'next/link';
import Actions from './Actions';
interface Props {
  // todo: change types
  currentUser?: any;
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>
}


const Navbar: React.FC<Props> = ({ currentUser, menu, setMenu }: Props) => {
  const router=useRouter()
  const pathname = usePathname();
  const Back=()=>{
    router.back();
  }
  const Menu=()=>{
    setMenu(!menu);
  }
  const isCoursePage = pathname.startsWith('/courses/');

  return (
    <div className='shadow-md px-2 z-50 sticky top-0 backdrop-blur-3xl'>
      <div className='flex items-center justify-between p-2'>
        <div className="flex items-center gap-3 text-xl font-semibold">
          <div className="flex items-center gap-3">
            <Link href='/' className="hidden md:flex">
                LMS
            </Link>
            {!isCoursePage ? <div onClick={Menu} className='p-2 rounded-full hover:bg-secondary-800 cursor-pointer'><GrMenu className='text-xl' /></div>:
            <div onClick={Back} className='p-2 rounded-full hover:bg-secondary-800 cursor-pointer'>< IoMdArrowRoundBack className='text-xl'/></div>}
          </div>
        </div>
        <Actions currentUser={currentUser} />
        <div className='flex gap-3 items-center'>
          <h1 className="text-sm font-medium">{currentUser?.role}</h1>
          <ThemeSwitch />
          <div className='rounded-full cursor-pointer hover:bg-secondary-800 p-2'><IoMdNotificationsOutline className='text-xl' /></div>
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default Navbar