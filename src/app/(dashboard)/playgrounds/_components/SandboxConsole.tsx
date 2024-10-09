import { useSandpackConsole } from "@codesandbox/sandpack-react";
import React from "react";

const SandboxConsole = () => {
  const { logs, reset } = useSandpackConsole({
    resetOnPreviewRestart: true,
  });

  return (
    <div className="h-full bg-white">
      <div className="flex justify-between px-10 py-2">
        <h1 className="text-lg font-semibold text-gray-600">Console</h1>
        <button
          className="rounded bg-blue-500 px-2 py-1 text-white"
          onClick={reset}
        >
          Clear
        </button>
      </div>
      <div className="overflow-auto">
        {logs.map((log, index) => (
          <div key={index} className="p-2">
            {log.data?.toString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SandboxConsole;
