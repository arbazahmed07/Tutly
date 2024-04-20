"use client"

import React from 'react'
import Split from 'react-split';
import "@/styles/react-split.css"

import { defaultState } from './config';
import { Context } from './context';

import { useState } from "react";
import PreviewPanel from './PreviewPanel';
import useLocalStorage from '@/hooks/useLocalStorage';
import EditorPanel from './EditorPanel';
const Playground = () => {

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [state, dispatch] = useLocalStorage('html-css-js-playground-state', defaultState);
  const [theme, setTheme] = useLocalStorage('editor-theme', 'light');

  return (
    <Context.Provider value={{ state, dispatch, currentTabIndex, setCurrentTabIndex, theme, setTheme }}>
      <Split
        className="h-[90vh] overflow-hidden md:flex hidden"
        sizes={[50, 50]}
        minSize={300} 
      >
        <div className='h-full relative'>
          <EditorPanel />
        </div>
        <PreviewPanel />
      </Split>
      <Split
          className="h-[90vh] overflow-hidden flex md:hidden"
          sizes={[100]}
          minSize={300} 
        >
          <div className='h-full relative'>
            <EditorPanel />
          </div>
        </Split>
    </Context.Provider>


  )
}

export default Playground
