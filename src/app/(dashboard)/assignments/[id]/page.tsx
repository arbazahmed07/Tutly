import { getAssignmentById } from "@/actions/getAssignments";

export default async function SubmmitAssignment({ params }: { params: { id: string } }) {

    const assignment = await getAssignmentById(params.id);

    return (
        <div>
            <div>
                SubmitAssignmet: {params.id}
            </div>
            <button className="bg-primary-600 text-secondary-100 p-2 text-sm rounded-lg font-semibold">
                Submit Through playground
            </button>
            <pre>{JSON.stringify(assignment, null, 2)}</pre>
        </div >
    )
}