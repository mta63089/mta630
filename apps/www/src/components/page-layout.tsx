"use client"

import { HTMLMotionProps, motion } from "framer-motion"

function PageLayout({ children, ...props }: React.ComponentProps<"section">) {
  return (
    <section className="flex w-full flex-col" {...props}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mb-4 flex min-h-svh flex-col p-2"
      >
        {children}
      </motion.div>
    </section>
  )
}

function PageHeader({ ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="bg-accent/70 flex flex-col border-2 p-2 text-center shadow-2xl"
      {...props}
    />
  )
}

function PageTitle({ ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-head text-6xl"
      {...props}
    />
  )
}

function PageDescription({ ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="p-2 text-lg font-light md:text-xl"
      {...props}
    />
  )
}

function PageContent({ ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="bg-secondary/60 my-4 flex min-h-svh flex-col border-2 p-2 shadow-2xl"
      {...props}
    />
  )
}

export { PageContent, PageDescription, PageHeader, PageLayout, PageTitle }
