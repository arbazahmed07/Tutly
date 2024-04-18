"use client";

import { useContext } from 'react';
import { Context } from './context';

const PreviewPanel = () => {
  const { state } = useContext(Context);
  const srcDoc = state.html + '<style>' + state.css + '</style>' + '<script>' + state.js + '</script>';

  return (
    <div className="m-1">
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