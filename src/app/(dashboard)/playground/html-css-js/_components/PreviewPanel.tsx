"use client";
import { useContext, useState } from 'react';
import { Context } from './context';
import { RiFullscreenExitLine } from "react-icons/ri";
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Octokit } from "@octokit/core";
import { RxCross2 } from "react-icons/rx";  
import {
  createPullRequest,
  DELETE_FILE,
} from "octokit-plugin-create-pull-request";
import toast from 'react-hot-toast';
const MyOctokit = Octokit.plugin(createPullRequest);

const PreviewPanel = () => {
  const { state } = useContext(Context);
  const srcDoc = state.html + '<style>' + state.css + '</style>' + '<script>' + state.js + '</script>';
  const session = useSession();
  const params = useSearchParams();
  const assignmentId = params.get('userAssignmentId');
  const token = session.data?.user.githubToken;
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  function handleShow() {
      setShow(true);
  }

  function handleClose() {
      setShow(false);
  }
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const octokit = new MyOctokit({
        auth: token,
      });
      toast.loading('Submitting assignment');
      const pr = await octokit
        .createPullRequest({
          owner: "WebWizards-Git",
          repo: "LMS-VNRVJIET",
          title: "Assignment 1 submission by 22071A05E3",
          body: "pull request description",
          head: "22071A05E3-Assignment-1",
          base: "main",
          update: true,
          forceFork: false,
          //todo:check for non admins
          labels: [
            "assignment-submission",
          ],
          changes: [
            {
              files: {
                "assignments/22071A05E3/assignment-1/index.html": state.html,
                "assignments/22071A05E3/assignment-1/index.css": state.css,
                "assignments/22071A05E3/assignment-1/index.js": state.js,
              },
              commit:
                "submitted assignment 1",
              author: {
                name: "Uday",
                email: "vangarivighnesh@gmail.com",
                date: new Date().toISOString(),
              }
            },
          ],
        })
      toast.success('Assignment submitted successfully');
      console.log(pr)
    } catch (e) {
      toast.error('Error submitting assignment');
      console.log(e);
    } finally {
      toast.dismiss();
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className={`flex justify-between px-3 items-center ${assignmentId ? "p-1" : "p-3"}`}>
        <h1 className="text-primary-400 text-sm font-semibold">Preview</h1>
        {
          assignmentId && <button disabled={submitting} onClick={handleSubmit} className="text-primary-400 text-sm font-semibold disabled:opacity-50">Submit</button>
        }
        <h1 onClick={handleShow} className="text-primary-400 text-sm font-semibold"><RiFullscreenExitLine className="h-5 w-5" /></h1>
                {show && (
                 <div className="fixed z-40 inset-0 overflow-y-auto">
                    <div className="rounded-lg bg-primary-50">
                            <h1 className="h-[7vh] flex justify-end items-center bg-primary-900 text-primary-50">
                                <RxCross2 className="h-8 w-8 mr-2" onClick={handleClose}/>
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
        className="h-screen"
      />
      
    </div>
  );
};

export default PreviewPanel;


