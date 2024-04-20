import Link from "next/link"

const SubmitAssignmet = ({ params }: {
    params: { id: string }
}) => {
    return (
        <div>
            <div>
                SubmitAssignmet: {params.id}
            </div>
            <Link href={`/playground/html-css-js?userAssignmentId=${params.id}`} className="bg-primary-600 text-secondary-100 p-2 text-sm rounded-lg font-semibold">
                Submit Through playground 
            </Link>
        </div>
    )
}

export default SubmitAssignmet