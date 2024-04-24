"use client"
import { useState } from 'react';
import Image from "next/image" 
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; 
import { FcDisapprove, FcApproval } from "react-icons/fc";

const QA = [
  {
    question: "How does React handle state?",
    answer: "React handles state using the useState hook for functional components and this.state for class components.",
    answered: true
  },
  {
    question: "What is Flowbite?",
    answer: "",
    answered: false
  },
  {
    question: "What programming language is known for its simplicity and readability?",
    answer: "Python is known for its simplicity and readability.",
    answered: true
  }
];

export default function Doubts() {
    const [openAccordion, setOpenAccordion] = useState(-1);
    const [show, setShow] = useState(false);

    const toggleAccordion = (index:number) => {
      setOpenAccordion(openAccordion === index ? -1 : index);
    };

    const handleShow = () => {
        setShow(true);
    };

    return (
        <div className="h-60 w-full bg-gradient-to-l from-blue-400 to-blue-600 px-10 pt-10">
            <h1 className="text-center text-3xl font-semibold">Share, Discuss & Clear all your Doubts</h1>
            <div className="flex justify-center mt-3 md:mt-8 gap-10">
                <div className="flex flex-col items-center text-sm font-medium leading-6">
                    <p>Post your doubts with ease</p>
                    <p>Engage with Mentors and Teachers</p>
                    <button onClick={handleShow} className="py-3 px-6 rounded-md mt-4 bg-blue-600">Ask your Doubt</button>
                    {show && (
                      <div className="fixed z-10 inset-0 overflow-y-auto bg-secondary-900 bg-opacity-70 flex items-center justify-center">
                        <div className="relative rounded-lg w-full bg-secondary-50 max-w-xl">
                          <div className="p-5">
                            <h3 className="text-lg font-bold leading-6 text-secondary-700">Enter your doubt here</h3>
                            <form className="mt-2">
                              <textarea id="message" rows={4} className="block p-2.5 w-full bg-slate-400 rounded-lg outline-none"></textarea>
                              <button type="submit" className="px-6 py-2 bg-blue-500 rounded-md mt-3 mr-4">Submit</button>
                              <button type="button" onClick={()=>setShow(false)} className="px-6 py-2 bg-blue-500 rounded-md mt-3">Cancel</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
            </div>
            <div id="accordion-color" data-accordion="collapse" className="mt-10 mb-10 md:mt-16">
              {QA.map((qa, index) => ( 
                <div key={index}>
                  <button type="button" className={`flex items-center justify-between w-full p-3 font-medium gap-3 ${openAccordion === index ? 'bg-blue-600' : ''}`} onClick={() => toggleAccordion(index)}>
                    <div className="">{qa.question}</div>
                    <div className="flex items-center">
                      {qa.answered === true ? <FcApproval className="h-6 w-6 mr-3"/> : <FcDisapprove className="h-6 w-6 mr-3"/>}
                      {openAccordion === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </div>
                  </button>
                  {
                    qa.answered === true &&
                    <div id={`accordion-color-body-${index}`} className={`p-3 bg-secondary-200 text-primary-800 ${openAccordion === index ? 'block' : 'hidden'}`}>
                    <p>{qa.answer}</p>
                    </div>
                  }
                </div>
              ))}
            </div>
        </div>
    );
}
