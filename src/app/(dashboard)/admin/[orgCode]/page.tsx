import NoDataFound from '@/components/NoDataFound';
import { db } from '@/lib/db'
import { redirect } from 'next/navigation';


const page = async () => {
  const organizations = await db.organization.findFirst()

  if (!organizations) {
    return <NoDataFound message='No organizations found' />
  }

  redirect(`/admin/${organizations?.orgCode}/users`)
}

export default page