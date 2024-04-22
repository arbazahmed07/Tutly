'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { log } from 'console';

const NewClass = () => {
const [videoLink, setVideoLink] = useState('');
const [videoType, setVideoType] = useState('');
const [classTitle, setClassTitle] = useState('');
const [textValue, setTextValue] = useState('Create Class');


const router = useRouter();
const params = useParams();


const handleCreateClass = async () => {

    const newClass = {videoLink,classTitle, videoType};

    if(!newClass.videoLink.trim() || !newClass.classTitle.trim() ) return toast.error("Please fill all fields");
    
    if (!newClass) return;

    setTextValue('Creating Class...');

    const res = await axios.post("/api/classes/create", {
        classTitle: newClass.classTitle,
        videoLink: newClass.videoLink,
        VideoType: newClass.videoType,
        courseId : params.id
    });

    if (res.data.error) {
        toast.error("Failed to add newClass");
    } else {
        toast.success("newClass added successfully");
        setVideoLink("");
        setClassTitle('');

        router.push(`/courses/${params.id}/class/${res.data.id}`);
    }
};


return (
    <div className="mt-8">
    <div className="flex flex-col items-center">
        <select
        value={videoType}
        onChange={(e) => setVideoType(e.target.value)}
        className="w-full sm:w-96 px-4 py-2 border border-secondary-300 rounded mb-4"
        >
            <option value="" disabled defaultChecked >Select Video Type</option>
            <option value="DRIVE">Drive</option>
            <option value="YOUTUBE">YouTube</option>
            <option value="ZOOM">Zoom</option>
        </select>
        <input
        type="text"
        placeholder="Enter video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="w-full sm:w-96 px-4 py-2 border border-secondary-300 rounded mb-4"
        />
        <input
        type="text"
        placeholder="Enter class title"
        value={classTitle}
        onChange={(e) => setClassTitle(e.target.value)}
        className="w-full sm:w-96 px-4 py-2 border border-secondary-300 rounded mb-4"
        />
        <Button
        disabled={!videoLink || !classTitle || !videoType || textValue === 'Creating Class...'}
        className="flex justify-between items-center bg-secondary-700 hover:bg-secondary-800"
        onClick={handleCreateClass}
        >
            {textValue}
            &nbsp;&nbsp;
            {
                textValue === 'Creating Class...' ? (
                    <div className="animate-spin">
                        <FaPlus />
                    </div>
                ):(
                    <FaPlus />
                )
            }
        </Button>
    </div>
    </div>
)

};

export default NewClass;
