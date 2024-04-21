

import { getClassDetails } from "@/actions/courses"

import YoutubeEmbed from "@/components/videoEmbeds/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
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
        <div className="flex m-8">
            <div className="flex-grow">
                <h1>{details?.title}</h1>
                {videoId && videoType === "YOUTUBE" && <YoutubeEmbed embedId={videoId} />}
                {videoId && videoType === "DRIVE" && <DriveEmbed embedId={videoId} />}

                <div className="mt-2 rounded bg-secondary-500 p-4 flex-1">
                    <div className="text-2xl my-2 flex justify-between items-center">
                        Attachments
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
                                    className="p-4 rounded-lg mb-4 relative hover:bg-[#08205e] bg-[#061846]"
                                >
                                    <div className="flex justify-between">
                                        <div className="">
                                            <h3 className="text-xl font-semibold text-gray-500 mb-2">
                                                {attachment.title}
                                            </h3>
                                            <p className="text-gray-300">
                                                {attachment.details
                                                    ? attachment.details.toString()
                                                    : "No details available"}
                                            </p>
                                            <div className="text-gray-300 flex items-center">
                                                <p className="mr-2">Attachment Type:</p>
                                                <p>{attachment.attachmentType}</p>
                                            </div>
                                            <div className="text-gray-300 flex items-center">
                                                <p className="mr-2">Class ID:</p>
                                                <p>{attachment.classId}</p>
                                            </div>
                                            {attachment.link && (
                                                <a
                                                    href={attachment.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center no-underline space-y-5 text-blue-600 hover:underline"
                                                >
                                                    Link&nbsp;&nbsp;
                                                    <FaExternalLinkAlt />
                                                </a>
                                            )}
                                        </div>
                                        <div className="absolute top-0 right-0 p-3">
                                            <p className="text-red-700 font-bold">
                                                {attachment?.dueDate
                                                    ? new Date(
                                                        attachment?.dueDate
                                                    ).toLocaleDateString()
                                                    : "Not specified"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="h-[80vh] ml-2">
                <UserDoubts userDoubts={userDoubts} classId={params.classId} />
            </div>
        </div>
    );
}