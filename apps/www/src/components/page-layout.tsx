"use client"

import { HTMLMotionProps, motion } from "framer-motion"

import { cn } from "@/lib/utils"

function PageLayout({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className="flex w-full flex-col" {...props}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={cn("mb-4 flex min-h-svh flex-col p-2", className)}
      >
        {children}
      </motion.div>
    </section>
  )
}

function PageHeader({
  className,
  ...props
}: React.ComponentProps<"div"> & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className={cn("flex flex-col p-2 text-center", className)}
      {...props}
    />
  )
}

function PageTitle({
  className,
  ...props
}: React.ComponentProps<"div"> & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("text-6xl font-black tracking-tighter", className)}
      {...props}
    />
  )
}

function PageDescription({
  className,
  ...props
}: React.ComponentProps<"div"> & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "text-sm leading-snug font-extralight md:text-lg",
        className
      )}
      {...props}
    />
  )
}

function PageContent({
  className,
  ...props
}: React.ComponentProps<"div"> & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className={cn(
        "my-4 flex min-h-svh flex-col border-2 bg-gray-200 p-8 shadow-2xl",
        className
      )}
      {...props}
    />
  )
}

export { PageContent, PageDescription, PageHeader, PageLayout, PageTitle }
