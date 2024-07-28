"use client";

import { useState } from "react";
import { SandpackProvider, SandpackPreview, SandpackFiles } from "@codesandbox/sandpack-react";
import MonacoEditor from "./MonacoEditor";
import FileExplorer from "./FileExplorer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SandboxConsole from "./SandboxConsole";
import SubmitAssignment from '@/components/navbar/NavBarActions/SubmitAssignment';
import { TfiFullscreen } from "react-icons/tfi";

const files = {
  '/index.html': `<!DOCTYPE html>
<html>

<head>
  <title>Document</title>
  <link rel="stylesheet" href="/styles.css">
</head>

<body>
  <h1>Hello world!</h1>
  <script src="/index.js"></script>
</body>

</html>
`,
  '/styles.css': "",
  '/index.js': `{
  // Do not remove the braces; write your code inside the braces.

}
`,
};

const Playground = ({
  currentUser,
  assignmentId,
  initialFiles
}: {
  currentUser?: any,
  assignmentId?: string,
  initialFiles?: SandpackFiles
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className='h-full relative'>
      <SandpackProvider
        files={initialFiles || files}
        template="static"
        theme="light"
      >
        {isFullScreen && (
          <div className='fixed inset-0 z-50 bg-white'>
            <button
              className='absolute top-1 right-1 z-50 bg-gray-800 text-white p-2 rounded'
              onClick={() => setIsFullScreen(false)}
            >
              Exit Fullscreen
            </button>
            <SandpackPreview
              showNavigator
              showOpenInCodeSandbox={false}
              className="h-full"
            />
          </div>
        )}

        <ResizablePanelGroup direction="horizontal" className="h-full border rounded-lg">
          <ResizablePanel defaultSize={14}>
            <FileExplorer />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={43}>
            <MonacoEditor />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={43}>
            <ResizablePanelGroup direction="vertical" className="h-full">
              <ResizablePanel defaultSize={95}>
                <div className="h-full relative">
                  <div className="border-b bg-white text-black">
                    <h1 className="text-xl font-bold text-center">Preview</h1>
                    <TfiFullscreen
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setIsFullScreen(true)}
                    />
                  </div>
                  <SandpackPreview
                    showOpenNewtab
                    showOpenInCodeSandbox={false}
                    className="h-full"
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={5}>
                <SandboxConsole />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        {assignmentId && (
          <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <SubmitAssignment currentUser={currentUser} assignmentId={assignmentId} />
          </div>
        )}
      </SandpackProvider>
    </div>
  );
};

export default Playground;
