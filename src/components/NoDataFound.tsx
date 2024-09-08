import React from 'react'
import Image from 'next/image'

const NoDataFound = ({
  message = 'No data found'
}:{
  message?: string
}) => {
  return (
    <div>
      <p className='text-3xl font-bold text-center mt-5'>
        Oops! {message}
      </p>
      <Image
        src="/notify_nodatafound.svg"
        height={400}
        className="mx-auto mt-8"
        width={400}
        alt={message}
      />
    </div>
  )
}

export default NoDataFound