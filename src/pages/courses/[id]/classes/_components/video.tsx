import { FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import NewAttachmentPage from "./NewAssignments";
import VideoPlayer from "@/components/VideoPlayer";
import type { Attachment, Class, Video } from "@prisma/client";

export default function Class({
  classes,
  classId,
  id,
  currentUser,
  details,
}: {
  classes: any;
  classId: string;
  id: string;
  currentUser: any;
  details: Class & {
    video: Video | null;
    attachments: Attachment[];
  } | null;
}) {
  if (!details) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  const { video, title, createdAt, attachments } = details;
  const { videoLink, videoType } = video || {};

  const isCourseAdmin = currentUser?.adminForCourses?.some(
    (course: { id: string }) => course.id === id
  );
  const haveAdminAccess = currentUser && (currentUser.role === "INSTRUCTOR" || isCourseAdmin);

  const getVideoId = () => {
    if (!videoLink || !videoType) return null;

    const PATTERNS = {
      YOUTUBE: /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
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

  return (
    <div className="flex flex-wrap gap-6 md:m-5">
      <div className="flex-1">
        <div className="h-full w-full rounded-xl p-2">
          <div>
            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex items-center justify-start space-x-5">
                <p className="text-xl font-semibold">{title}</p>
                {haveAdminAccess && (
                  <div className="flex items-center gap-3">
                    <a href={`/courses/${id}/classes/${classId}/edit`}>
                      <RiEdit2Fill className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>
              <p className="text-sm font-medium">{new Date(createdAt).toDateString()}</p>
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
                <DialogContent className="min-w-[70vw] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Assignment</DialogTitle>
                    <DialogDescription>Create a new assignment for this class.</DialogDescription>
                  </DialogHeader>
                  <NewAttachmentPage classes={classes} courseId={id} classId={classId} />
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
                        ? new Date(attachment.dueDate).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
