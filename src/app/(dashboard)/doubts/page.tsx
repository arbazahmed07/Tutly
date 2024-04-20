"use client"
import { useState } from 'react';
import Image from "next/image"

export default function Doubts() {

    const [show, setShow] = useState(false);
    function handleShow() {
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }
    return (
        <div className="h-72 w-full bg-primary-400 p-10 text-secondary-50">
            <h1 className="text-center text-3xl font-semibold">Share , Discuss & Clear all your Doubts</h1>
            <div className="flex justify-center mt-10 gap-10">
                {/* <div></div> */}
                <div className="text-center text-sm font-medium leading-6">
                    <p>Post your doubts with ease</p>
                    <p>Engage with Mentors and Teachers</p>
                    <button className="py-3 px-6 rounded-md mt-4 bg-primary-600">Ask your Doubt</button>
                </div>
                <div>
                    <Image src="https://acourseoflove.org/wp-content/uploads/2020/08/Ask-your-questions-3.png" alt="" height={160} width={160}/>
                </div>
            </div>
        </div>
    )
}


