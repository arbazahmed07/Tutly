import { db } from "@/lib/db"

const page = async () => {
  const events = await db.events.findMany({})
  return (
    <pre>{JSON.stringify(events,null,2)}</pre>
  )
}

export default page