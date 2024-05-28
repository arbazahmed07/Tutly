import { getAttedanceByClassId } from "@/actions/attendance"

const page = async ({ params }: { params: { id: string } }) => {
    const attendance = await getAttedanceByClassId(params.id)
    return (
        <pre>
            {JSON.stringify(attendance, null, 2)}
        </pre>
    )
}

export default page