"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="bg-background text-foreground flex min-h-screen items-center justify-center">
      <div className="mx-auto h-max max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Something&apos;s missing.
          </p>
          <p className="text-muted-foreground mb-4 text-lg">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>

          <Button className="mt-4">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
