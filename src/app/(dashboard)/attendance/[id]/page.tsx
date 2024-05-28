import { getAttedanceByClassId } from "@/actions/attendance"

export default async function({params}:any) {
    const attendance = await getAttedanceByClassId(params.id)
    return (
        <pre>
            {JSON.stringify(attendance,null,2)}
        </pre>
    )
}