
import { getClassDetails } from "@/actions/courses"
import getCurrentUser from "@/actions/getCurrentUser";
import YoutubeEmbed from "@/components/videoEmbeds/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import DriveEmbed from "@/components/videoEmbeds/DriveEmbed";
import { FaExternalLinkAlt } from "react-icons/fa";

export default async function Class({
    params,
}: {
    params: { classId: string, id: string };
}) {
    const details = await getClassDetails(params.classId);
    const YOUTUBE = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const DRIVE = /\/file\/d\/([^\/]+)/;
    const videoLink = details?.video.videoLink;
    const videoType = details?.video.videoType;
    const currentUser = await getCurrentUser();
    let matchType;

    switch (videoType) {
        case 'YOUTUBE':
            matchType = YOUTUBE;
            break;
        case 'DRIVE':
            matchType = DRIVE;
            break;
        default:
            matchType = null;
            break;

    }
    const match = videoLink?.match(matchType as RegExp);
    let videoId;
    if (videoLink && match) {
        videoId = match[1];
    }

    return (
        <div className="flex md:m-5 gap-6 flex-wrap">
            <div className="flex-1 text-secondary-100 ">
                {videoId && videoType === "YOUTUBE" && <YoutubeEmbed embedId={videoId} />}
                {videoId && videoType === "DRIVE" && <DriveEmbed embedId={videoId} />}
            </div>

            <div className="w-full md:m-0 md:w-96">
                <div className="rounded-xl p-2 w-full h-full bg-slate-800">
                    <div className=" flex flex-row  items-center justify-end mb-5">
                        <div hidden={ currentUser?.role === "STUDENT"} className="text-xl my-2">
                            <Link href={`/attachments/new?courseId=${params.id}&classId=${params.classId}`}>
                                <Button
                                    className="flex justify-between items-center bg-secondary-700 hover:bg-secondary-800"
                                    variant={"secondary"}
                                >
                                    Add an assignment&nbsp;
                                    <FaPlus />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        {details?.attachments?.map((attachment, index) => {
                            return (
                                <div
                                    key={index}
                                    className="py-2 rounded-lg mb-4 relative bg-blue-600"
                                >
                                    <div className="flex gap-5 items-center text-sm font-medium p-2">
                                        <div className="font-semibold">
                                            {attachment.title}
                                        </div>
                                        <div className="text-secondary-300 flex items-center">
                                            <p className="text-sm">{attachment.attachmentType}</p>
                                        </div>
                                        {
                                            attachment.attachmentType === "ASSIGNMENT" ?
                                                <div>
                                                    <Link href={`/assignments/${attachment.id}`}>
                                                        <FaExternalLinkAlt className="ml-2 w-3 h-3" />
                                                    </Link>
                                                </div> :
                                                <div>
                                                    {
                                                        attachment.link && (
                                                            <div>
                                                                <Link href={attachment.link}>
                                                                    <FaExternalLinkAlt className="ml-2" />
                                                                </Link>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                        }
                                        {
                                            attachment.attachmentType === "ASSIGNMENT" &&
                                            <div>
                                                {attachment?.dueDate
                                                    ? new Date(
                                                        attachment?.dueDate
                                                    ).toLocaleDateString()
                                                    : "Not specified"}
                                            </div>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}