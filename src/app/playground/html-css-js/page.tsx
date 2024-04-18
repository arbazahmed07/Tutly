import React from 'react'
import dynamic from 'next/dynamic'

const Playground = dynamic(() => import('./_components/Playground'), {
  ssr: false,
})

const page = () => {
  return (
    <Playground />
  )
}

export default page