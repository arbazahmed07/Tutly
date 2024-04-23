"use client"

import Split from 'react-split';
import "@/styles/react-split.css"
import PreviewPanel from './PreviewPanel';
import EditorPanel from './EditorPanel';

const Playground = () => {
  return (
    <>
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
    </>
  )
}

export default Playground
