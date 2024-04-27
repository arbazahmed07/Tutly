
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
                    <div className=" flex flex-row  items-center justify-end ">
                        <div hidden={ currentUser?.role === "STUDENT" || currentUser?.role === "MENTOR" } className="text-xl my-2">
                            <Link href={`/attachments/new?courseId=${params.id}&classId=${params.classId}`}>
                                <Button
                                    className="flex justify-between items-center bg-secondary-700 hover:bg-secondary-600"
                                    variant={"secondary"}
                                >
                                    Add an assignment&nbsp;
                                    <FaPlus />
                                </Button>
                            </Link>
                        </div>
                    </div>  
                    <table className="border-collapse w-full">  
                        <thead className="mb-4 border-b font-semibold">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Link</th>
                            <th className="px-4 py-2">Due Date</th>
                        </thead>
                        <tbody>
                            {details?.attachments?.length === 0 ? (
                             <tr className="bg-blue-500 text-center">
                                <td className="text-center text-lg py-4" colSpan={4}>No assignments</td>
                            </tr>
                            ) : (
                            details?.attachments?.map((attachment, index) => (
                            <tr className="bg-blue-500 border-b" key={index}>   
                                <td className="px-4 py-2">
                                    <div className="font-semibold">
                                        {attachment.title}
                                        <div className=" font-medium text-sm text-neutral-300">
                                            {attachment.attachmentType.toLocaleLowerCase() }   
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    {attachment.attachmentType === "ASSIGNMENT" ? (
                                    <Link href={`/assignments/${attachment.id}`}>
                                        <FaExternalLinkAlt className="w-4 h-4 m-auto" />
                                    </Link>
                                    ) : attachment.link ? (
                                    <Link href={attachment.link} className="text-sm">
                                        <FaExternalLinkAlt className="w-4 h-4 m-auto" />
                                    </Link>
                                    ) : 'No link '}
                                </td>
                                <td className="px-4 py-2  text-center">
                                    {attachment.attachmentType === "ASSIGNMENT" &&
                                    attachment.dueDate ? (
                                    new Date(attachment.dueDate).toLocaleDateString()
                                    ) : '-'}
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