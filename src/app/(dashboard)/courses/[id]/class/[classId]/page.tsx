
import { getClassDetails } from "@/actions/courses"
import getCurrentUser from "@/actions/getCurrentUser";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Class({ params }: { params: { classId: string } }) {
    const details = await getClassDetails(params.classId);
    const currentUser = await getCurrentUser();

    return (
        <div className="w-full flex justify-between m-8">
            {
                currentUser?.role === "STUDENT" ? (
                <div>
                    <YoutubeEmbed embedId="Big_aFLmekI" />
                    <div className="mt-2 rounded bg-secondary-500 p-4">
                        Attachments
                        {currentUser?.role }
                    {/* <div className="w-[400px] rounded bg-secondary-600 p-4">Doubts | Timestamps</div> */}
                    </div>
                </div>
                ) : (
                <div className=" ">
                    <YoutubeEmbed embedId="Big_aFLmekI" />
                    <div className=" flex justify-between items-center mx-2 mt-4">
                        <div className="mt-2 rounded bg-secondary-500 p-4">
                            Attachments
                        </div>
                        <Link href={'/assignments/new'} >
                            <Button variant={'secondary'} size={'sm'}>
                                Add Attachment
                            </Button>
                        </Link>
                    </div>
                </div>
                )
            }
            <div className="w-[400px] rounded bg-secondary-600 p-4">Doubts | Timestamps</div>
        </div>
    )
}