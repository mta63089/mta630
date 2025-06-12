"use client"

import React, { ComponentPropsWithoutRef } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

const Menu = DropdownMenu.Root
const Trigger = DropdownMenu.Trigger

const Content = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DropdownMenu.Content>) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      side="bottom"
      align="start"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 top-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) border-2 bg-white shadow-md",
        className
      )}
      {...props}
    />
  </DropdownMenu.Portal>
)

const MenuItem = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenu.Item
    ref={ref}
    className={cn(
      "hover:bg-primary focus:bg-primary relative flex cursor-default items-center px-2 py-1.5 text-sm text-black outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  />
))
MenuItem.displayName = "MenuItem"

const MenuComponent = Object.assign(Menu, {
  Trigger,
  Content,
  Item: MenuItem,
})

export { MenuComponent as Menu }
