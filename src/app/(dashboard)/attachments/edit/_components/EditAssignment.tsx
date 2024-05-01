'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormField,
    FormItem,
} from '@/components/ui/form'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {  useRouter } from 'next/navigation'


const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    link: z.string().optional(),
    attachmentType: z.string().min(1, {
        message: 'Type is required'
    }),
    class: z.string().min(1, {
        message: 'class is required'
    }),
    courseId: z.string().optional(),
    details: z.string().optional(),
    dueDate: z.string().optional(),
    maxSubmissions :  z.number().transform((v) => Number(v)||1).optional() 
})

const EditAttachmentPage = ({attachment }:any) => {
    const { title, link, attachmentType,  classId, courseId, details, dueDate, maxSubmissions } = attachment;

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/classes/getClassesById/${courseId}`)
            setClasses(response.data)
            setLoading(false)   
        }
        fetchData()
        
    }, [courseId])


    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title || '',
            link: link || '',
            attachmentType: attachmentType || '',
            class: classId || '',
            courseId: courseId || '',
            details:  details || '',
            dueDate:    dueDate || '',
            maxSubmissions:  maxSubmissions || 1
        }
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const response = await axios.put(`/api/attachments/edit/${attachment.id}`, {
            title: values.title,
            classId: values.class,
            link: values.link,
            attachmentType: values.attachmentType,
            details: values.details,
            dueDate: values?.dueDate!="" ? new Date(values.dueDate).toISOString() : undefined,
            maxSubmissions: values?.maxSubmissions,
            courseId : courseId as string
        })

        if (response.status !== 200) {
            toast.error('An error occurred')
            return
        }
        toast.success('attachment created')
        router.push(`/assignments/${attachment.id}`)
    }

    const deleteAssignment = async () => {
        try
        {
            const response = await axios.delete(`/api/attachments/delete/${attachment.id}`)
            if (response.status !== 200) {
                toast.error('An error occurred')
                return
            }
            toast.success('attachment deleted')
            router.push(`/courses/${courseId}/class/${classId}`)
        }
        catch (e:any)
        {
            toast.error('An error occurred')
            console.log(e);
            router.push(`/courses/${courseId}/class/${classId}`)
            return
        }
    }


    return (
        <div className='h-full w-full  md:flex md:justify-start p-4 md:p-10'>
            <div>
                <h1 className=' flex items-center md:text-xl'>Edit attachment!<FaRegEdit className='w-5 h-5 ml-4' /></h1>
                <Form {...form}>
                    <form action=""
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=' space-y-6 mt-7 w-full '
                    >
                        <div className='  flex-col items-center h-full sm:grid sm:grid-cols-5 gap-10 '>
                            <div className='mt-5'>
                                <FormField
                                    name='title'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='  '>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input className='text-sm' disabled={isSubmitting} placeholder='eg., React Forms' {...field} />
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-5 '>
                                <FormField
                                    control={form.control}
                                    name="attachmentType"
                                    render={({ field }) => {
                                        return (
                                            <FormItem >
                                                <FormLabel>Attachment type</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a type"  />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className=' bg-secondary-700 text-white'>
                                                        <SelectItem className=' hover:bg-secondary-800' defaultChecked value="ASSIGNMENT">Assignment</SelectItem>
                                                        <SelectItem className=' hover:bg-secondary-800' value="ZOOM">Zoom</SelectItem>
                                                        <SelectItem className=' hover:bg-secondary-800' value="GITHUB">Github</SelectItem>
                                                        <SelectItem className=' hover:bg-secondary-800' value="OTHERS">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                            <div className='mt-5'>
                                <FormField
                                    name='maxSubmissions'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='  '>
                                            <FormLabel>Max Submissions</FormLabel>
                                            <FormControl>
                                                <Input type='number' className='text-sm' disabled={isSubmitting} placeholder='eg., max Submissions...' {...field} />
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.maxSubmissions?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-5' >
                                <FormField
                                    name='dueDate'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className=' '>
                                            <FormLabel>Due Date <span className=' text-sm opacity-80'>(optional)</span> </FormLabel>
                                            <FormControl>
                                                <Input className='text-sm' disabled={isSubmitting} type='date' {...field} />
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.dueDate?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-5'>
                                <FormField
                                    control={form.control}
                                    name="class"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Assign a class</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                    disabled={loading}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a class" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className=' bg-secondary-700 text-white' >
                                                        {classes.map((c:any) => (
                                                            <SelectItem
                                                                key={c.id}
                                                                value={c.id}
                                                                className=' hover:bg-secondary-800'
                                                                defaultChecked={c.id === classId as string}
                                                            >
                                                                {c.title}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                            <div className='mt-5'>
                                <FormField
                                    name='link'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className=' '>
                                            <FormLabel>Link</FormLabel>
                                            <FormControl>
                                                <Input className='text-sm' disabled={isSubmitting} placeholder='Paste Link here...' {...field} />
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.link?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className=' col-span-5' >
                                <FormField
                                    name='details'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className=' '>
                                            <FormLabel>Details</FormLabel>
                                            <FormControl>
                                                <Textarea className='text-sm' disabled={isSubmitting} placeholder='Write some details here...' {...field} />
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.details?.message}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        <div className=' flex items-center gap-x-3 text-white'>
                            <Link href={'/'}>
                                <Button className='bg-red-700' variant={"destructive"}   >
                                    Cancel
                                </Button>
                            </Link>
                            <Button type='submit' className=' bg-secondary-500 hover:bg-secondary-600' disabled={isSubmitting}  >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <Button onClick={deleteAssignment} className='bg-red-700 hover:bg-red-800' variant={"destructive"}   >
                <MdDelete className=' w-5 h-5' />
            </Button>
        </div>
    )
}

export default EditAttachmentPage; 