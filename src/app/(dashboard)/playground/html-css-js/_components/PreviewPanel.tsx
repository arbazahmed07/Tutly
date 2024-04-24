"use client";
import { useContext, useState } from 'react';
import { Context } from './context';
import { RiFullscreenExitLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaEye } from "react-icons/fa6";


const PreviewPanel = () => {
  const { state } = useContext(Context);
  const srcDoc = state.html + '<style>' + state.css + '</style>' + '<script>' + state.js + '</script>';

  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <div>
      <div className={`hidden md:flex justify-between px-3 items-center p-3`}>
        <h1 className="text-primary-400 text-sm font-semibold">Preview</h1>
        <div className="flex text-primary-400 text-sm font-semibold gap-5">
          <h1 onClick={handleShow}><RiFullscreenExitLine className="h-5 w-5" /></h1>
        </div>
        {show && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="rounded-lg bg-primary-50">
              <h1 className="h-[7vh] flex justify-end items-center bg-secondary-900 text-primary-50">
                <RxCross2 className="h-8 w-8 mr-2" onClick={handleClose} />
              </h1>
              <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
                className="h-[93vh] bg-primary-50"
              />
            </div>
          </div>
        )}
      </div>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
        className="h-screen hidden md:flex"
      />
      <div className='md:hidden flex items-center'>
        <h1 onClick={handleShow} className="px-1 text-primary-400 text-sm font-semibold"><FaEye className="h-5 w-5 mx-2" /></h1>
      </div>
      {show &&
        <div className="md:hidden fixed z-50 inset-0 overflow-y-auto">
          <div className="rounded-lg bg-primary-50">
            <h1 className="h-[7vh] flex justify-end items-center bg-secondary-900 text-primary-50">
              <RxCross2 className="h-8 w-8 mr-2" onClick={handleClose} />
            </h1>
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              width="100%"
              height="100%"
              className="h-[93vh] bg-primary-50 p-0 box-border "
            />
          </div>
        </div>
      }
    </div>
  );
};

export default PreviewPanel;


