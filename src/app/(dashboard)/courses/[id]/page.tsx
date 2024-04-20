import React from 'react'

const page = async ({ params }: {
    params: { id: string }
}) => {
    return (
        <div className='m-5'>
            <h1 className='text-center text-xl p-2 bg-secondary-800'>Information About the course</h1>
            <h1>Select class to watch</h1>
        </div>
    )
}

export default page