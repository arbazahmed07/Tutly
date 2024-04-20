

import { getClassDetails } from "@/actions/courses"
import getCurrentUser from "@/actions/getCurrentUser";

import YoutubeEmbed from "@/components/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default async function Class({
  params,
}: {
  params: { classId: string };
}) {
const details = await getClassDetails(params.classId);
    var pattern =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = details?.video.videoLink?.match(pattern);
    let YoutubeId;
    if (match && match[1]) {
        YoutubeId = match[1];
    }
  return (
    <div className="w-full flex justify-between m-8">
        <div>
            <h1>{details?.title}</h1>
            <pre>{JSON.stringify(details?.video, null, 2)}</pre>
            {YoutubeId && <YoutubeEmbed embedId={YoutubeId} />}
            <div className="mt-2 rounded bg-secondary-500 p-4">
                <div className=" text-2xl my-2 flex justify-between items-center">
                    Attachments
                    <Link href={'/assignments/new'}>
                        <Button className="flex justify-between items-center" variant={"secondary"}>
                            Add assignment &nbsp;<FaPlus />
                        </Button>
                    </Link>
                </div>
            {/* <pre>{JSON.stringify(details?.attachments,null,3)}</pre> */}
            <div>
                {
                    details?.attachments?.map((attachment,index) => {
                        return (
                            <div key={index} className=" p-4 rounded-lg mb-4 relative hover:bg-[#08205e] bg-[#061846] "   >
                                <div className="flex justify-between">
                                    <div className="">
                                        <h3 className="text-xl font-semibold text-gray-500 mb-2">{attachment.title}</h3>
                                        <p className="text-gray-300">{attachment.details ? attachment.details.toString() : 'No details available'}</p>
                                        <div className="text-gray-300 flex items-center">
                                            <p className="mr-2">Attachment Type:</p>
                                            <p>{attachment.attachmentType}</p>
                                        </div>
                                        <div className="text-gray-300 flex items-center">
                                            <p className="mr-2">Class ID:</p>
                                            <p>{attachment.classId}</p>
                                        </div>
                                        {attachment.link && (
                                            <a href={attachment.link} target="_blank" rel="noopener noreferrer" className="flex items-center no-underline space-y-5  text-blue-600 hover:underline">Link&nbsp;&nbsp;<FaExternalLinkAlt /></a>
                                        )}
                                    </div>
                                    <div className="absolute top-0 right-0 p-3 ">
                                        <p className="text-red-700 font-bold">{attachment?.userAssignment[0]?.dueDate ? new Date(attachment?.userAssignment[0]?.dueDate).toLocaleDateString() : 'Not specified'}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            </div>
        </div>
        <div className="w-[400px] rounded bg-secondary-600 p-4">
            Doubts | Timestamps
        </div>
    </div>
  );
}

