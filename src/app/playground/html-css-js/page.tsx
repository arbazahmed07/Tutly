"use client"

import React from 'react'
import Split from 'react-split';
import "@/styles/react-split.css"
import { EditorPanel } from './_components/EditorPanel';
import { PreviewPanel } from './_components/PreviewPanel';

const Page = () => {
  return (
    <Split
      className="flex h-[90vh] overflow-hidden mb-2"
      sizes={[50, 50]}
      minSize={300}
    >
      <EditorPanel />
      <PreviewPanel />
    </Split>
  )
}

export default Page
