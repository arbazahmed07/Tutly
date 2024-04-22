import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import {getAllAssignedAssignmentsByUserId} from '@/actions/getAssignments'
import getCurrentUser from '@/actions/getCurrentUser'
import { json } from 'stream/consumers'

const page = async ({ params }: {
    params: { id: string }
}) => {

    const currentUser = await getCurrentUser();
    const assignments = await getAllAssignedAssignmentsByUserId( currentUser?.id || '')
    
    console.log(assignments);
    
    return (
        <div className='m-3'>
            <h1 className='text-center text-xl p-2 bg-secondary-800'>Information About the course</h1>
            {/* <pre>{ JSON.stringify(assignments.coursesWithAssignments,null,2) }</pre> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {assignments.coursesWithAssignments?.map(assignment => (
                    assignment.classes.map(classItem => (
                        classItem.attachments.map(attachment => (
                            <div key={attachment?.id} className="bg-primary-900 hover:bg-primary-800 shadow-md rounded-lg p-4">
                                <h2 className="text-lg font-semibold mb-2">{attachment?.title}</h2>
                                <p className="text-secondary-200 mb-2">{attachment?.details || 'No Description'} </p>
                                <p className="text-gray-600 mb-2">Created At: {new Date(attachment.createdAt).toLocaleString()}</p>
                                <p className="text-gray-600 mb-2">Updated At: {new Date(attachment.updatedAt).toLocaleString()}</p>
                                <p className="text-secondary-200 mb-2">Due Date: {attachment?.dueDate ? new Date(attachment?.dueDate).toLocaleDateString() : 'Not specified'}</p>
                                <p className="text-secondary-200 mb-2">Class Name: {classItem?.class?.title || 'null'}</p>
                                <p className="text-secondary-200 mb-2">Submission Status: {attachment?.submissions.length > 0 ? 'Submitted' : 'Not Submitted'}</p>
                                {
                                    attachment?.link && (
                                        <a href={attachment?.link } className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">View Assignment</a>
                                    )
                                }
                            </div>
                        ))
                    ))
                ))}
                </div>
        </div>
    )
}

export default page