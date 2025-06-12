"use client"

import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header
      className={cn(
        "bg-secondary sticky top-5 right-0 left-0 z-50 flex border px-2 shadow-2xl transition-all duration-300"
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
                <span className="font-display text-2xl font-semibold tracking-wider">
                  {siteConfig.name}
                </span>
              </Link>
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <Button variant="outline">{item.name}</Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* <div className="flex items-center gap-4">
            <ModeSwitcher />
          </div> */}
        </div>
      </div>
    </header>
  )
}
