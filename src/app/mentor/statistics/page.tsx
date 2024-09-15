"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function page() {
    const router = useRouter();
    router.push('/mentor/statistics/0878eafa-880d-4cea-b647-e1656df1cc9d')
  return (
    <div>No course enrolled!</div>
  )
}

export default page