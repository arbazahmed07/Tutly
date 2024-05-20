"use client"

import {
  SandpackProvider,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import MonacoEditor from "./MonacoEditor";
import FileExplorer from "./FileExplorer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import SandboxConsole from "./SandboxConsole";
import SubmitAssignment from '@/components/navbar/NavBarActions/SubmitAssignment'


const files = {
  '/index.html':
    `<!DOCTYPE html>
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
  '/index.js': "",
}

const Playground = ({
  currentUser,
  assignmentId
}: {
  currentUser: any,
  assignmentId: string
}) => {
  return (
    <div className='h-full relative'>
      <SandpackProvider
        files={files}
        template="static"
        theme="light"
      >
        <ResizablePanelGroup direction="horizontal" className="h-full border rounded-lg ">
          <ResizablePanel defaultSize={14} >
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
                <SandpackPreview
                  showNavigator
                  showOpenNewtab
                  showOpenInCodeSandbox={false}
                  className="h-full"
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={5}>
                <SandboxConsole />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
          <SubmitAssignment currentUser={currentUser} assignmentId={assignmentId} />
        </div>
      </SandpackProvider >
    </div>
  )
}

export default Playground