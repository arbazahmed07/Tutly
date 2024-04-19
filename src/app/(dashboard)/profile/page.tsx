import getCurrentUser from "@/actions/getCurrentUser";

const Page=async()=>{
    
  const currentUser = await getCurrentUser();
    return (
        <div className="p-5">
            <h1>Profile</h1>
            {JSON.stringify(currentUser)}
            
        </div>
    )
}

export default Page;