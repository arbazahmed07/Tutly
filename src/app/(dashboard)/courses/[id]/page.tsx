import { getCourseClasses } from '@/actions/getAllCourses'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }: {
    params: { id: string }
}) => {
    const classes = await getCourseClasses(params.id)
    return (
        <div className="flex">
            <div className="flex flex-col px-4 py-3 gap-2 shadow-xl min-h-[90vh]">
                <h1 className="px-4">HTML</h1>
                    {
                        classes.map((x) => {
                            return (
                                <h1 className="px-4 py-2 cursor-pointer rounded hover:bg-primary-900">{x.title}</h1>
                            )
                        })
                    }
            </div>
            <div>{JSON.stringify(classes,null,2)}</div>
        </div>
    )
}

export default page