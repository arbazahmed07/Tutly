import { FaPlus } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import NoDataFound from "@/pages/courses/_components/NoDataFound";

import DriveEmbed from "./videoEmbeds/driveEmbeds";
import YoutubeEmbed from "./videoEmbeds/youtubeEmbeds";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import NewAttachmentPage from "./NewAssignments";

interface Attachment {
  id: string;
  title: string;
  link: string | null;
  attachmentType: string;
  dueDate: Date | null;
  classId: string | null;
  details: string | null;
  createdAt: Date;
  updatedAt: Date;
  courseId: string | null;
  maxSubmissions: number | null;
  submissionMode: string;
}

interface Video {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  videoLink: string | null;
  videoType: "YOUTUBE" | "DRIVE" | "ZOOM";
  timeStamps: any;
}

interface ClassDetails {
  id: string;
  title: string;
  createdAt: Date;
  video: Video | null;
  attachments: Attachment[];
  Folder: any | null;
}

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
  details: ClassDetails | null;
}) {
  const YOUTUBE =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const DRIVE = /\/file\/d\/([^\/]+)/;
  const videoLink = details?.video?.videoLink;
  const videoType = details?.video?.videoType;
  const isCourseAdmin = currentUser?.adminForCourses?.some(
    (course: { id: string }) => course.id === id
  );

  const haveAdminAccess = currentUser && (currentUser.role === "INSTRUCTOR" || isCourseAdmin);

  let matchType;

  switch (videoType) {
    case "YOUTUBE":
      matchType = YOUTUBE;
      break;
    case "DRIVE":
      matchType = DRIVE;
      break;
    default:
      matchType = null;
      break;
  }
  const match = videoLink && matchType ? videoLink.match(matchType) : null;
  let videoId;
  if (videoLink && match) {
    videoId = match[1];
  }
  if (!details) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return !details ? (
    <div className="mt-8 flex w-full items-center justify-center text-center">
      <img
        src="https://i.postimg.cc/jSvL48Js/oops-404-error-with-broken-robot-concept-illustration-114360-1932-removebg-preview.png"
        alt="404"
        width={400}
        height={400}
      />
    </div>
  ) : (
    <div className="flex flex-wrap gap-6 md:m-5">
      <div className="flex-1">
        <div className="h-full w-full rounded-xl p-2">
          <div className="flex flex-row items-center justify-end"></div>
          <div>
            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex items-center justify-start space-x-5">
                <p className="text-xl font-semibold">{details?.title}</p>
                {haveAdminAccess && details && (
                  <div className="flex items-center gap-3">
                    <a href={`/courses/${id}/classes/${classId}/edit`}>
                      <RiEdit2Fill className="h-5 w-5" />
                    </a>
                  </div>
                )}
              </div>
              {details && (
                <p className="text-sm font-medium">{new Date(details?.createdAt).toDateString()}</p>
              )}
            </div>
            <div className="flex-1 text-secondary-100">
              {videoId && videoType === "YOUTUBE" && <YoutubeEmbed embedId={videoId} />}
              {videoId && videoType === "DRIVE" && <DriveEmbed embedId={videoId} />}
              {!videoId && (
                <div className="mx-auto mt-28 p-16">
                  <NoDataFound message="No video uploaded" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-4 md:m-0 md:w-96">
        <div className="h-full w-full rounded-xl p-2" hidden={!details}>
          <div className="flex w-full flex-row-reverse items-center">
            {haveAdminAccess && details && (
              <div className="my-2 text-xl">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="flex items-center justify-between bg-secondary-700 text-white hover:bg-secondary-600"
                      variant={"secondary"}
                    >
                      Add an assignment&nbsp;
                      <FaPlus />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[70vw] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Assignment</DialogTitle>
                      <DialogDescription>
                        Create a new assignment for this class.
                      </DialogDescription>
                    </DialogHeader>
                    <NewAttachmentPage classes={classes} courseId={id} classId={classId}/>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <table className="w-full border-collapse">
            <thead className="mb-4 border-b-2 border-secondary-400 font-semibold">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Link</th>
                <th className="px-4 py-2">Due Date</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {details?.attachments?.length === 0 ? (
                <tr className="bg-blue-500 text-center">
                  <td className="py-4 text-center text-lg" colSpan={4}>
                    No assignments
                  </td>
                </tr>
              ) : (
                details?.attachments?.map((attachment: Attachment, index: number) => (
                  <tr className="bg-blue-500 text-center" key={index}>
                    <td className="px-4 py-2">
                      <div className="font-semibold">
                        {attachment.title}
                        <div className="text-sm font-medium text-neutral-300">
                          {attachment.attachmentType.toLocaleLowerCase()}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {attachment.attachmentType === "ASSIGNMENT" ? (
                        <a href={`/assignments/${attachment.id}`}>
                          <FaExternalLinkAlt className="m-auto h-4 w-4" />
                        </a>
                      ) : attachment.link ? (
                        <a href={attachment.link} className="text-sm">
                          <FaExternalLinkAlt className="m-auto h-4 w-4" />
                        </a>
                      ) : (
                        "No link "
                      )}
                    </td>
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
