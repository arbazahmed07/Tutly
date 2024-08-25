"use client"

import React, { useState, useEffect } from 'react';
import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { SandpackFileExplorer } from '@codesandbox/sandpack-react';
import { FaCheck, FaTimes } from "react-icons/fa";

const FileExplorer = () => {
  const { sandpack } = useSandpack();
  const [files, setFiles] = useState<SandpackFiles>(sandpack.files);
  const [newFilePath, setNewFilePath] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);

  useEffect(() => {
    setFiles(sandpack.files);
  }, [sandpack.files]);

  const handleAddFile = () => {
    if (newFilePath) {
      if (files[newFilePath]) {
        alert('A file with this path already exists.');
        return;
      }
      setFiles(prevFiles => ({
        ...prevFiles,
        [newFilePath]: { code: '' }
      }));
      sandpack.updateFile(newFilePath, '');
      setNewFilePath('');
      setShowFileInput(false);
    }
  };

  return (
    <div className="h-[95vh] overflow-y-scroll bg-white">
      <div className="p-2 flex justify-center items-center space-x-2">
        <h2 className="text-lg font-semibold">File Explorer</h2>
        <button
          onClick={() => setShowFileInput(!showFileInput)}
          className="p-2 bg-green-600 hover:bg-green-500 rounded text-white"
        >
          <AiOutlineFileAdd />
        </button>
      </div>
      {showFileInput && (
        <div className="flex items-center space-x-2 px-1">
          <input
            type="text"
            value={newFilePath}
            onChange={(e) => setNewFilePath(e.target.value)}
            placeholder="Enter new file path"
            className="p-1 w-28 border border-gray-600 rounded"
          />
          <div className='flex gap-1'>
            <button
              onClick={handleAddFile}
              className="p-1 bg-green-600 hover:bg-green-500 rounded  text-white"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => setShowFileInput(false)}
              className="p-1 bg-red-600 hover:bg-red-500 rounded  text-white"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      <SandpackFileExplorer />
    </div>
  );
}

export default FileExplorer;