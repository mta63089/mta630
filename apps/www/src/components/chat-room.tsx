"use client"

import * as React from "react"
import {
  Bot,
  EllipsisVertical,
  HeadphonesIcon,
  ImageIcon,
  Paperclip,
  Send,
  Sparkles,
} from "lucide-react"

import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

interface ChatMessageProps extends React.ComponentProps<"div"> {
  avatar: React.ReactNode
  messageText: string
}

function ChatMessage({ avatar, messageText, ...props }: ChatMessageProps) {
  return (
    <div className="flex max-w-3xl items-start gap-3" {...props}>
      <div className="bg-foreground text-background border-2 p-2">{avatar}</div>
      <div className="border-2 border-black bg-white p-4 text-base">
        <p>{messageText}</p>
      </div>
    </div>
  )
}

function SelfMessage({ avatar, messageText, ...props }: ChatMessageProps) {
  return (
    <div className="flex w-full items-start justify-end gap-3" {...props}>
      <div className="border-2 border-black bg-sky-400 p-4 text-base">
        <p>{messageText}</p>
      </div>
      <div className="bg-secondary text-secondary-foreground border-2 p-2">
        {avatar}
      </div>
    </div>
  )
}

export function AnonymousChatRoom() {
  return (
    <div className="flex h-[600px] w-full flex-col overflow-y-auto border-4 border-black bg-white">
      <div className="bg-chart-2 border-b-4 p-4">
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
        <ChatMessage
          messageText={"This is the sample first message sent by another user"}
          avatar={<Bot className="size-5" />}
        />
        <ChatMessage
          messageText={"This is the sample Second message sent by another user"}
          avatar={<Bot className="size-5" />}
        />
        <SelfMessage
          messageText={"This is the sample First Message sent by yourself"}
          avatar={<HeadphonesIcon className="size-5" />}
        />
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
            <Button size="icon" variant="flat" className="bg-primary">
              <Send className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
