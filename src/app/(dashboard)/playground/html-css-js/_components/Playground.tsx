"use client"

import Split from 'react-split';
import "@/styles/react-split.css"
import PreviewPanel from './PreviewPanel';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
const EditorPanel = dynamic(() => import('./EditorPanel'),{
  ssr: false
}); 

const Playground = () => {
  return (
    <Split
      className="h-[90vh] overflow-hidden md:flex hidden"
      sizes={[50, 50]}
      minSize={300}
    >
      <div className='h-full relative'>
        <Suspense fallback={<div>Loading...</div>}>
          <EditorPanel />
        </Suspense>
      </div>
      <PreviewPanel />
    </Split>
  )
}

export default Playground
