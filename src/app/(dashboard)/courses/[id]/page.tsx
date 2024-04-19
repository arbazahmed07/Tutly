import { getCourseClasses } from '@/actions/getAllCourses'
import React from 'react'

const page = async ({ params }: {
    params: { id: string }
}) => {
    const classes = await getCourseClasses(params.id)
    return (
        <div>
            {JSON.stringify(classes,null,2)}
        </div>
    )
}

export default page