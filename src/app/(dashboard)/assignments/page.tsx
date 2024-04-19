import { getAllAssignedAssignments } from "@/actions/getAssignments"

export default async function Assignments() {

    const assignments = await getAllAssignedAssignments();

    return (
        <div>
            Assignments
            <pre>{JSON.stringify(assignments, null, 2)}</pre>
        </div >
    )
}