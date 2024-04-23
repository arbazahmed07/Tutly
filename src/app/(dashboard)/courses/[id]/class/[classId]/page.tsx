
import { getClassDetails } from "@/actions/courses"

import YoutubeEmbed from "@/components/videoEmbeds/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import DriveEmbed from "@/components/videoEmbeds/DriveEmbed";
import { getUserDoubtsByClassId } from "@/actions/doubts";
import UserDoubts from "./UserDoubts";
import { FaExternalLinkAlt } from "react-icons/fa";

export default async function Class({
    params,
}: {
    params: { classId: string ,id:string };
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
                <h1 className="text-3xl font-semibold my-5">{details?.title}</h1>
                {videoId && videoType === "YOUTUBE" && <YoutubeEmbed embedId={videoId} />}
                {videoId && videoType === "DRIVE" && <DriveEmbed embedId={videoId} />}

            </div>
            <div className="block m-auto md:inline md:m-0 md:min-w-96">

            <div className="mt-5 rounded bg-secondary-500 p-2 w-full  h-full">
                <div className=" flex flex-row  items-center justify-end mb-5">
                    <div className="text-xl my-2">
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
                                className="py-2 rounded-lg mb-4 relative hover:bg-primary-900 bg-primary-800"
                                >
                                <div className="flex flex-col items-center my-2">
                                
                                    <div className="text-md mb-3 font-semibold">
                                        {attachment.title}
                                    </div>
                                    <div className="flex gap-5 items-center text-xs font-medium">
                                        <div className="text-secondary-300 flex items-center">
                                            <p className="text-sm">{attachment.attachmentType}</p>
                                        </div>
                                        {
                                            attachment.attachmentType==="ASSIGNMENT"?
                                            <div>
                                                <Link href={`/assignments/${attachment.id}`}  className="flex p-1.5 bg-secondary-200 items-center rounded-md text-secondary-900">
                                                    <h1>View </h1><FaExternalLinkAlt className="ml-2 w-3 h-3"/>
                                                </Link>
                                            </div>:
                                            <div>
                                                {
                                                    attachment.link && (
                                                        <div>
                                                        <Link href={attachment.link} className="flex p-2 bg-secondary-200 rounded-md items-center text-secondary-900">
                                                            <h1>Link</h1><FaExternalLinkAlt className="ml-2"/>
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                            </div>
                                            
                                        }
                                        {
                                            attachment.attachmentType==="ASSIGNMENT"&&
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
                                </div>
                        );
                    })}
                </div>
            </div>
            </div>
        </div>
    );
}