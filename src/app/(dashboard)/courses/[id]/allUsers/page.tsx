import { getAllUsers } from '@/actions/users';
import React from 'react';
import UserTable from './_components/UsersTable';


const page = async ( {params} : {params:{id:string}} ) => {

    const allUsers = await getAllUsers(params.id);
    
    return (
        <div className=' flex items-center justify-center'>
            <UserTable users={allUsers || []} params={params} />
        </div>
    );
};

export default page;