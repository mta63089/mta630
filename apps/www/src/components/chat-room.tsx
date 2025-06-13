"use client"

import {
  Bot,
  EllipsisVertical,
  ImageIcon,
  Paperclip,
  Send,
  Sparkles,
} from "lucide-react"

import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

export function AnonymousChatRoom() {
  return (
    <div className="flex h-[400px] w-full flex-col overflow-y-auto border-4 border-black bg-white">
      <div className="bg-secondary border-b-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-medium">Chat Room</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="flat" className="bg-background">
              <Sparkles className="size-5" />
            </Button>
            <Button size="icon" variant="flat" className="bg-background">
              <EllipsisVertical className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto bg-gray-50 p-4">
        <div className="flex max-w-3xl items-start gap-3">
          <div className="bg-foreground text-background border-2 p-2">
            <Bot className="size-5" />
          </div>
          <div className="border-2 border-black bg-white p-4 text-base">
            <p>Here is some sample text that could be sent in chat</p>
          </div>
        </div>
      </div>
      <div className="border-t-4 bg-gray-100 p-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Textarea
              rows={4}
              className="resize-none border-2 px-4 py-2 shadow-md transition focus:shadow-none focus:ring-0 focus:outline-hidden"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button size="icon" variant="flat" className="bg-chart-2">
                <Paperclip className="size-5" />
              </Button>
              <Button size="icon" variant="flat" className="bg-chart-3">
                <ImageIcon className="size-5" />
              </Button>
            </div>
            <Button size="icon" variant="flat" className="bg-green-500">
              <Send className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
