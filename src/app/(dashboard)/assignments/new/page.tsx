'use client'

import * as z from 'zod'
import axios from 'axios'
import { useRouter } from 'next/router'
import {useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import react from 'react'

import {
    Form,
    FormControl,
    FormLabel,
    FormDescription,
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



const formSchema = z.object({
    title: z.string().min(1,{
        message: 'Title is required'
    }),
})

const newCoursePage = () => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {   
            title: ''
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
                <h1 className=' text-xl'>Name your Course</h1>
                <p className=' text-xs text-gray-400'>Description about the course</p>
                <Form {...form}>
                    <form  action="" 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=' space-y-6 mt-7'
                    >
                    <div className=' grid gap-y-4'>
                        <div>
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
                        <div>
                            <Select classname="">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="youtube">Youtube</SelectItem>
                                        <SelectItem value="zoom">Zoom</SelectItem>
                                        <SelectItem value="github">Github</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <FormField
                                name='link'
                                control={form.control}
                                render={({field}) => (
                                    <FormItem className =' '>
                                        <FormControl>
                                            <Input className='text-sm'  disabled={isSubmitting} placeholder='Paste Link here...' {...field} />
                                        </FormControl>
                                        <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                    </FormItem>
                                )}
                                />
                        </div>
                        <div>
                            <Select classname="">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="class1">Class - 1</SelectItem>
                                        <SelectItem value="class2">Class - 2</SelectItem>
                                        <SelectItem value="class3">Class - 3</SelectItem>
                                        <SelectItem value="class4">Class - 4</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Add Details</Label>
                            <Textarea placeholder="Type details here..." id="message" />
                        </div>
                        </div>
                        <div className=' flex items-center gap-x-3'>
                            <Link href={'/'}>
                                <Button variant={"destructive"} >
                                    Cancel
                                </Button>
                            </Link>
                            <Button type='submit' disabled={!isValid || isSubmitting} >
                                Continue   
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default newCoursePage; 
