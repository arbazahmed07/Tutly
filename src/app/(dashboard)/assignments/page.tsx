import { getAllAssignedAssignments } from "@/actions/getAssignments"
import Link from "next/link";

export default async function Assignments() {

    const assignments = await getAllAssignedAssignments();

    return (
        <div>
            Assignments

            {
                assignments?.map((assignment) => (
                    <div key={assignment.id} className="flex gap-3 items-center">
                        <div>
                            {assignment.assignment.title}-{assignment.assignment.id}
                        </div>
                        <Link href={`/assignments/${assignment.id}`} className="p-2 bg-secondary-800 rounded-md">
                            View Details / Submit
                        </Link>
                    </div>
                ))
            }

            <pre>{JSON.stringify(assignments, null, 2)}</pre>
        </div >
    )
}