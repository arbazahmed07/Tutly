import Link from "next/link"

const SubmitAssignmet = ({ params }: {
    params: { id: string }
}) => {
    return (
        <div>
            <div>
                <h1>SubmitAssignmet: {params.id}</h1>
            </div>
            <Link href={`/playground/html-css-js?assignmentId=${params.id}`} className="bg-primary-600 text-secondary-100 p-2 text-sm rounded-lg font-semibold">
                Submit Through playground 
            </Link>
        </div>
    )
}

export default SubmitAssignmet