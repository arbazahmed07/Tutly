"use client"
import { useEffect, useRef, useState } from 'react';
import Image from "next/image" 
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; 
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCrown } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { ImReply } from "react-icons/im";
import { MdCancelScheduleSend } from "react-icons/md";
import { PiCrown } from "react-icons/pi";
import { PiCrownSimpleFill } from "react-icons/pi";


export default function Accordion({doubts ,currentUser,currentCourseId}: any) {
    const [openAccordion, setOpenAccordion] = useState(-1);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    
    const [dbts, setDbts] = useState(doubts|| []);
    const [doubt, setDoubt] = useState<string>("");
    const [reply, setReply] = useState<string>("");
    const [replyId, setReplyId] = useState<string>("");
    
    useEffect(() => {
      setDbts(doubts);
    },[currentCourseId])
    
    const QA = dbts;
    console.log(QA);
    
    
    
    const handleAddDoubt = async (data  : any) => {
      console.log(data);
      
      const res = await axios.post("/api/doubts/postDoubt", {
        courseId : currentCourseId,
        title: undefined,
        description: data.message,
      });
      if (res.data.error) {
        toast.error("Failed to add doubt");
      } else {
        toast.success("Doubt added successfully");
        setDoubt("");
        setDbts([...doubts, res.data]);
      }
    };
  
    const handleReply = async (id: string) => {
      if (!reply) return;
  
      const res = await axios.post("/api/doubts/reply", {
        doubtId: id,
        description: reply,
      });
      if (res.data.error) {
        toast.error("Failed to add reply");
      } else {
        toast.success("Reply added successfully");
        setReply("");
        setReplyId("");
        setDbts(
          doubts.map((d: any) =>
            d.id === id ? { ...d, response: [...d.response, res.data] } : d
          )
        );
      }
    };
  
    const handleDeleteDoubt = async (id: string) => {
      alert("Are you sure you want to delete this doubt?");
      const res = await axios.delete(`/api/doubts/deleteDoubt/${id}`);
      if (res.data.error) {
        toast.error("Failed to delete doubt");
      } else {
        toast.success("Doubt deleted successfully");
        setDbts(doubts.filter((d: any) => d.id !== id));
      }
    };
  
    const handleDeleteReply = async (replyId: string) => {
      alert("Are you sure you want to delete this reply?");
      const res = await axios.delete(`/api/doubts/reply/${replyId}`);
      if (res.data.error) {
        toast.error("Failed to delete reply");
      } else {
        toast.success("Reply deleted successfully");
        setDbts(
          doubts.map((d: any) => ({
            ...d,
            response: d.response.filter((r: any) => r.id !== replyId),
          }))
        );
      }
    };
  
    const handleReplyEnterBtn = (e: any) => {
      handleReply(replyId);
    };

    
    const handleEscKeyDown = (e : any) => {
      if (e.key === 'Escape') {
        setShow(false); 
      }
    };


    const handleReplyKeyDown = (e : any) => {
      if (e.key === 'Escape') {
        setShow(false); 
      }
    };
    
    
    const toggleAccordion = (index:number) => {
      setOpenAccordion(openAccordion === index ? -1 : index);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = (e : any) => {
        e.preventDefault();
        const data = {
          message: message
        };
        if(!data.message) {
          toast.error("Please enter a message");
          return
        }
        handleAddDoubt(data);
        setShow(false);
      };
    
      const handleChange = (e : any) => {
          e.preventDefault();
            setMessage(e.target.value);
      };


      function formatDateTime(dateTimeString : string) {
        const dateTime = new Date(dateTimeString);
      
        const day = dateTime.getDate().toString().padStart(2, "0");
        const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); 
        const year = dateTime.getFullYear().toString().slice(-2); 
      
        let hour = dateTime.getHours();
        const minute = dateTime.getMinutes().toString().padStart(2, "0");
        const ampm = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12 || 12; 
      
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hour}:${minute} ${ampm}`;
      
        return `${formattedDate} || ${formattedTime}`;
      }
      
      const addDoubtRef = useRef( null );
      
    return (
        <div className="h-60  bg-gradient-to-l sm:min-w-[800px] px-7 ">
            <div className="flex justify-center md:mt-8 gap-10">
                <div className="flex flex-col items-center text-sm font-medium ">
                  <div className=' w-full flex flex-row-reverse  '>
                    <button onClick={()=> {handleShow() ;setOpenAccordion(-1);   }} className="py-3 px-4 rounded-md mt-3 bg-blue-600 hover:bg-blue-700">Ask your Doubt</button>
                  </div>
                    {show && (
                      <div ref = {addDoubtRef} className="fixed z-10 inset-0 overflow-y-auto bg-secondary-900 bg-opacity-70 flex items-center justify-center">
                        <div className="relative rounded-lg w-full bg-secondary-50 max-w-xl">
                          <div className="p-5" onKeyDown={handleEscKeyDown}>
                            <h3 className="text-lg font-bold  text-secondary-700">Enter your doubt here</h3>
                            <form  className="mt-2" onSubmit={ handleSubmit} onKeyDown={handleEscKeyDown}>
                              <textarea ref={addDoubtRef} id="message" placeholder='Start here...' onChange={(e)=>handleChange(e)} onKeyDown={handleEscKeyDown} rows={4} value={message} className="block p-2.5 w-full rounded-lg outline-none bg-white border-2"></textarea>
                              <button type="submit" className="px-6 py-2 bg-blue-500 rounded-md mt-3 mr-4">Submit</button>
                              <button type="button" onClick={()=>setShow(false)} className="px-6 py-2 bg-blue-500 rounded-md mt-3">Cancel</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
            </div>
            <div id="accordion-color" data-accordion="collapse" className="my-10 mb-10 md:mt-16 cursor-pointer  " >
            {QA.map((qa : any, index : number) => ( 
                <div key={index} className="relative cursor-pointer mb-1">
                <div className={`flex items-center justify-between w-full p-3 font-medium gap-3 rounded-t-xl ${openAccordion === index ? 'bg-blue-600' : 'bg-slate-400'}`} >
                    <div className='flex justify-start items-center space-x-2 relative'> 
                        {qa.user.role === 'STUDENT' &&
                            <Image src={qa.user?.image} alt="profile" width={30} height={30} className="rounded-full shadow-lg shadow-fuchsia-500/50 ring ring-offset-1 ring-fuchsia-600" />
                        }
                        {qa.user.role === 'MENTOR' && 
                          <div className='relative'>  
                                <FaCrown className='text-yellow-400 hover:text-yellow-500 drop-shadow-sm shadow-yellow-500 w-6 h-6 absolute -left-4 -top-4 transform -rotate-45' />
                                <Image src={qa.user?.image} alt="profile" width={30} height={30} className="rounded-full shadow-lg shadow-yellow-400/50  " />
                          </div>
                        }
                        {qa.user.role === 'INSTRUCTOR' && 
                          <div className='relative'>
                                <FaCrown className='text-red-500 hover:text-red-600 drop-shadow-sm shadow-red-500 w-6 h-6 absolute -left-4 -top-4 transform -rotate-45' />
                                <Image src={qa.user.image} alt="profile" width={30} height={30} className="rounded-full shadow-lg shadow-red-400/50  " />
                          </div>
                        }
                        <div className=" flex flex-col justify-start">
                            <div className="flex justify-start items-center space-x-2">
                                <p className="text-sm    text-secondary-900 ">{qa.user?.name} </p>
                                <p className='text-sm '>{formatDateTime(qa.createdAt)}</p>
                            </div>                
                            <div className='flex justify-start'>
                                <p className='text-mefdium font-medium'>{qa.description}</p>
                            </div>                
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center">
                      <div className='flex justify-start items-center space-x-3' >
                          <p className="text-sm text-gray-800 flex justify-start items-center font-bold">{qa.response.length} &nbsp; <PiUserListFill className=' w-5 h-5' /></p>
                          <div className="p-2 dark:bg-secondary-900 font-bold dark:hover:bg-secondary-800 bg-secondary-400 hover:bg-secondary-500  flex items-center justify-start text-white rounded text-sm"
                          >

                            {openAccordion === index ? <IoIosArrowUp onClick={() => toggleAccordion(index)} className=' cursor-pointer'  /> : <IoIosArrowDown onClick={() => toggleAccordion(index)} className=' cursor-pointer' />}
                          </div>
                          <div>
                            <button
                              hidden = {currentUser.role === 'STUDENT'}
                              className="p-1 text-sm   dark:bg-secondary-800 dark:hover:bg-secondary-700 bg-secondary-400 hover:bg-secondary-500  text-white rounded mr-2"
                              onClick={() => handleDeleteDoubt(qa.id)}
                              >
                              <MdDelete className='cursor-pointer  w-5 h-5 text-red-700 hover:text-red-600' />
                            </button>
                          </div>
                        {
                        replyId === qa.id ? (
                          <div className="flex items-center mt-1 space-x-4">
                            <input
                              type="text"
                              placeholder="Enter your reply"
                              value={reply}
                              onKeyDown={
                                (e) => {
                                  if (e.key === 'Enter') {
                                    handleReplyEnterBtn(qa.id);
                                  }
                                  if (e.key === 'Escape') {
                                    setReplyId('');
                                  }
                                }
                              }
                              onChange={(e) => setReply(e.target.value)}
                              className="w-full sm:w-auto px-4 py-2 border outline-none border-secondary-300 rounded mr-2 mb-2 sm:mb-0"
                            />
                            <button
                              title="btn"
                              className="p-2 dark:bg-secondary-900 dark:hover:bg-secondary-800 bg-secondary-400 hover:bg-secondary-500  flex items-center justify-start text-white rounded text-sm"
                              onClick={() => handleReply(qa.id)}
                            >
                              <BsFillSendArrowUpFill />
                            </button>

                            <button
                              title="btn"
                              className="p-2 dark:bg-secondary-900 dark:hover:bg-secondary-800 bg-secondary-400 hover:bg-secondary-500  flex items-center justify-start text-white rounded text-sm"
                              onClick={() => setReplyId('')}
                            >
                              <MdCancelScheduleSend />
                            </button>

                          </div>
                        ) : (
                          <button
                            title="btn"
                            className="p-1 mt-1 text-sm  dark:bg-secondary-900 dark:hover:bg-secondary-800 bg-secondary-400 hover:bg-secondary-500 text-white rounded"
                            onClick={() => setReplyId(qa.id)}
                          >
                            <ImReply className='cursor-pointer  w-5 h-5  ' />
                          </button>
                        )
                        }
                      </div>
                    </div>
                </div>
                {
                    openAccordion === index &&  qa.response.length === 0 && (
                      <div className='absolute top-full left-0 z-50  w-full bg-white shadow-lg p-3'>
                        <div className="flex justify-center items-center  space-x-2 mt-3 bg-secondary-300 p-2 rounded-lg hover:bg-secondary-400">
                          <div className='flex items-center space-x-2'>
                            <p className="text-medium text-gray-800 flex justify-start items-center font-bold">No responses</p>
                          </div>
                        </div>
                      </div>
                    )
                }
                {openAccordion === index && qa.response.length > 0 && (
                    <div className="absolute top-full left-0 z-50 w-full bg-white shadow-lg p-3 ">
                    {qa.response.map((r : any, responseIndex : number) => (
                        <div key={responseIndex} className="flex items-center justify-between space-x-2 mt-3 bg-secondary-400 p-2 rounded-lg hover:bg-secondary-500 ">
                            <div className='flex items-center space-x-2'>                                
                                {r.user?.role === 'STUDENT' &&
                                    <Image src={r.user.image} alt="profile" width={30} height={30} className="rounded-full shadow-lg shadow-fuchsia-500/50 ring ring-offset-1 ring-fuchsia-600" />
                                }
                                {r.user?.role === 'MENTOR' && 
                                    <div className='relative'>
                                        <FaCrown className='text-yellow-400 hover:text-yellow-500 drop-shadow-sm shadow-yellow-500 w-6 h-6 absolute -left-4 -top-4 transform -rotate-45' />
                                        <Image src={r.user.image} alt="profile" width={30} height={30} className="rounded-full shadow-lg shadow-yellow-400/50  " />
                                    </div>
                                }
                                {r.user?.role === 'INSTRUCTOR' && 
                                    <div className='relative'>
                                        <PiCrownSimpleFill className='text-red-400 hover:text-red-500 drop-shadow-sm shadow-red-500 w-6 h-6 absolute -left-4 -top-4 transform -rotate-45' />
                                        <Image src={r.user.image} alt="profile" width={30} height={30} className="rounded-full shadow-lg shadow-red-400/50  " />
                                    </div>
                                }
                                <div className='flex flex-col text-black'>
                                    <div className='flex justify-start items-center space-x-2'>
                                        <p className="text-xs  font-medium  text-secondary-700">{r.user?.name}</p>
                                        <p className='text-xs font-medium'>{formatDateTime(r.createdAt)}</p>
                                    </div>
                                    <p className="text-sm font-medium ">{r.description}</p>
                                </div>
                            </div>
                            <div>
                                {
                                  (currentUser.role === 'MENTOR' || currentUser.role === 'INSTRUCTOR' ) && 
                                  <button onClick={() => handleDeleteReply(r.id) }>
                                      <MdDelete className='cursor-pointer w-5 h-5 text-red-700 hover:text-red-600'  />
                                  </button>
                                 }
                                 
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
    );
}
