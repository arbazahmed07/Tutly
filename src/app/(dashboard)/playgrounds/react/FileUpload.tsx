"use client";
import { IoCloudUploadOutline } from "react-icons/io5";
import React, { useState } from "react";

interface FileData {
  path: string;
  content: string;
}
const imagExtensions = ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp", "ico", "tiff"];

const FolderUpload = ({
  setFilesObj
}: {
  setFilesObj: (filesObj: { [key: string]: string }) => void
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const items = e.target.files;
    if (items) {
      setIsLoading(true);
      await processFiles(items);
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const items = e.dataTransfer.items;
    if (items) {
      setIsLoading(true);
      await processDataTransferItems(items);
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processDataTransferItems = async (items: DataTransferItemList) => {
    const fileArray: FileData[] = [];
    const filesObj: { [key: string]: string } = {};
    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        await traverseFileTree(item, "", fileArray);
      }
    }

    for (let file of fileArray) {
      filesObj[file.path] = file.content;
    }

    const filesObjWithoutFolderName: { [key: string]: string } = {};

    for (let key in filesObj) {
      const newKey = key.split("/").slice(1).join("/");
      filesObjWithoutFolderName[newKey] = filesObj[key];
    }

    setFilesObj(filesObjWithoutFolderName);
  };

  const processFiles = async (files: FileList) => {
    const fileArray: FileData[] = [];
    const filesObj: { [key: string]: string } = {};
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = file.webkitRelativePath || file.name;

      // Skip node_modules folder, .git folder, .DS_Store. //todo: add more
      if (filePath.includes("node_modules") || filePath.includes(".git/") || filePath.includes(".DS_Store")) {
        continue;
      }

      // Skip image files
      if (imagExtensions.some(ext => filePath.endsWith(ext))) {
        continue;
      }

      const content = await readFileContent(file);
      fileArray.push({ path: filePath, content });
      filesObj[filePath] = content;
    }

    const filesObjWithoutFolderName: { [key: string]: string } = {};

    for (let key in filesObj) {
      const newKey = key.split("/").slice(1).join("/");
      filesObjWithoutFolderName[newKey] = filesObj[key];
    }

    setFilesObj(filesObjWithoutFolderName);

  };

  const traverseFileTree = async (
    item: any,
    path: string,
    fileArray: FileData[]
  ) => {
    if (item.isFile) {
      const file = await new Promise<File>((resolve) => item.file(resolve));
      // Skip node_modules folder, .git folder, .DS_Store. //todo: add more
      if (path.includes("node_modules") || path.includes(".git/") || path.includes(".DS_Store") || file.name.includes(".DS_Store")) {
        return;
      }

      // Skip image files
      if (imagExtensions.some(ext => file.name.endsWith(ext))) {
        return;
      }

      const content = await readFileContent(file);
      fileArray.push({ path: path + file.name, content });
    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      const entries = await new Promise<any[]>((resolve) =>
        dirReader.readEntries(resolve)
      );
      for (let entry of entries) {
        await traverseFileTree(entry, path + item.name + "/", fileArray);
      }
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <div className=" p-10">
      <div className="flex flex-col items-center">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`group flex flex-col gap-6 items-center justify-center p-10 w-full md:w-[40%] border-2 border-dotted rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${isDragging
            ? "border-indigo-500 bg-indigo-100"
            : "border-gray-600 bg-white"
            }`}
        >
          <IoCloudUploadOutline className="h-20 w-20 text-blue-500 transition-transform duration-300 ease-in-out transform group-hover:text-blue-700 group-hover:scale-110" />

          <label
            htmlFor="fileInput"
            className="cursor-pointer text-lg font-semibold text-gray-500 group-hover:text-blue-600 transition-colors ease-in-out  duration-300 "
          >
            {isDragging
              ? "Drop React folder here"
              : "Drag and drop react folder here"}
            <input
              id="fileInput"
              type="file"
              // @ts-ignore
              webkitdirectory="true"
              className="hidden"
              onChange={handleFileSelect}
              ref={inputRef}
            />
          </label>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-blue-600 font-semibold">
              Loading files...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderUpload;
