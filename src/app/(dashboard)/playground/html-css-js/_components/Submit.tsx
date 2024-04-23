"use client"

import { Octokit } from "@octokit/core";
import {
  createPullRequest,
  DELETE_FILE,
} from "octokit-plugin-create-pull-request";
import { useContext, useState } from "react";
import toast from 'react-hot-toast';
import { Context } from "./context";
const MyOctokit = Octokit.plugin(createPullRequest);

const Submit = ({
  user,
  assignmentDetails,
}: {
  user: any,
  assignmentDetails: any,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { state } = useContext(Context);


  const handleSubmit = async () => {

    if (!user || !user.username || !user.email || !assignmentDetails || !assignmentDetails.title) {
      toast.error('Error submitting assignment');
      return;
    }

    const filePaths = [
      `assignments/${user.username}/${assignmentDetails.title}/index.html`,
      `assignments/${user.username}/${assignmentDetails.title}/index.css`,
      `assignments/${user.username}/${assignmentDetails.title}/index.js`,
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
          title: `${assignmentDetails.title} submission by ${user.username}`,
          body: `
          # Assignment submission by ${user.username}

          ## User Details:
          - Name: ${user.name}
          - Email: ${user.email}
          - Username: ${user.username}

          ## Assignment Id: ${assignmentDetails.id}
          ## Submitted by: ${user.username}

          ## Submission Details:
          - Assignment Title: ${assignmentDetails.title}
          - Course: ${assignmentDetails.class.course.title}
          - Class: ${assignmentDetails.class.title}
          - Due Date: ${assignmentDetails.dueDate}
          - Submission Date: ${new Date().toISOString()}
          - Submission Files:
            - index.html
            - index.css
            - index.js
          `,
          head: `${user.username}`,
          base: "main",
          update: true,
          forceFork: false,
          labels: [
            user.username,
            "assignment-submission",
            assignmentDetails.class.course.title,
            assignmentDetails.title,
            
          ],
          changes: [
            {
              files,
              commit:
                `submitted assignment ${assignmentDetails.id} by ${user.username}`,
              author: {
                name: user.name,
                email: user.email,
                date: new Date().toISOString(),
              }
            },
          ],
        });
      toast.dismiss();
      toast.success('Assignment submitted successfully');
    } catch (e) {
      toast.error('Error submitting assignment');
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <button disabled={submitting} onClick={handleSubmit} className="text-primary-400 text-sm font-semibold disabled:opacity-50">Submit</button>
  )
}

export default Submit