import { db } from '@/lib/db'
import React from 'react'
import OrgTabs from './OrgTabs'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const organizations = await db.organization.findMany()
  return (
    <div className="flex flex-col gap-4">
      <OrgTabs organizations={organizations} />
      {children}
    </div>
  )
}