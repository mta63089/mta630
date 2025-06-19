"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, User2Icon } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { MenuVertical } from "./menu-vertical"
import { Menu as DropdownMenu } from "./ui/menu"

export function SiteHeader() {
  return (
    <motion.header
      className={cn(
        "bg-secondary top-5 right-0 left-0 z-50 flex w-full border-2 px-2 shadow-2xl transition-all duration-300"
      )}
    >
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hover:bg-primary bg-chart-4 ml-1 p-1 text-3xl font-black tracking-tight transition-colors">
              {`[mta630]`}
            </span>
          </Link>
        </div>
        {/* HEADER FOR COMPUTER */}
        <nav className="hidden md:block">
          <ul className="flex items-center justify-between">
            {siteConfig.nav.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <Button size="lg" className="shadow-none" variant="link">
                    {item.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* MOBILE NAV */}
        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="flat" size="icon">
                <Menu className="size-3" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-[300px]">
              <MenuVertical menuItems={siteConfig.nav} />
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <div className="flex">
          <Link href="/signup">
            <Button variant="flat" size="icon">
              <User2Icon className="size-6" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
