"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios";
import { toast } from "react-toastify";
import { startTransition, useState } from "react"
import PulseLoader from "react-spinners/PulseLoader";

// TODO: You can add .refine() to this to make an async call to pass more validations
// ie do we already have this email in the database?
// Example here: https://stackoverflow.com/questions/75148276/email-validation-with-zod
const formSchema = z.object({
  email: z.string().email().min(1, { message: "Please provide an email." }).email("Please provide a valid email address.")
})

export function EmailSignupForm() {
  const [emailSubmit, setEmailSubmit] = useState<'initial' | 'pending' | 'complete'>('initial');
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => setEmailSubmit('pending'));
    axios
    .put("/mailingList", {
      mail: values.email,
    })
    .then((result) => {
      if (result.status === 200) {
        toast(result.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          setEmailSubmit('complete');
          form.setValue('email', 'Thank you for your support!');
      }
    })
    .catch((err) => {
      console.log(err);
      setEmailSubmit('pending');
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email address" {...field} className="w-3/4 m-auto mt-6 rounded-md h-10px drop-shadow-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-56 max-w-[224px] p-8 text-lg font-bold uppercase bg-black rounded-md drop-shadow-md">
          { emailSubmit === 'initial' && 'Get Involved' }
          { emailSubmit === 'pending' && 
            <PulseLoader
              color={'#facc15'}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
          { emailSubmit === 'complete' && 
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0,0,256,256"
              width="50px"
              height="50px">
                <g 
                  fill="#facc15"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  ><g transform="scale(5.12,5.12)"><path d="M25,2c-12.683,0 -23,10.317 -23,23c0,12.683 10.317,23 23,23c12.683,0 23,-10.317 23,-23c0,-4.56 -1.33972,-8.81067 -3.63672,-12.38867l-1.36914,1.61719c1.895,3.154 3.00586,6.83148 3.00586,10.77148c0,11.579 -9.421,21 -21,21c-11.579,0 -21,-9.421 -21,-21c0,-11.579 9.421,-21 21,-21c5.443,0 10.39391,2.09977 14.12891,5.50977l1.30859,-1.54492c-4.085,-3.705 -9.5025,-5.96484 -15.4375,-5.96484zM43.23633,7.75391l-19.32227,22.80078l-8.13281,-7.58594l-1.36328,1.46289l9.66602,9.01563l20.67969,-24.40039z"></path></g></g></svg>
          }
        </Button>
      </form>
    </Form>
)};
