"use client";
import { useState } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FcDisapprove, FcApproval } from "react-icons/fc";

const QA = [
  {
    question: "How does React handle state?",
    answer:
      "React handles state using the useState hook for functional components and this.state for class components.",
    answered: true,
  },
  {
    question: "What is Flowbite?",
    answer: "",
    answered: false,
  },
  {
    question:
      "What programming language is known for its simplicity and readability?",
    answer: "Python is known for its simplicity and readability.",
    answered: true,
  },
];

export default function Doubts() {
  const [openAccordion, setOpenAccordion] = useState(-1);
  const [show, setShow] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="h-60 w-full bg-gradient-to-l from-blue-400 to-blue-600 px-10 pt-10">
      <h1 className="text-center text-3xl font-semibold">
        Share, Discuss & Clear all your Doubts
      </h1>
      <div className="mt-3 flex justify-center gap-10 md:mt-8">
        <div className="flex flex-col items-center text-sm font-medium leading-6">
          <p>Post your doubts with ease</p>
          <p>Engage with Mentors and Teachers</p>
          <button
            onClick={handleShow}
            className="mt-4 rounded-md bg-blue-600 px-6 py-3"
          >
            Ask your Doubt
          </button>
          {show && (
            <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-secondary-900 bg-opacity-70">
              <div className="relative w-full max-w-xl rounded-lg bg-secondary-50">
                <div className="p-5">
                  <h3 className="text-lg font-bold leading-6 text-secondary-700">
                    Enter your doubt here
                  </h3>
                  <form className="mt-2">
                    <textarea
                      id="message"
                      rows={4}
                      className="block w-full rounded-lg bg-slate-400 p-2.5 outline-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="mr-4 mt-3 rounded-md bg-blue-500 px-6 py-2"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShow(false)}
                      className="mt-3 rounded-md bg-blue-500 px-6 py-2"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        id="accordion-color"
        data-accordion="collapse"
        className="mb-10 mt-10 md:mt-16"
      >
        {QA.map((qa, index) => (
          <div key={index}>
            <button
              type="button"
              className={`flex w-full items-center justify-between gap-3 p-3 font-medium ${openAccordion === index ? "bg-blue-600" : ""}`}
              onClick={() => toggleAccordion(index)}
            >
              <div className="">{qa.question}</div>
              <div className="flex items-center">
                {qa.answered === true ? (
                  <FcApproval className="mr-3 h-6 w-6" />
                ) : (
                  <FcDisapprove className="mr-3 h-6 w-6" />
                )}
                {openAccordion === index ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>
            </button>
            {qa.answered === true && (
              <div
                id={`accordion-color-body-${index}`}
                className={`bg-secondary-200 p-3 text-primary-800 ${openAccordion === index ? "block" : "hidden"}`}
              >
                <p>{qa.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
