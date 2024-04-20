'use client'

import * as z from 'zod'
import {useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import React from 'react'

import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormField,
    FormItem
} from '@/components/ui/form'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { MdOutlineCreate } from "react-icons/md";


const formSchema = z.object({
    title: z.string().min(1,{
        message: 'Title is required'
    }),
    videoLink: z.string().min(1,{
        message: 'Link is required'
    }),
    videoType: z.string().min(1,{
        message: 'Type is required'
    }),
    class: z.string().min(1,{
        message: 'class is required'
    }),
    details: z.string(),
})

const NewCoursePage = () => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {   
            title: '',
            videoLink: '',
            videoType: '',   
            class: '',
            details: ''
        }
    })
    
    const {isSubmitting,isValid} = form.formState
    
    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        console.log(values)
        toast.success('Course Created')
    }
    

    return (
        <div className='  h-full w-full  flex md:justify-start p-10 '> 
            <div>
                <h1 className=' flex items-center text-xl'>Create a new Course!&nbsp;<MdOutlineCreate className='w-5 h-5 ' /></h1>
                <Form {...form}>
                    <form  action="" 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=' space-y-6 mt-7 w-full '
                    >
                    <div className='  flex-col items-center justify-between h-full sm:grid sm:grid-cols-4 sm:grid-rows-2 gap-10 '>
                        <div className='mt-5'>
                            <FormField
                                name='title'
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className ='  '>
                                        <FormLabel>Course Title</FormLabel>
                                        <FormControl>
                                            <Input className='text-sm'  disabled={isSubmitting} placeholder='eg., React Forms' {...field} />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                    </FormItem>
                                )}
                                />
                        </div>
                        <div className='mt-5 '>
                            <FormField
                                control={form.control}
                                name="videoType"
                                render={({ field }) => {
                                return (
                                    <FormItem >
                                    <FormLabel>Video type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className=' bg-secondary-700 '>
                                        <SelectItem className=' hover:bg-secondary-800' value="zoom">Zoom</SelectItem>
                                        <SelectItem className=' hover:bg-secondary-800' value="youtube">Youtube</SelectItem>
                                        <SelectItem className=' hover:bg-secondary-800' value="github">Github</SelectItem>
                                        <SelectItem className=' hover:bg-secondary-800' value="other">Other</SelectItem>
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
                                name='videoLink'
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className =' '>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input className='text-sm'  disabled={isSubmitting} placeholder='Paste Link here...' {...field} />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.videoLink?.message}</FormMessage>
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
                                    >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a class" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className=' bg-secondary-700 '>
                                        <SelectItem className=' hover:bg-secondary-800' value="class1">Class - 1</SelectItem>
                                        <SelectItem className=' hover:bg-secondary-800' value="class2">Class - 2</SelectItem>
                                        <SelectItem className=' hover:bg-secondary-800' value="class3">Class - 3</SelectItem>
                                        <SelectItem className=' hover:bg-secondary-800' value="class4">Class - 4</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                );
                                }}
                            />
                        </div>
                            <div className="grid w-full gap-1.5 col-span-4 mt-5">
                                <Label htmlFor="message">Add Details</Label>
                                <Textarea placeholder="Type details here..." id="message" />
                            </div>
                        </div>
                        <div className=' flex items-center gap-x-3'>
                            <Link href={'/'}>
                                <Button className='bg-red-700' variant={"destructive"} style={{backgroundColor:'#b91c1c'}} >
                                    Cancel
                                </Button>
                            </Link>
                            <Button type='submit' disabled={!isValid || isSubmitting} style={{border:'2px solid #6b7280'}} >
                                Continue   
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default NewCoursePage; 
