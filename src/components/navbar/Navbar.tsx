"use client"

import React from 'react'
import Link from 'next/link';
import { User } from '@prisma/client';
import UserProfile from './UserProfile';
import ThemeSwitch from './ThemeSwitch';

interface Props {
  // todo: change types
  currentUser?: any;
}

const Navbar: React.FC<Props> = ({ currentUser }) => {

  return (
    <div className='shadow-md px-2 z-10 sticky top-0'>
      <div className='flex items-center justify-between p-2'>
        <Link href='/'>
          <div className='text-2xl font-bold '>
            LMS
          </div>
        </Link>
        <div className='flex gap-3'>
          <ThemeSwitch />
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default Navbar