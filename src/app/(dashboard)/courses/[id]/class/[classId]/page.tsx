

import { getClassDetails } from "@/actions/courses"

import YoutubeEmbed from "@/components/videoEmbeds/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import DriveEmbed from "@/components/videoEmbeds/DriveEmbed";
import { getUserDoubtsByClassId } from "@/actions/doubts";
import UserDoubts from "./UserDoubts";

export default async function Class({
    params,
}: {
    params: { classId: string };
}) {
    const userDoubts = await getUserDoubtsByClassId(params.classId);
    const details = await getClassDetails(params.classId);
    const YOUTUBE = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const DRIVE = /\/file\/d\/([^\/]+)/;
    const videoLink = details?.video.videoLink;
    const videoType = details?.video.videoType;
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
        <div className="flex md:m-5 flex-wrap gap-6">
            <div className="flex-grow text-secondary-100">
                {videoId && videoType === "YOUTUBE" && <YoutubeEmbed embedId={videoId} />}
                {videoId && videoType === "DRIVE" && <DriveEmbed embedId={videoId} />}
                <div className="mt-5 rounded bg-secondary-500 p-2 w-full">
                    <div className="text-xl my-2">
                        <Link href={`/attachments/new?classId=${details?.id}`}>
                            <Button
                                className="flex justify-between items-center bg-secondary-700 hover:bg-secondary-800"
                                variant={"secondary"}
                            >
                                Add an assignment&nbsp;
                                <FaPlus />
                            </Button>
                        </Link>
                    </div>
                    <div>
                        {details?.attachments?.map((attachment, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg mb-4 relative hover:bg-primary-900 bg-primary-800"
                                >
                                    <div>
                                        <div className="">
                                            <div className="flex justify-between items-center">
                                                <div className="text-md font-semibold">
                                                    {attachment.title}
                                                </div>
                                                <div className="text-sm font-medium">
                                                    {attachment?.dueDate
                                                        ? new Date(
                                                            attachment?.dueDate
                                                        ).toLocaleDateString()
                                                        : "Not specified"}
                                                </div>
                                            </div>
                                            <p className="text-sm text-secondary-300">
                                                <span className="font-bold">Assignment : </span>{attachment.details
                                                    ? attachment.details.toString()
                                                    : "No details available"}
                                            </p>
                                            <div className="text-secondary-300 flex items-center">
                                                <p className="mr-2 text-sm font-bold">Attachment Type:</p>
                                                <p className="text-sm">{attachment.attachmentType}</p>
                                            </div>
                                            {attachment.link && (
                                                <a
                                                    href={attachment.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center no-underline space-y-5 text-blue-600 hover:underline"
                                                >
                                                    Link
                                                    
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="block m-auto md:inline md:m-0">
                <UserDoubts userDoubts={userDoubts} classId={params.classId} />
            </div>
        </div>
    );
}