"use client"

import React from 'react'
import Split from 'react-split';
import "@/styles/react-split.css"

import { defaultState } from './_components/config';
import { Context } from './_components/context';

import { useState } from "react";
import PreviewPanel from './_components/PreviewPanel';
import useLocalStorage from '@/hooks/useLocalStorage';
import dynamic from 'next/dynamic'

const EditorPanel = dynamic(() => import('./_components/EditorPanel'), {
  ssr: false,
})

const Page = () => {

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [state, dispatch] = useLocalStorage('html-css-js-playground-state', defaultState);
  const [theme, setTheme] = useLocalStorage('editor-theme', 'light');

  return (
    <Context.Provider value={{ state, dispatch, currentTabIndex, setCurrentTabIndex, theme, setTheme }}>
      <Split
        className="flex h-[90vh] overflow-hidden mb-2"
        sizes={[50, 50]}
        minSize={300}
      >
        <EditorPanel />
        <PreviewPanel />
      </Split>
    </Context.Provider>

  )
}

export default Page
