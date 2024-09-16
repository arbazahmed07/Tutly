import { getClassDetails } from "@/actions/courses";
import getCurrentUser from "@/actions/getCurrentUser";
import YoutubeEmbed from "@/components/videoEmbeds/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import DriveEmbed from "@/components/videoEmbeds/DriveEmbed";
import { FaExternalLinkAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import DeleteClass from "@/components/DeleteClass";
import Image from "next/image";

export default async function Class({
  params,
}: {
  params: { classId: string; id: string };
}) {
  const details = await getClassDetails(params.classId);
  const YOUTUBE =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const DRIVE = /\/file\/d\/([^\/]+)/;
  const videoLink = details?.video.videoLink;
  const videoType = details?.video.videoType;
  const currentUser = await getCurrentUser();

  const isCourseAdmin = currentUser?.adminForCourses?.some(
    (course) => course.id === params.id,
  );

  const haveAdminAccess =
    currentUser && (currentUser.role === "INSTRUCTOR" ?? isCourseAdmin);

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
  const match = videoLink?.match(matchType);
  let videoId;
  if (videoLink && match) {
    videoId = match[1];
  }

  return !details ? (
    <div className="mt-8 flex w-full items-center justify-center text-center">
      <Image
        unoptimized
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
                    <Link
                      href={`/courses/${params.id}/class/${params.classId}/edit`}
                    >
                      <RiEdit2Fill className="h-5 w-5" />
                    </Link>
                    <DeleteClass
                      classId={params.classId}
                      courseId={params.id}
                    />
                  </div>
                )}
              </div>
              {details && (
                <p className="text-sm font-medium">
                  {String(details?.createdAt.toDateString())}
                </p>
              )}
            </div>
            <div className="flex-1 text-secondary-100">
              {videoId && videoType === "YOUTUBE" && (
                <YoutubeEmbed embedId={videoId} />
              )}
              {videoId && videoType === "DRIVE" && (
                <DriveEmbed embedId={videoId} />
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
                <Link
                  href={`/attachments/new?courseId=${params.id}&classId=${params.classId}`}
                >
                  <Button
                    className="flex items-center justify-between bg-secondary-700 text-white hover:bg-secondary-600"
                    variant={"secondary"}
                  >
                    Add an assignment&nbsp;
                    <FaPlus />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <table className="w-full border-collapse">
            <thead className="mb-4 border-b-2 border-secondary-400 font-semibold">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Due Date</th>
            </thead>
            <tbody className="text-white">
              {details?.attachments?.length === 0 ? (
                <tr className="bg-blue-500 text-center">
                  <td className="py-4 text-center text-lg" colSpan={4}>
                    No assignments
                  </td>
                </tr>
              ) : (
                details?.attachments?.map((attachment, index) => (
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
                        <Link href={`/assignments/${attachment.id}`}>
                          <FaExternalLinkAlt className="m-auto h-4 w-4" />
                        </Link>
                      ) : attachment.link ? (
                        <Link href={attachment.link} className="text-sm">
                          <FaExternalLinkAlt className="m-auto h-4 w-4" />
                        </Link>
                      ) : (
                        "No link "
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {attachment.attachmentType === "ASSIGNMENT" &&
                        attachment.dueDate
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
