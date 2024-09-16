"use client";

import { useState } from "react";
import {
  SandpackProvider,
  SandpackPreview,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import MonacoEditor from "./MonacoEditor";
import FileExplorer from "./FileExplorer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SandboxConsole from "./SandboxConsole";
import SubmitAssignment from "./SubmitAssignment";
import { TfiFullscreen } from "react-icons/tfi";

const files = {
  "/index.html": `<!DOCTYPE html>
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
  "/styles.css": "",
  "/index.js": "",
};

const Playground = ({
  currentUser,
  assignmentId,
  initialFiles,
  template = "static",
}: {
  currentUser?: any;
  assignmentId?: string;
  initialFiles?: SandpackFiles;
  template?: SandpackPredefinedTemplate;
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="relative h-[95vh]">
      <SandpackProvider
        files={initialFiles || files}
        template={template}
        theme="light"
      >
        {isFullScreen && (
          <div className="fixed inset-0 z-50 bg-white">
            <button
              className="absolute right-1 top-1 z-50 rounded bg-gray-800 p-2 text-white"
              onClick={() => setIsFullScreen(false)}
            >
              Exit Fullscreen
            </button>
            <SandpackPreview
              showNavigator
              showOpenInCodeSandbox={false}
              className="h-[95vh] overflow-y-scroll"
            />
          </div>
        )}

        <ResizablePanelGroup
          direction="horizontal"
          className="h-[95vh] overflow-y-scroll rounded-lg border"
        >
          <ResizablePanel defaultSize={14}>
            <FileExplorer />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={43}>
            <MonacoEditor />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={43}>
            <ResizablePanelGroup
              direction="vertical"
              className="h-[95vh] overflow-y-scroll"
            >
              <ResizablePanel defaultSize={95}>
                <div className="relative h-[95vh] overflow-y-scroll">
                  <div className="border-b bg-white text-black">
                    <h1 className="text-center text-xl font-bold">Preview</h1>
                    <TfiFullscreen
                      className="absolute right-2 top-2 cursor-pointer"
                      onClick={() => setIsFullScreen(true)}
                    />
                  </div>
                  <SandpackPreview
                    showOpenNewtab
                    showOpenInCodeSandbox={false}
                    className="h-[95vh] overflow-y-scroll"
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
          <div className="absolute -top-6 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
            <SubmitAssignment
              currentUser={currentUser}
              assignmentId={assignmentId}
            />
          </div>
        )}
      </SandpackProvider>
    </div>
  );
};

export default Playground;
