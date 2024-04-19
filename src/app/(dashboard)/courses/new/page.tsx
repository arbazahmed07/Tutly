'use client'

import * as z from 'zod'
import axios from 'axios'
import { useRouter } from 'next/router'
import {useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'


import {
    Form,
    FormControl,
    FormLabel,
    FormDescription,
    FormMessage,
    FormField
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
    
    const onSubmit = (values : z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div className=' max-w-5xl h-full mx-auto flex md:justify-center md:items-center p-6'> 
            <div>
                <h1 className=' text-xl'>Name your Course</h1>
                <p className=' text-xs text-gray-400'>Description about the course</p>
                <Form {...form}>
                    <form  action="" 
                    
                    />

                </Form>
            </div>
        </div>
    )
}

export default newCoursePage; 
