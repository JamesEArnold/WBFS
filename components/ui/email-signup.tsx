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

// TODO: You can add .refine() to this to make an async call to pass more validations
// ie do we already have this email in the database?
// Example here: https://stackoverflow.com/questions/75148276/email-validation-with-zod
const formSchema = z.object({
  email: z.string().min(1, { message: "Please provide an email." }).email("Please provide a valid email address.")
})

export function EmailSignupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // TODO: We need to figure out how to properly collect emails.
    // I'm guessing some sort of service like MailChimp so that
    // we don't have to deal with storage and privacy laws.

    // TODO: We'll also have to implement the unsubscribe side of things to this
    console.log(values)
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
        <Button type="submit" className="p-8 text-lg font-bold uppercase bg-black rounded-md drop-shadow-md">Get Involved</Button>
      </form>
    </Form>
)};
