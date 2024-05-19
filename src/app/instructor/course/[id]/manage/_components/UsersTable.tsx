'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaSort,  FaSortAlphaDown,  FaSortAlphaDownAlt, FaSortAlphaUpAlt, FaUserPlus } from 'react-icons/fa';
import { RiGlobalLine } from "react-icons/ri";
import { TbUserOff } from "react-icons/tb";
import { TbUserSearch } from "react-icons/tb";
import { MdOutlineBlock } from "react-icons/md";
import { FaUserXmark } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

const UserTable = ({ users, params }: { users: Array<any>, params: any }) => {

const [loading, setLoading] = useState(false);
const router = useRouter()
const [showAllUsers, setShowAllUsers] = useState(true);
const [searchBar,  setSearchBar] = useState('');
const roles = ['STUDENT', 'MENTOR'];
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
const [sortColumn, setSortColumn] = useState<string>(''); 

const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchBar.trim().toLowerCase())
);

const displayedUsers = showAllUsers ? filteredUsers : filteredUsers.filter(user => user.enrolledUsers.length === 0);

    
const handleEnroll =  async (username: string) => {
    toast.loading('Enrolling user...');
    try{
        setLoading(true);
        const res = await axios.post('/api/course/enrollUser', {
            courseId: params.id,
            username
        });
        console.log(res.data);
        toast.dismiss();
        toast.success(`${username} enrolled successfully`);
        setLoading(false);
        router.refresh ()
    }catch(err :any){
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.error);
    }
}

const handleUnenroll = async (username: string) => {
    toast.loading('Unenrolling user...');
    try{
        setLoading(true);
        const res = await axios.post('/api/course/unenrollUser', {
            courseId: params.id,
            username
        });
        console.log(res.data);
        toast.dismiss();
        toast.success(`${username} unenrolled successfully`);
        setLoading(false);
        router.refresh ()
    }catch(err :any){
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.error);
    }
}

const handleRoleChange = async (username: string, role: string) => {
    toast.loading('Updating user role...');
    try{
        setLoading(true);
        const res = await axios.post('/api/course/updateToMentor', {
            username,
            role
        });
        console.log(res.data);
        toast.dismiss();
        toast.success(`User role updated to ${role}`);
        setLoading(false);
        router.refresh ()
    }catch(err :any){
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.error);
    }
}


const handleSort = (column: string) => {
    if (column === sortColumn) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
        setSortColumn(column);
        setSortOrder('asc');
    }
};

const sortedUsers = users.sort((a, b) => {
    if (sortColumn === 'username') {
        return sortOrder === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
    } else if (sortColumn === 'role') {
        return sortOrder === 'asc' ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role);
    }
    return 0;
});

return (
<div className="mb-10">
    <div className="flex items-center justify-between space-x-4 mb-4">
    <div className=' flex items-center justify-center relative '>
        <input
        type="text"
        placeholder="Search by username..."
        value={searchBar}
        onChange={(e) =>  setSearchBar(e.target.value)}
        className="  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <TbUserSearch className=' w-5 h-5 absolute top-2 right-2 ' />
    </div>
    
        <div className=' flex items-center justify-center'>
            <label className="cursor-pointer flex items-center justify-center mr-3">
                <input
                type="radio"
                name="userFilter"
                checked={showAllUsers}
                onChange={() => setShowAllUsers(true)}
                className="mr-2 "
                />
                All  { } <RiGlobalLine className='w-5 h-5' />
            </label>
            <label className="cursor-pointer flex items-center justify-center ">
                <input
                type="radio"
                name="userFilter"
                checked={!showAllUsers}
                onChange={() => setShowAllUsers(false)}
                className="mr-2"
                />
                Users Not Enrolled { }  <TbUserOff className='w-5 h-5' />
            </label>
        </div>
    </div>


    <table className="border border-collapse border-gray-300">
    <thead>
        <tr className=' bg-sky-800'>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2 " >
                <div  className=' flex items-center justify-center'>

                    Username &nbsp;
                    {
                        sortColumn !== 'username' &&  <FaSort className=' cursor-pointer' onClick={() => handleSort('username')}/>
                    }
                    {
                        sortColumn === 'username' && sortOrder === 'desc' && <FaSortAlphaDownAlt onClick={() => handleSort('username')} className='w-4 h-4 cursor-pointer' />
                    }
                    {
                        sortColumn === 'username' && sortOrder === 'asc' && <FaSortAlphaDown onClick={() => handleSort('username')} className='w-4 h-4 cursor-pointer' />
                    }
                </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2 " >
                <div className=' flex items-center justify-center'>
                    Role &nbsp; 
                    {
                        sortColumn !== 'role' &&  <FaSort onClick={() => handleSort('role')} className=' cursor-pointer'/>
                    }
                    {
                        sortColumn === 'role' && sortOrder === 'desc' && <FaSortAlphaDownAlt onClick={() => handleSort('role')} className='w-4 h-4 cursor-pointer' />
                    }
                    {
                        sortColumn === 'role' && sortOrder === 'asc' && <FaSortAlphaDown  onClick={() => handleSort('role')} className='w-4 h-4 cursor-pointer' />
                    }
                </div>
            </th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
        </tr>
    </thead>
    <tbody>
        {
            displayedUsers.length === 0 && (
                <tr className='  '>
                    <td colSpan={6} className="text-center text-xl py-4  ">
                        <div className=' flex items-center justify-center px-16 '>
                            No users found <MdOutlineBlock className='w-8 h-8' /> 
                        </div>
                    </td>
                </tr>
            )
        }
        {displayedUsers.map((user, index) => (
        <tr key={user.id} className={`${user.enrolledUsers.length === 0 ? 'bg-red-500 hover:bg-red-600 ' : 'hover:bg-slate-600'} `}>
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="py-2 px-4 border border-gray-300">
            <div className="flex items-center space-x-2">
                {user.image ? (
                <img
                    src={user.image}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                />
                ) : (
                <img src={'/images/placeholder.jpg'} className="w-8 h-8 rounded-full" alt="no image dummy" />
                )}
                <span>{user.username}</span>
            </div>
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2  text-center">
                {
                user.role !== 'INSTRUCTOR' ? 
                    <select
                            value={user.role}
                            onChange={(e)=>handleRoleChange(user.username,e.target.value)}
                        className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>
                            {role}
                        </option>
                        ))}
                    </select>
                    :
                    <span className=' px-2.5 py-1 rounded-md disabled select-none cursor-not-allowed bg-zinc-700 text-white font-semibold '>
                        {user.role}
                    </span>
                }
            </td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">
            {user.enrolledUsers.find( ({course}:{ course:any }) => course.id===params.id ) === undefined  ? 'Not Enrolled ' :
                user.enrolledUsers.map(({ course }: { course: any }, index: number) => (
                    course.id === params.id &&
                    <span key={course.id}>{index > 0 ? ', ' : ''}{course.title}</span>
                ))}
            </td>
            <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
            {user.enrolledUsers.find(({course}: { course:any }) => course.id === params.id) === undefined ?
                <button disabled={loading} onClick={() => handleEnroll(user.username)} className="px-3 py-1.5 flex items-center justify-center bg-emerald-700 text-white rounded-full hover:bg-emerald-800 select-none focus:outline-none focus:bg-emerald-800">
                    Enroll &nbsp; <FaUserPlus className=' w-6 h-6' />
                </button>
                :
                <button disabled={loading} onClick={() => handleUnenroll(user.username)}  className="px-3 py-1.5 flex items-center justify-center bg-red-800 text-white rounded-full hover:bg-red-700 select-none focus:outline-none focus:bg-red-800">
                    Unenroll &nbsp; <FaUserXmark className=' w-6 h-6' />
                </button>
            }
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
);
};


export default UserTable;
