import { useState, useRef, type ChangeEvent } from "react";
import { File } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { FileText, Download, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { actions } from "astro:actions";
import { toast } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFileUpload } from "@/components/useFileUpload";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Drive = ({ uploadedFiles }: { uploadedFiles: File[] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const { uploadFile } = useFileUpload({
    fileType: "OTHER",
    onUpload: async (file: File) => {
      if (!file || !file.publicUrl) return;
      toast.success("File uploaded successfully");
      window.location.reload();
    }
  });

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setIsUploading(true);

    try {
      const file = e.target.files[0];
      if (!file) return;
      const user = await actions.users_getCurrentUser();
      if (!user) return;
      await uploadFile(file, user.data?.id);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (fileId: string) => {
    try {
      const { data: downloadUrl } = await actions.fileupload_getDownloadUrl({
        fileId,
      });
      if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      }
    } catch (error) {
      toast.error("Failed to download file");
    }
  };

  const handleArchive = async (fileId: string) => {
    try {
      await actions.fileupload_archiveFile({
        fileId,
        reason: deleteReason,
      });
      toast.success("File deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedFileId(null);
      setDeleteReason("");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  const fileTypes = ["ALL", "OTHER", "NOTES", "ATTACHMENT", "AVATAR"] as const;

  const DeleteDialog = ({ fileId }: { fileId: string }) => (
    <Dialog 
      open={isDeleteDialogOpen && selectedFileId === fileId} 
      onOpenChange={(open) => {
        if (!open) {
          setDeleteReason("");
          setSelectedFileId(null);
        }
        setIsDeleteDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Delete"
          onClick={() => {
            setSelectedFileId(fileId);
            setIsDeleteDialogOpen(true);
          }}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this file?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          id="reason"
          placeholder="Enter reason for deletion"
          className="mt-2 h-[100px]"
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          autoFocus
        />
        <DialogFooter>
          <Button variant="destructive" onClick={() => handleArchive(fileId)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
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
          <Input
            ref={fileInputRef}
            type="file"
            onChange={handleUpload}
            className="hidden"
          />
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
        <TabsList className="mb-4">
          {fileTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="ALL">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
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
                      onClick={() => handleDownload(file.id)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <DeleteDialog fileId={file.id} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {uploadedFiles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">No files uploaded yet</h3>
              <p className="text-gray-500">Your uploaded files will appear here</p>
            </div>
          )}
        </TabsContent>

        {fileTypes.slice(1).map((fileType) => (
          <TabsContent key={fileType} value={fileType}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles
                .filter((file) => file.fileType === fileType)
                .map((file) => (
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
                          onClick={() => handleDownload(file.id)}
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <DeleteDialog fileId={file.id} />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {uploadedFiles.filter((file) => file.fileType === fileType).length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600">No {fileType.toLowerCase()} files uploaded yet</h3>
                <p className="text-gray-500">Your uploaded {fileType.toLowerCase()} files will appear here</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Drive;