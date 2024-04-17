"use client"

import { defaultState } from './_components/config';
import { Context } from './_components/context';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = useLocalStorage('html-css-js-playground-state', defaultState);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [theme, setTheme] = useLocalStorage('editor-theme', 'light');

  return (
    <Context.Provider value={{ state, dispatch, currentTabIndex, setCurrentTabIndex, theme, setTheme }}>
      {children}
    </Context.Provider>
  );
}
