"use client"

import { defaultState } from '@/app/(dashboard)/playground/html-css-js/_components/config';
import { Context } from '@/app/(dashboard)/playground/html-css-js/_components/context';
import useLocalStorageState from '@/hooks/useLocalStorage';
import React, { useState } from 'react'

const PlayGroundProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [state, dispatch] = useLocalStorageState('html-css-js-playground-state', defaultState);
  const [theme, setTheme] = useLocalStorageState('editor-theme', 'light');

  return (
    <Context.Provider value={{ state, dispatch, currentTabIndex, setCurrentTabIndex, theme, setTheme }}>
      {children}
    </Context.Provider>
  )
}
export default PlayGroundProvider