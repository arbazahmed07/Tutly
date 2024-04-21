"use client";
import { useContext, useState } from 'react';
import { Context } from './context';
import { RiFullscreenExitLine } from "react-icons/ri";
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Octokit } from "@octokit/core";
import { RxCross2 } from "react-icons/rx";
import { FaEye } from "react-icons/fa6";
import {
  createPullRequest,
  DELETE_FILE,
} from "octokit-plugin-create-pull-request";
import toast from 'react-hot-toast';
const MyOctokit = Octokit.plugin(createPullRequest);

const PreviewPanel = () => {
  const { state } = useContext(Context);
  const srcDoc = state.html + '<style>' + state.css + '</style>' + '<script>' + state.js + '</script>';
  const {data} = useSession();
  const username = data?.user.username;
  const name = data?.user.name;
  const email = data?.user.email;

  const params = useSearchParams();
  const assignmentId = params.get('userAssignmentId');
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }
  const handleSubmit = async () => {

    if(!username || !name || !email) {
      toast.error('Error submitting assignment');
      return;
    }

    const filePaths = [
      `assignments/${username}/assignment-${assignmentId}/index.html`,
      `assignments/${username}/assignment-${assignmentId}/index.css`,
      `assignments/${username}/assignment-${assignmentId}/index.js`,
    ];

    const files = {
      [filePaths[0]]: state.html,
      [filePaths[1]]: state.css,
      [filePaths[2]]: state.js,
    };
    try {
      setSubmitting(true);
      const octokit = new MyOctokit({
        auth: process.env.NEXT_PUBLIC_GITHUB_PAT,
      });
      toast.loading('Submitting assignment');
      const pr = await octokit
        .createPullRequest({
          owner: "WebWizards-Git",
          repo: "LMS-DATA",
          title: `Assignment submission by ${username}`,
          body: `
          # Assignment submission by ${username}

          ## Assignment Id: ${assignmentId}
          ## Submitted by: ${username}

          ### Changes:
          - index.html
          - index.css
          - index.js
          `,
          head: `${username}-assignment-${assignmentId}`,
          base: "main",
          update: true,
          forceFork: false,
          labels: [
            username,
            "assignment-submission",
            "html-css-js"
          ],
          changes: [
            {
              files,
              commit:
                `submitted assignment ${assignmentId} by ${username}`,
              author: {
                name: name,
                email: email,
                date: new Date().toISOString(),
              }
            },
          ],
        })
      toast.dismiss();
      toast.success('Assignment submitted successfully');
    } catch (e) {
      toast.error('Error submitting assignment');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className={`hidden md:flex justify-between px-3 items-center p-3`}>
        <h1 className="text-primary-400 text-sm font-semibold">Preview</h1>
        {
          assignmentId && <button disabled={submitting} onClick={handleSubmit} className="text-primary-400 text-sm font-semibold disabled:opacity-50">Submit</button>
        }
        <h1 onClick={handleShow} className="flex text-primary-400 text-sm font-semibold"><RiFullscreenExitLine className="h-5 w-5" /></h1>
        {show && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="rounded-lg bg-primary-50">
              <h1 className="h-[7vh] flex justify-end items-center bg-primary-900 text-primary-50">
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
      <h1 onClick={handleShow} className="px-1 md:hidden text-primary-400 text-sm font-semibold"><FaEye className="h-5 w-5" /></h1>
      {show &&
        <div className="md:hidden fixed z-50 inset-0 overflow-y-auto">
          <div className="rounded-lg bg-primary-50">
            <h1 className="h-[7vh] flex justify-end items-center bg-primary-900 text-primary-50">
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
      }
    </div>
  );
};

export default PreviewPanel;


