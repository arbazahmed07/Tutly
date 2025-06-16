"use client";

import type { File } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Download, FileText, Plus, Trash2 } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFileUpload } from "@/components/useFileUpload";
import { api } from "@/trpc/react";

const Drive = ({ uploadedFiles }: { uploadedFiles: File[] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteReason, setDeleteReason] = useState("");

  const { uploadFile } = useFileUpload({
    fileType: "OTHER",
    onUpload: async (file) => {
      if (!file?.publicUrl) return;
      toast.success("File uploaded successfully");
    },
  });

  const { mutateAsync: archiveFile } = api.fileupload.archiveFile.useMutation({
    onSuccess: () => {
      toast.success("File deleted successfully");
      setDeleteReason("");
    },
    onError: () => {
      toast.error("Failed to delete file");
    },
  });

  const { mutate: downloadFile } = api.fileupload.getDownloadUrl.useMutation({
    onSuccess: (data) => {
      if (typeof data === "string") {
        window.open(data, "_blank");
      } else if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
    },
    onError: () => {
      toast.error("Failed to download file");
    },
  });

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setIsUploading(true);

    const file = e.target.files[0];
    if (!file) return;
    await uploadFile(file);
    setIsUploading(false);
  };

  const handleDownload = (fileId: string) => {
    downloadFile({ fileId });
  };

  const handleArchive = async (fileId: string) => {
    await archiveFile({
      fileId,
      reason: deleteReason,
    });
  };

  const fileTypes = ["ALL", "OTHER", "NOTES", "ATTACHMENT", "AVATAR"] as const;

  const DeleteDialog = ({ fileId }: { fileId: string }) => (
    <Button
      variant="ghost"
      size="icon"
      title="Delete"
      onClick={async () => {
        const reason = window.prompt("Please enter a reason for deletion:");
        if (reason !== null) {
          setDeleteReason(reason);
          await handleArchive(fileId);
        }
      }}
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </Button>
  );

  const FileCard = ({ file }: { file: File }) => (
    <Card key={file.id} className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-blue-500" />
          <div>
            <h3 className="font-medium text-lg truncate max-w-[200px]">{file.name}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => void handleDownload(file.id)}
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
          <DeleteDialog fileId={file.id} />
        </div>
      </div>
    </Card>
  );

  const EmptyState = ({ fileType }: { fileType?: string }) => (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-600">
        No {fileType ? `${fileType.toLowerCase()} ` : ""}files uploaded yet
      </h3>
      <p className="text-gray-500">
        Your uploaded {fileType ? `${fileType.toLowerCase()} ` : ""}files will appear here
      </p>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-3xl font-bold">My Drive</h1>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Upload File
        </Button>
        <Input ref={fileInputRef} type="file" onChange={handleUpload} className="hidden" />
      </div>
    </div>

      {isUploading && (
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-full bg-blue-500 rounded animate-pulse" />
          </div>
        </div>
      )}

      <Tabs defaultValue="ALL" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-4 flex w-full min-w-max">
            {fileTypes.map((type) => (
              <TabsTrigger 
                key={type} 
                value={type}
                className="flex-1 whitespace-nowrap px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm"
              >
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {fileTypes.map((fileType) => {
          const filteredFiles =
            fileType === "ALL"
              ? uploadedFiles
              : uploadedFiles.filter((file) => file.fileType === fileType);

          return (
            <TabsContent key={fileType} value={fileType}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <FileCard key={file.id} file={file} />
                ))}
              </div>

              {filteredFiles.length === 0 && (
                <EmptyState fileType={fileType !== "ALL" ? fileType : ""} />
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Drive;