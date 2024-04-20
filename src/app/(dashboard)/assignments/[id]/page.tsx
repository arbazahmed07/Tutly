import { getAssignmentById } from "@/actions/getAssignments";
import Link from "next/link";

export default async function SubmmitAssignment({ params }: { params: { id: string } }) {

    const assignment = await getAssignmentById(params.id);

    return (
        <div>
            <div>
                SubmitAssignmet: {params.id}
            </div>
            <Link href={`/playground/html-css-js?userAssignmentId=${params.id}`}  className="bg-primary-600 text-secondary-100 p-2 text-sm rounded-lg font-semibold">
                Submit Through playground
            </Link>
            <pre>{JSON.stringify(assignment, null, 2)}</pre>
        </div >
    )
}