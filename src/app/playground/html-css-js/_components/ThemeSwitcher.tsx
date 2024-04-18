"use client";

import { useContext, useState } from 'react';
import { Context } from './context';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { defaultState } from './config';

export const ThemeSwitcher = () => {
  const { setTheme, theme, dispatch } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='absolute right-0 mr-1'>
      <button className="`rounded px-4 cursor-pointer rounded-md dark:bg-secondary-800" onClick={() => dispatch(defaultState)}>
        Reset
      </button>
      <div className="relative inline-block text-left z-50 ml-4">
        <button
          className="flex justify-between items-center gap-3 w-full px-4 py-2 text-sm font-medium bg-white border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-secondary-500"
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
            <ul className="absolute right-0 mt-2 w-56 p-1 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 bg-background text-foreground">
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


