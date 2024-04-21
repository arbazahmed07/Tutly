import dynamic from 'next/dynamic'
import React from 'react'
const LoginRedirect = dynamic(()=>import('./LoginRedirect'), {
  ssr: false
})

const page = () => {
  return (
    <LoginRedirect />
  )
}

export default page