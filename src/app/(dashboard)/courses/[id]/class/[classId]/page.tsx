import { getClassDetails } from "@/actions/courses"
import YoutubeEmbed from "@/components/YoutubeEmbed";

export default async function Class({ params }: { params: { classId: string } }) {
    const details = await getClassDetails(params.classId);
    return (
        <div className="w-full flex justify-between m-8">
            <div>
                <YoutubeEmbed embedId="Big_aFLmekI" />
                <div className="mt-2 rounded bg-secondary-500 p-4">
                    Attachments
                </div>
            </div>
            <div className="w-[400px] rounded bg-secondary-600 p-4">Doubts | Timestamps</div>
        </div>
    )
}