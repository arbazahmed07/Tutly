"use client";

import { Suspense, useState } from "react";
import FolderUpload from "./FileUpload";
import Playground from "../_components/Playground";

const ReactPlayground = ({ currentUser }: { currentUser: any }) => {
  const [filesObj, setFilesObj] = useState<Record<string, string> | undefined>(
    undefined,
  );

  return (
    <>
      {!filesObj ? (
        <>
          <h1 className="mt-6 text-center text-2xl font-bold text-orange-300">
            React Playground
          </h1>
          <FolderUpload setFilesObj={setFilesObj} />
        </>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Playground
            currentUser={currentUser}
            initialFiles={filesObj}
            template="react"
          />
        </Suspense>
      )}
    </>
  );
};

export default ReactPlayground;
