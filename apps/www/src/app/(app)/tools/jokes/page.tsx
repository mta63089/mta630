"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

const formSchema = z.object({
  category: z.string({
    required_error: "Must choose a category",
  }),
})

export default function JokesPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const [joke, setJoke] = useState({
    setup: "",
    delivery: "",
  })

  async function onSubmit(val: z.infer<typeof formSchema>) {
    try {
      const data = await fetch(`/api/jokes/${val.category}`, {
        cache: "no-store",
      })
      const joke = await data.json()
      setJoke({ setup: joke.data.setup, delivery: joke.data.delivery })
      form.reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Random Joke Generator</PageTitle>
        <PageDescription>Choose a category and get a joke!</PageDescription>
      </PageHeader>
      <PageContent>
        <div className="flex w-full flex-col gap-y-[2rem]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="misc">Misc</SelectItem>
                        <SelectItem value="christmas">Christmas</SelectItem>
                        <SelectItem value="pun">Pun</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="spooky">Spooky</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full flex-col">
                <Button size="lg" type="submit">
                  Generate Joke!
                </Button>
              </div>
            </form>
          </Form>
          {joke.setup && (
            <div className="py-8 text-xl font-medium text-green-500">
              {joke.setup}
            </div>
          )}
          {joke.delivery && (
            <div>
              <div className="bg-muted text-muted hover:text-foreground h-[4rem] w-full items-center p-2 text-center">
                {joke.delivery}
              </div>
              <div className="py-1 text-center text-sm">
                hover here for the answer
              </div>
            </div>
          )}
        </div>
      </PageContent>
    </PageLayout>
  )
}
