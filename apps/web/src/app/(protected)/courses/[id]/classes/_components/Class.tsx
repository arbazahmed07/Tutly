"use client";

import type { Attachment, Class, Notes, Video } from "@prisma/client";
import { FileType } from "@prisma/client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  FaBookmark,
  FaExternalLinkAlt,
  FaPencilAlt,
  FaPlus,
  FaRegBookmark,
  FaStickyNote,
  FaTags,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { useDebounce } from "use-debounce";

import VideoPlayer from "./videoEmbeds/VideoPlayer";
import RichTextEditor from "@/components/editor/RichTextEditor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/trpc/react";

import EditClassDialog from "./EditClassDialog";
import NewAttachmentPage from "./NewAssignments";

interface ClassProps {
  courseId: string;
  classId: string;
  currentUser: {
    id: string;
    role: string;
    adminForCourses?: { id: string }[];
  };
}

export default function Class({
  courseId,
  classId,
  currentUser,
}: ClassProps) {
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [debouncedNotes] = useDebounce(notes, 1000);
  const [notesStatus, setNotesStatus] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isClearNotesDialogOpen, setIsClearNotesDialogOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { data: classes } = api.classes.getClassesByCourseId.useQuery({ courseId });
  const { data: classDetails } = api.classes.getClassDetails.useQuery({ id: classId });
  const { data: notesData } = api.notes.getNote.useQuery({
    userId: currentUser.id,
    objectId: classId,
  });
  const { data: bookmarkData } = api.bookmarks.getBookmark.useQuery({
    userId: currentUser.id,
    objectId: classId,
  });

  useEffect(() => {
    if (notesData?.data) {
      setNotes(notesData.data.description ?? "");
      setTags(notesData.data.tags ?? []);
    }
  }, [notesData]);


  const updateNote = api.notes.updateNote.useMutation();
  const toggleBookmark = api.bookmarks.toggleBookmark.useMutation();
  const deleteAttachment = api.attachments.deleteAttachment.useMutation();


  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    const timer = setTimeout(() => {
      const saveNotes = async () => {
        if (!debouncedNotes && debouncedNotes === "") {
          return;
        }

        try {
          setNotesStatus("Saving...");
          updateNote.mutate({
            objectId: classId,
            category: "CLASS",
            description: debouncedNotes,
            tags: tags,
            causedObjects: { classId: classId, courseId: courseId },
          });
          setLastSaved(new Date());
          setNotesStatus("Saved");
        } catch (error) {
          setNotesStatus("Failed to save");
        }
      };

      void saveNotes();
    }, 2000);

    return () => clearTimeout(timer);
  }, [debouncedNotes, classId, tags, isInitialLoad, updateNote, courseId]);

  if (!classDetails?.data) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  const { video, title, createdAt, attachments } = classDetails.data;
  const { videoLink, videoType } = video ?? {};
  const isBookmarked = !!bookmarkData?.data;

  const isCourseAdmin = currentUser?.adminForCourses?.some(
    (course: { id: string }) => course.id === courseId
  );
  const haveAdminAccess = currentUser.role == "INSTRUCTOR" || isCourseAdmin;

  const getVideoId = () => {
    if (!videoLink || !videoType) return null;

    const PATTERNS = {
      YOUTUBE:
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      DRIVE: /\/file\/d\/([^\/]+)/,
    };

    const pattern = PATTERNS[videoType as keyof typeof PATTERNS];
    if (!pattern) return null;

    const match = videoLink.match(pattern);
    return match ? match[1] : null;
  };

  const videoId = getVideoId();

  const renderVideo = () => {
    if (!videoId) {
      return (
        <span className="text-sm text-muted-foreground flex items-center justify-center h-full">
          No video to display
        </span>
      );
    }

    return <VideoPlayer videoId={videoId} videoType={videoType as "YOUTUBE" | "DRIVE"} />;
  };

  const renderAttachmentLink = (attachment: Attachment) => {
    if (attachment.attachmentType === "ASSIGNMENT") {
      return (
        <a href={`/assignments/${attachment.id}`}>
          <FaExternalLinkAlt className="m-auto h-4 w-4" />
        </a>
      );
    }

    if (attachment.link) {
      return (
        <a href={attachment.link} className="text-sm">
          <FaExternalLinkAlt className="m-auto h-4 w-4" />
        </a>
      );
    }

    return "No link";
  };

  const handleDelete = async () => {
    try {
      if (!selectedAttachment?.id) return;
      await deleteAttachment.mutateAsync({
        id: selectedAttachment.id,
      });
      toast.success("Assignment deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete assignment");
    }
  };

  const toggleBookMark = async () => {
    try {
      const response = await toggleBookmark.mutateAsync({
        objectId: classId,
        category: "CLASS",
        causedObjects: { classId: classId, courseId: courseId },
      });

      if (!response.success) {
        toast.error("failed to add bookmark");
      } else {
        toast.success(isBookmarked ? "Bookmark removed" : "Bookmark added");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to toggle bookmark");
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleClearNotes = async () => {
    try {
      setNotesStatus("Clearing...");
      setNotes("");

      updateNote.mutate({
        objectId: classId,
        category: "CLASS",
        description: null,
        tags: [],
        causedObjects: { classId: classId, courseId: courseId },
      });

      setTags([]);
      setLastSaved(new Date());
      setNotesStatus("Cleared");
      setIsClearNotesDialogOpen(false);
      toast.success("Notes cleared successfully");
      window.location.reload();
    } catch (error) {
      setNotesStatus("Failed to clear");
      toast.error("Failed to clear notes");
    }
  };

  return (
    <div className="flex flex-col gap-2 md:m-5">
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <div className="h-full w-full rounded-xl p-2">
            <div>
              <div className="mb-2 flex w-full items-center justify-between">
                <div className="flex items-center justify-start space-x-5">
                  <p className="text-xl font-semibold">{title}</p>
                  {haveAdminAccess && (
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditDialogOpen(true)}
                        className="hover:bg-secondary/80"
                      >
                        <RiEdit2Fill className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleBookMark}
                      className="hover:bg-secondary/80"
                    >
                      {isBookmarked ? (
                        <FaBookmark className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <FaRegBookmark className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-sm font-medium">{dayjs(createdAt).format("MMM D, YYYY")}</p>
              </div>
              <div className="flex-1 text-secondary-100 w-full aspect-video bg-gray-500/10 rounded-xl object-cover">
                {renderVideo()}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pb-4 md:m-0 md:w-96">
          <div className="h-full w-full rounded-xl p-2">
            {haveAdminAccess && (
              <div className="flex w-full justify-end mb-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="text-white flex items-center gap-2">
                      Add an assignment
                      <FaPlus />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[70vw] max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle>Add Assignment</DialogTitle>
                      <DialogDescription>Create a new assignment for this class.</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] overflow-y-auto">
                      <NewAttachmentPage classes={classes} courseId={courseId} classId={classId} />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            <table className="w-full border-collapse">
              <thead className="mb-4 border-b-2 border-secondary-400 font-semibold">
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Link</th>
                  <th className="px-4 py-2">Due Date</th>
                  {haveAdminAccess && <th className="px-4 py-2">Actions</th>}
                </tr>
              </thead>
              <tbody className="text-white">
                {!attachments?.length ? (
                  <tr className="bg-blue-500 text-center">
                    <td className="py-4 text-center text-lg" colSpan={4}>
                      No assignments
                    </td>
                  </tr>
                ) : (
                  attachments.map((attachment, index) => (
                    <tr className="bg-blue-500 text-center" key={index}>
                      <td className="px-4 py-2">
                        <div className="font-semibold">
                          {attachment.title}
                          <div className="text-sm font-medium text-neutral-300">
                            {attachment.attachmentType.toLowerCase()}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">{renderAttachmentLink(attachment)}</td>
                      <td className="px-4 py-2">
                        {attachment.attachmentType === "ASSIGNMENT" && attachment.dueDate
                          ? dayjs(attachment.dueDate).format("MMM D, YYYY")
                          : "-"}
                      </td>
                      {haveAdminAccess && (
                        <td className="px-4 py-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <BsThreeDotsVertical className="h-5 w-5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAttachment(attachment);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <FaPencilAlt className="h-4 w-4" />
                                  Edit
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedAttachment(attachment);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <FaTrashAlt className="h-4 w-4" />
                                  Delete
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="w-full bg-transparent rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaStickyNote className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Class Notes</h2>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <FaTags className="h-5 w-5 text-blue-600" />
            <div className="flex flex-wrap gap-2 items-center">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 flex items-center gap-2">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="text-xs hover:text-red-500">
                    ×
                  </button>
                </Badge>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className="w-32 h-8"
                />
                <Button variant="outline" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {notesStatus && <span>{notesStatus}</span>}
            {lastSaved && <span> • Last saved {dayjs(lastSaved).fromNow()}</span>}
          </div>
          {notes && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsClearNotesDialogOpen(true)}
              className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
            >
              <FaTrash className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <RichTextEditor
          initialValue={notes ?? ""}
          onChange={(value: string) => setNotes(value ?? "")}
          allowUpload={true}
          fileUploadOptions={{
            fileType: FileType.NOTES,
            associatingId: classId,
            allowedExtensions: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
          }}
        />
      </div>

      {/* Edit Dialog */}
      <EditClassDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        courseId={courseId}
        classDetails={classDetails.data}
      />

      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the assignment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear Notes Alert Dialog */}
      <AlertDialog open={isClearNotesDialogOpen} onOpenChange={setIsClearNotesDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Notes?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your notes for this class. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearNotes} className="bg-red-600 hover:bg-red-700">
              Clear Notes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
