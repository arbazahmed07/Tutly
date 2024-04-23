"use client"

import React, { useEffect } from 'react'
import Split from 'react-split';
import "@/styles/react-split.css"
import { defaultState } from './config';
import { Context } from './context';
import { useState } from "react";
import PreviewPanel from './PreviewPanel';
import useLocalStorage from '@/hooks/useLocalStorage';
import EditorPanel from './EditorPanel';
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const Playground = () => {

  const params = useSearchParams();
  const assignmentId = params.get('attachmentId');
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [state, dispatch] = useLocalStorage('html-css-js-playground-state', defaultState);
  const [theme, setTheme] = useLocalStorage('editor-theme', 'light');
  const [user, setUser] = useState<any>(null);
  const [assignmentDetails, setAssignmentDetails] = useState<any>(null);

  useEffect(() => {
    async function fetch() {
      async function fetchData() {
        const { data } = await axios.get(`/api/attachments/${assignmentId}`);
        setAssignmentDetails(data.assignment);
        setUser(data.currentUser);

        return data;
      }
      const data: any = await fetchData();
      if (!data.assignment || !data.currentUser) {
        toast.error("Error fetching assignment details");
      }
    }
    fetch();
  }
    , []);


  return (
    <Context.Provider value={{ state, dispatch, currentTabIndex, setCurrentTabIndex, theme, setTheme }}>
      <Split
        className="h-[90vh] overflow-hidden md:flex hidden"
        sizes={[50, 50]}
        minSize={300}
      >
        <div className='h-full relative'>
          <EditorPanel user={user} assignmentDetails={assignmentDetails} />
        </div>
        <PreviewPanel user={user} assignmentDetails={assignmentDetails} />
      </Split>
      <Split
        className="h-[90vh] overflow-hidden flex md:hidden"
        sizes={[100]}
        minSize={300}
      >
        <div className='h-full relative'>
          <EditorPanel user={user} assignmentDetails={assignmentDetails} />
        </div>
      </Split>
    </Context.Provider>


  )
}

export default Playground
