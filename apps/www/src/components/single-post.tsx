"use client"

import Image from "next/image"
import Link from "next/link"
import { Post } from "contentlayer/generated"
import { format } from "date-fns"
import { CalendarDays } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SinglePost(post: Post) {
  return (
    <div className="container flex justify-center">
      <Card className="w-full max-w-md overflow-hidden">
        <div className="relative h-64">
          <Image
            src={post.imageSrc}
            alt="Blog post cover image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          <div className="absolute right-4 bottom-4 left-4 space-y-2">
            <div className="flex flex-wrap gap-1">
              <Badge variant="surface" size="sm">
                {post.tags[0]}
              </Badge>
              {post.tags[1] && (
                <Badge variant="surface" size="sm">
                  {post.tags[1]}
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{post.title}</h2>
          </div>
        </div>
        <CardContent className="bg-card p-4">
          <p className="text-card-foreground mb-4 text-sm">
            {post.description}
          </p>
        </CardContent>
        <div className="bg-chart-3 flex h-fit items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={post.author.avatar}
                alt={`${post.author.name} avatar`}
              />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
              <div className="text-muted-foreground flex items-center text-xs">
                <CalendarDays className="mr-1 size-3" />
                <time dateTime={post.date}>
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </time>
              </div>
            </div>
          </div>
          <Button className="bg-accent" variant="outline">
            <Link href={post.url}>Read More</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
