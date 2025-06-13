"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { MenuVertical } from "./menu-vertical"
import { Menu as DropdownMenu } from "./ui/menu"

export function SiteHeader() {
  const bgColor = [
    "bg-chart-1 text-background hover:text-foreground",
    "bg-chart-2",
    "bg-chart-3 text-background hover:text-foreground",
    "bg-chart-4",
    "bg-chart-5",
    "bg-chart-1",
    "bg-chart-2",
    "bg-chart-3",
  ]

  return (
    <motion.header
      className={cn(
        "bg-secondary sticky top-5 right-0 left-0 z-50 flex w-full border px-2 shadow-2xl transition-all duration-300"
      )}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
                alt="mta630 logo"
                className="size-8 rounded-full shadow"
                width={100}
                height={100}
              />
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="ml-1 text-3xl font-black tracking-tight">
                  {`[mta630]`}
                </span>
              </Link>
            </div>
          </div>
          {/* HEADER FOR COMPUTER */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4">
              {siteConfig.nav.map((item, i) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <Button className={cn(bgColor[i])} variant="secondary">
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
                <Button variant="secondary" size="icon">
                  <Menu className="size-5" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-[300px]">
                <MenuVertical menuItems={siteConfig.nav} />
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
