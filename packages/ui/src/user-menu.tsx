"use client";

import { PlusCircle, User } from "lucide-react";
import AuthButtons from "../../../apps/www/src/components/auth-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src="/ddubb.png" alt="User Avatar" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <AuthButtons />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <a href="/user/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </a>
        <a href="/admin/announcements">
          <DropdownMenuItem className="flex items-center gap-2">
            <PlusCircle className="size-4" />
            Make an Announcement
          </DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
