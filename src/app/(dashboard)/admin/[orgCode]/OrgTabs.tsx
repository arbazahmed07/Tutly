
import React from 'react'
import Link from 'next/link'
import { headers } from 'next/headers';

const OrgTabs = ({ organizations }: { organizations: any[] }) => {

  const fullUrl = headers().get('referer') || "";
  const pathname = new URL(fullUrl).pathname;

  return (
    <div className="flex flex-wrap gap-2">
      {organizations?.map((org) => (
        <Link
          key={org?.orgCode}
          href={`/admin/users/${org?.orgCode}`}
          className={`w-20 rounded p-2 sm:w-auto ${pathname.includes(org?.orgCode)
            ? "rounded border border-blue-500"
            : ""
            }`}
        >
          <h1 className="max-w-xs truncate text-sm font-medium">
            {org?.name}
          </h1>
        </Link>
      ))}
    </div>
  )
}

export default OrgTabs