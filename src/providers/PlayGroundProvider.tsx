"use client"

import { defaultState } from '@/app/(dashboard)/playground/html-css-js/_components/config';
import { PlaygroundContext } from '@/app/(dashboard)/playground/html-css-js/_components/PlaygroundContext';
import useLocalStorageState from '@/hooks/useLocalStorage';
import React, { useState } from 'react'

const PlayGroundProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [theme, setTheme] = useLocalStorageState('editor-theme', 'light');
  const [files, setFiles] = useLocalStorageState('html-css-js-playground-files', defaultState);
  const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);

  return (
    <PlaygroundContext.Provider value={{ files, setFiles, currentFileIndex, setCurrentFileIndex, theme, setTheme }}>
      {children}
    </PlaygroundContext.Provider>
  )
}
export default PlayGroundProvider