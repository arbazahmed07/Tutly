"use client"

import { Suspense, useState } from "react";
import FolderUpload from "./FileUpload";
import Playground from "../playground/multi-file/Playground";


const ReactPlayground = ({
  currentUser
}: {
  currentUser: any
}) => {
  const [filesObj, setFilesObj] = useState<{ [key: string]: string } | undefined>(undefined);

  return (
    <>
      {!filesObj ? (
        <>
          <h1 className="text-3xl font-bold text-center mt-8">
            React Playground
          </h1>
          <FolderUpload setFilesObj={setFilesObj} />
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Playground currentUser={currentUser} initialFiles={filesObj} template="react" />
        </Suspense>
      )}
    </>
  );
};

export default ReactPlayground;