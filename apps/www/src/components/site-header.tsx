"use client";

import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeNavItem, setActiveNavItem] = React.useState("Dashboard");

  return (
    <header
      className={cn(
        "sticky left-0 right-0 top-0 z-50 bg-muted transition-all duration-300 shadow-2xl",
        isScrolled ? "shadow-md" : ""
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={"/logo.png"}
                alt="GuildForge Logo"
                className="size-8 shadow rounded-full"
                width={100}
                height={100}
              />
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="text-2xl font-bold">{siteConfig.name}</span>
              </Link>
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <Button
                      variant="outline"
                      onClick={() => setActiveNavItem(item.name)}
                    >
                      {item.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <ModeSwitcher />
            <DropdownMenu>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New message from Alice</DropdownMenuItem>
                <DropdownMenuItem>
                  Project &quot;X&quot; completed
                </DropdownMenuItem>
                <DropdownMenuItem>3 new team members joined</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="link" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
