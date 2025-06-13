"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"

interface ToolProps {
  name: string
  description: string
  index: number
}

function Tool({ name, description, index }: ToolProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background group relative flex flex-col items-center gap-4 rounded-lg border-2 p-6 shadow-md transition-all duration-300 hover:translate-y-1 hover:shadow-none sm:gap-6 xl:flex-row"
    >
      <div className="flex-1">
        <h3 className="mb-2 text-lg font-semibold transition-colors duration-200 sm:text-xl md:text-2xl">
          {name}
        </h3>
        <div className="text-sm font-extralight">{description}</div>
      </div>
    </motion.article>
  )
}

export function ToolList() {
  return (
    <section className="px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {siteConfig.toolNav.map((tool, index) => (
            <Link key={tool.name} href={tool.href}>
              <Tool key={tool.name} {...tool} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
