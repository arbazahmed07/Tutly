"use client";

import { useContext, useState } from 'react';
import { Context } from './context';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { defaultState } from './config';

export const ThemeSwitcher = () => {
  const { setTheme, theme, dispatch } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='absolute right-0 mr-2 mt-1.5'>
      <button className="`rounded px-2 cursor-pointer rounded-md text-sm font-medium bg-secondary-800 p-1.5 text-secondary-50" onClick={() => dispatch(defaultState)}>
        Reset
      </button>
      <div className="hidden md:inline-block relative  text-left z-20 ml-4">
        <button
          className="flex justify-between items-center gap-3 w-full px-4 py-1.5 text-sm font-medium bg-white border border-secondary-300 rounded-md shadow-sm outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{theme}</span>
          {
            isOpen ? (
              <IoIosArrowDropdown />
            ) : (
              <IoIosArrowDropup />
            )
          }
        </button>
        {
          isOpen && (
            <ul className="right-0 mt-2 w-24 p-1.5 rounded-md shadow-lg outline-none z-50 bg-background text-foreground">
              <li
                className="py-1 px-3 rounded-md cursor-pointer"
                onClick={() => { setTheme('dark'); setIsOpen(false) }}
              >
                dark
              </li>
              <li
                className="py-1 px-3 rounded-md cursor-pointer"
                onClick={() => { setTheme('light'); setIsOpen(false) }}
              >
                light
              </li>
            </ul>
          )
        }
      </div>
    </div>
  );
};


