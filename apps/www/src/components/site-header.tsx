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
    <motion.header className={cn("bg-chart-4 flex w-full border-b-2")}>
      <div className="mx-2 flex h-16 w-full items-center justify-between md:mx-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="hover:bg-primary ml-1 p-1 text-3xl font-black tracking-tight transition-colors">
              {`[mta630]`}
            </span>
          </Link>
        </div>
        {/* HEADER FOR COMPUTER */}
        <nav className="hidden md:block">
          <ul className="flex items-center justify-between gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <button className="cursor-pointer rounded-full p-2 text-2xl transition-all duration-300 ease-in-out hover:bg-slate-800/30">
                    {item.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* MOBILE NAV */}
        <div className="flex gap-4">
          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="flat" size="icon">
                  <Menu className="size-4" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-[250px]">
                <MenuVertical menuItems={siteConfig.nav} />
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
          <Link href="/signup">
            <Button variant="flat" size="icon">
              <User2Icon className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
