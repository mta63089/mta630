"use client"

import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="bg-accent/70 flex flex-col border-2 p-2 text-center shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-head text-6xl"
        >
          Page Header
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-2 text-lg font-light md:text-xl"
        >
          this is the subtext that explains the page
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-secondary/60 my-4 flex min-h-svh flex-col border-2 p-2 shadow-2xl"
      >
        content can go here
      </motion.div>
    </div>
  )
}
