"use client"

import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";

export default function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const languageMap: Record<string, string> = {
    html: "html",
    css: "css",
    js: "javascript",
  };

  return (
    <SandpackStack
      className="h-[90vh] margin-0"
    >
      <FileTabs closableTabs />
      <div className="flex-1 pt-2 h-screen">
        <Editor
          width="100%"
          height="100%"
          language={languageMap[sandpack.activeFile.split(".")[1]] || "plaintext"}
          theme="vs-light"
          key={sandpack.activeFile}
          value={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
}