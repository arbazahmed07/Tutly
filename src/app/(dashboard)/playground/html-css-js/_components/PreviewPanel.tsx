"use client";
import { RiFullscreenExitLine } from "react-icons/ri";
import { useContext } from 'react';
import { Context } from './context';

const PreviewPanel = () => {
  const { state } = useContext(Context);
  const srcDoc = state.html + '<style>' + state.css + '</style>' + '<script>' + state.js + '</script>';

  return (
    <div>
      <div className="flex justify-between p-3 items-center">
        <h1 className="text-primary-400 text-sm font-semibold">Preview</h1>
        <h1 className="text-primary-400 text-sm font-semibold"><RiFullscreenExitLine className="h-5 w-5"/></h1>
      </div>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
      />  
    </div>
  );
};

export default PreviewPanel;