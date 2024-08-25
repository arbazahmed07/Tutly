"use client"

import React from 'react';

const Page = () => {
  // const handleOnClick = async () => {
  //   try {
  //     const folderHandle = await window.showDirectoryPicker();
  //     const files = [];

  //     for await (const entry of folderHandle.values()) {
  //       if (entry.kind === 'file') {
  //         const file = await entry.getFile();
  //         const content = await file.text();
  //         files.push({
  //           name: file.name,
  //           type: file.type,
  //           size: file.size,
  //           content: content,
  //         });
  //       }

  //       if (entry.kind === 'directory') {
  //         //fetch files from directory

  //         const dirHandle = await entry.getDirectory();
  //         for await (const dirEntry of dirHandle.values()) {
  //           if (dirEntry.kind === 'file') {
  //             const file = await dirEntry.getFile();
  //             const content = await file.text();
  //             files.push({
  //               name: file.name,
  //               type: file.type,
  //               size: file.size,
  //               content: content,
  //             });
  //           }
  //         }
  //       }
  //     }
  //     console.log(files);
  //     // You can set the files array to state or perform any other operation with it here

  //   } catch (error) {
  //     console.error('Error reading folder:', error);
  //   }
  // }

  return (
    <div className='p-10'>
      <h1>Checking files</h1>
      {/* <button onClick={handleOnClick} className='bg-secondary-700 text-white p-2 rounded'>Click me</button> */}
    </div>
  );
};

export default Page;
