"use client"

import React, { useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { PenLine } from "lucide-react"
import { getCodeString } from "rehype-rewrite"
import katex from "katex"
import "katex/dist/katex.css"

export default function NewAssignmentPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const [assignmentName, setAssignmentName] = useState("")
  const [dueDate, setDueDate] = useState("")

  const initialContent = `# Assignment Instructions

Please provide detailed instructions for the assignment here.

## Requirements
- Requirement 1
- Requirement 2
- Requirement 3

## Submission Guidelines
1. Submit your work in the specified format
2. Include all necessary files
3. Submit before the due date`

  const [content, setContent] = useState(initialContent)

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/events/${slug}/assignment`, {
        assignmentName,
        dueDate,
        content
      })
      if (res.status === 200) {
        toast.success("Assignment Created")
        router.push(`/events/${slug}/assignments/${assignmentName}`)
      }
    } catch {
      toast.error("Error creating assignment. Please try again.")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="px-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <PenLine className="h-6 w-6" />
            Create New Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="assignmentName">Assignment Name</Label>
            <Input
              id="assignmentName"
              placeholder="e.g., Homework 1, Project 2"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <div data-color-mode="light" className="border rounded-md overflow-hidden">
              <MDEditor
                value={content}
                onChange={(newValue) => setContent(newValue || "")}
                height={400}
                preview="edit"
                previewOptions={{
                  components: {
                    code: ({ children = [], className, ...props }) => {
                      if (typeof children === "string" && /^\$\$(.*)\$\$/.test(children)) {
                        const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, "$1"), {
                          throwOnError: false,
                        })
                        return <code dangerouslySetInnerHTML={{ __html: html }} style={{ background: "transparent" }} />
                      }
                      const code = props.node && props.node.children ? getCodeString(props.node.children) : children
                      if (
                        typeof code === "string" &&
                        typeof className === "string" &&
                        /^language-katex/.test(className.toLocaleLowerCase())
                      ) {
                        const html = katex.renderToString(code, {
                          throwOnError: false,
                        })
                        return <code style={{ fontSize: "150%" }} dangerouslySetInnerHTML={{ __html: html }} />
                      }
                      return <code className={String(className)}>{children}</code>
                    },
                  },
                }}
              />
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Create Assignment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}