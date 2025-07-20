"use client"

import React, { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import {
  Bot,
  ChevronDown,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import {
  FaArrowUp as ArrowUp,
  FaChevronLeft as ChevronLeft,
} from "react-icons/fa6"
import TimeAgo from "react-timeago"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessage {
  id: string
  role: "function" | "assistant" | "system" | "user" | "data" | "tool"
  content: string
  createdAt: Date
  isTyping?: boolean
}

interface ChatBotProps {
  fixed?: boolean
  open?: boolean
  initialMessage?: string
  title?: string
  description?: string
  descriptionIcon?: LucideIcon
  botIcon?: LucideIcon | string
  chatIcon?: LucideIcon | string
  placeholderText?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  width?: string
  height?: string
  showTimestamp?: boolean
  showAvatar?: boolean
  buttonRoundedCorners?: string
  animated?: boolean
  customStyles?: React.CSSProperties
  model?: string
  systemPrompt?: string
  onSendMessage?: (message: string) => void
  onReceiveMessage?: (message: string) => void
  onOpenChange?: (open: boolean) => void
}

const IconOrImage = ({
  icon: IconOrUrl,
  className = "",
  imgClassName = "",
}: {
  icon: LucideIcon | string
  className?: string
  imgClassName?: string
}) => {
  if (typeof IconOrUrl === "string") {
    return <img src={IconOrUrl} alt="Icon" className={imgClassName} />
  }
  const Icon = IconOrUrl
  return <Icon className={className} />
}

export default function ChatBot({
  fixed = true,
  open = false,
  initialMessage = "👋 Hey there! I'm an AI Chatbot.\n\nFeel free to ask me anything!",
  title = "AI Assistant",
  description = "by mta630",
  descriptionIcon: DescriptionIcon = Sparkles,
  botIcon: BotIcon = Bot,
  chatIcon: ChatIcon = MessageSquare,
  placeholderText = "Ask a question...",
  position = "bottom-right",
  width = "400px",
  height = "704px",
  showTimestamp = true,
  showAvatar = true,
  buttonRoundedCorners = "rounded-full",
  animated = true,
  customStyles = {},
  model,
  systemPrompt,
  onSendMessage,
  onReceiveMessage,
  onOpenChange,
}: ChatBotProps = {}) {
  const [isOpen, setIsOpen] = useState(open)
  const {
    messages: rawChatMessages,
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    isLoading,
  } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: initialMessage,
        createdAt: new Date(Date.now()),
      },
    ],
    keepLastMessageOnError: true,
    api: "/api/chat",
    body: {
      systemPrompt,
      model,
    },
  })

  const chatMessages = rawChatMessages.map((message) => ({
    ...message,
    createdAt: new Date(message.createdAt ?? Date.now()),
  }))

  const scrollRef = useRef<HTMLDivElement>(null)
  const prevMessagesLength = useRef(chatMessages.length)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [isScrolledTop, setIsScrolledTop] = useState(true)

  useEffect(() => {
    const newLength = chatMessages.length
    if (newLength > prevMessagesLength.current && scrollRef.current) {
      const scrollArea = scrollRef.current.closest(
        "[data-radix-scroll-area-viewport]"
      )
      if (scrollArea) {
        scrollArea.scrollTo({
          top: scrollArea.scrollHeight,
          behavior: "smooth",
        })
      }
      prevMessagesLength.current = newLength
    }
  }, [chatMessages.length])

  useEffect(() => {
    const scrollArea = scrollRef.current?.closest(
      "[data-radix-scroll-area-viewport]"
    )
    if (scrollArea) {
      setHasOverflow(scrollArea.scrollHeight > scrollArea.clientHeight)

      const handleScroll = () => {
        setIsScrolledTop(scrollArea.scrollTop === 0)
      }

      scrollArea.addEventListener("scroll", handleScroll)
      return () => scrollArea.removeEventListener("scroll", handleScroll)
    }
  }, [chatMessages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSendMessage) {
      onSendMessage(input)
    }

    await handleChatSubmit(e)
  }

  useEffect(() => {
    if (onReceiveMessage && chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1]
      if (lastMessage.role === "assistant") {
        onReceiveMessage(lastMessage.content)
      }
    }
  }, [chatMessages, onReceiveMessage])

  const positionClasses = {
    "bottom-right": {
      button: "bottom-4 right-4",
      chatbot: "bottom-12 right-4",
    },
    "bottom-left": {
      button: "bottom-4 left-4",
      chatbot: "bottom-12 left-4",
    },
    "top-right": {
      button: "top-4 right-4",
      chatbot: "top-20 right-4",
    },
    "top-left": {
      button: "top-4 left-4",
      chatbot: "top-20 left-4",
    },
  }

  const buttonPositionClass = fixed ? positionClasses[position].button : ""

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const TypingAnimation = () => (
    <div className="bg-border/60 max-w-auto mr-8 flex space-x-1 rounded-md p-4 whitespace-pre-wrap">
      <div className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
      <div className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
      <div className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full" />
    </div>
  )

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        fixed ? "fixed" : "flex flex-col items-center"
      } ${fixed ? buttonPositionClass : ""} z-50`}
      style={customStyles}
    >
      {!isOpen ? (
        <Button
          onClick={handleToggle}
          className={`${buttonRoundedCorners} bg-primary h-12 w-12 p-0 shadow-[0_0_30px_rgba(0,0,0,0.1)] ${
            animated ? "transition-all duration-300 hover:scale-110" : ""
          } ${!fixed ? buttonPositionClass : ""}`}
        >
          <IconOrImage
            icon={ChatIcon}
            className="text-primary-foreground fill-primary-foreground h-[22px] w-[22px]"
            imgClassName="h-[22px] w-[22px] object-contain"
          />
        </Button>
      ) : (
        <>
          <Card
            className={`border-none ${
              fixed ? "fixed mb-8" : "mb-4"
            } ${`max-h-[calc(100vh-6rem)] rounded-md`} flex flex-col overflow-hidden shadow-[0_0_45px_rgba(0,0,0,0.15)] ${
              animated ? "animate-in slide-in-from-bottom-2 duration-200" : ""
            }`}
            style={{
              ...(fixed
                ? {
                    width: width,
                  }
                : { maxWidth: width }),
              height: height,
            }}
          >
            <div
              className={`bg-background relative z-20 flex items-center p-4 ${
                hasOverflow && !isScrolledTop ? "border-b" : ""
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                className="z-20 mr-2"
              >
                <ChevronLeft className="h-12 w-12" />
              </Button>
              <div className="flex-1">
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                    isScrolledTop
                      ? "visible opacity-100 delay-200"
                      : "pointer-events-none invisible opacity-0 delay-0"
                  }`}
                >
                  <span className="font-semibold">chatbot</span>
                </div>
                <div
                  className={`flex items-center transition-all duration-200 ${
                    isScrolledTop
                      ? "pointer-events-none invisible opacity-0 delay-0"
                      : "visible opacity-100 delay-200"
                  }`}
                >
                  {showAvatar && (
                    <Avatar
                      className={`bg-border/60 flex h-8 w-8 items-center justify-center rounded-md`}
                    >
                      <IconOrImage
                        icon={BotIcon}
                        className="text-accent-foreground h-6 w-6"
                        imgClassName="h-6 w-6 object-contain"
                      />
                    </Avatar>
                  )}
                  <div className="ml-4 flex flex-col">
                    <h3 className="text-base leading-none font-semibold">
                      {title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                      <DescriptionIcon className="h-3 w-3" />
                      <span className="text-muted-foreground text-xs">
                        {description}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ScrollArea className="relative z-0 flex-1 overflow-hidden px-4">
              <div className="-pb-4 mt-4 -mb-8 flex flex-col justify-start space-y-4">
                <div className="mb-6 flex flex-col items-center justify-center">
                  <Avatar
                    className={`bg-border/60 flex h-20 w-20 items-center justify-center rounded-md`}
                  >
                    <IconOrImage
                      icon={BotIcon}
                      className="text-accent-foreground h-16 w-16"
                      imgClassName="h-16 w-16 object-contain"
                    />
                  </Avatar>
                  <p className="my-2 font-normal">AI Agent answers instantly</p>
                  <p className="text-muted-foreground font-light">
                    Ask for the team if needed
                  </p>
                </div>

                {chatMessages.map((message: ChatMessage, index) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      message.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`relative flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "items-end justify-start gap-3"
                      }`}
                    >
                      {showAvatar && message.role !== "user" && (
                        <Avatar
                          className={`bg-border/60 flex h-8 w-8 items-center justify-center rounded-md`}
                        >
                          <IconOrImage
                            icon={BotIcon}
                            className="text-accent-foreground h-6 w-6"
                            imgClassName="h-6 w-6 object-contain"
                          />
                        </Avatar>
                      )}

                      <div className="group relative">
                        <div
                          className={`max-w-auto rounded-md p-4 whitespace-pre-wrap ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground ml-8"
                              : "bg-border/70 font-inter text-md mr-8 font-light"
                          }`}
                        >
                          {message.content}
                        </div>

                        {showTimestamp && (
                          <Card
                            className={`absolute -top-10 left-0 ${
                              animated
                                ? "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                : ""
                            } p-2 text-xs`}
                          >
                            {(() => {
                              const date = message.createdAt
                              const now = new Date()
                              const isToday =
                                date.toDateString() === now.toDateString()
                              const isThisYear =
                                date.getFullYear() === now.getFullYear()

                              if (isToday) {
                                return date.toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                              } else if (isThisYear) {
                                return date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              } else {
                                return date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "2-digit",
                                })
                              }
                            })()}
                          </Card>
                        )}
                      </div>
                    </div>
                    {showTimestamp &&
                      index === chatMessages.length - 1 &&
                      message.role === "assistant" && (
                        <div className="text-muted-foreground mt-1 mb-4 ml-11 text-left text-xs">
                          Bot ·{" "}
                          <TimeAgo
                            date={message.createdAt}
                            formatter={(value, unit) => {
                              if (unit === "second" && value < 60) {
                                return "Just now"
                              }
                              return `${value} ${unit}${
                                value !== 1 ? "s" : ""
                              } ago`
                            }}
                          />
                          .
                        </div>
                      )}
                  </div>
                ))}
                <div ref={scrollRef} />
                {isLoading &&
                  (!chatMessages.length ||
                    chatMessages[chatMessages.length - 1].role !==
                      "assistant") && (
                    <div className="flex flex-col items-start">
                      <div className="flex items-start gap-3">
                        {showAvatar && (
                          <Avatar
                            className={`bg-border/60 flex h-8 w-8 items-center justify-center rounded-md`}
                          >
                            <IconOrImage
                              icon={BotIcon}
                              className="text-accent-foreground h-6 w-6"
                              imgClassName="h-6 w-6 object-contain"
                            />
                          </Avatar>
                        )}
                        <div className="group relative">
                          <TypingAnimation />
                        </div>
                      </div>
                      <div className="text-muted-foreground mt-1 mb-4 ml-11 text-left text-xs">
                        Bot · thinking...
                      </div>
                    </div>
                  )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="bg-background px-4 pb-4">
              <div className="relative flex w-full items-center rounded-full shadow-[0_0_10px_rgba(0,0,0,0.075)]">
                <Input
                  placeholder={placeholderText}
                  name="prompt"
                  value={input}
                  onChange={handleInputChange}
                  className="w-full rounded-full py-6 pr-14 text-base leading-normal"
                />
                <div className="absolute right-2 flex items-center">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                    className="bg-primary hover:bg-primary/90 h-9 w-9 rounded-full"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </Card>
          <Button
            onClick={handleToggle}
            className={`${buttonRoundedCorners} bg-primary h-12 w-12 p-0 shadow-lg ${
              animated ? "transition-all duration-300 hover:scale-110" : ""
            } ${!fixed ? buttonPositionClass : ""}`}
          >
            <ChevronDown
              style={{ width: "22px", height: "22px", fill: "currentColor" }}
              className={`text-primary-foreground ${
                animated
                  ? "animate-out -rotate-45 transition-transform duration-300 [animation-fill-mode:forwards]"
                  : ""
              }`}
            />
          </Button>
        </>
      )}
    </div>
  )
}
