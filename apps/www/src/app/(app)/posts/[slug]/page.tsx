import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { format } from "date-fns"
import { getMDXComponent } from "next-contentlayer2/hooks"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { mdxComponents } from "@/components/mdx-components"

type Params = Promise<{ slug: string }>

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params

  const post = allPosts.find((post) => post._raw.flattenedPath === slug)

  if (!post) {
    return {
      title: `Post Not Found | mta630 blog`,
    }
  }

  return {
    title: `${post.title}`,
    description: post.description,
    openGraph: {
      description: post.description,
      type: "article",
      images: post.imageSrc,
      title: `${post.title} | mta630 blog`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            post.title
          )}&description=${encodeURIComponent(post.description)}`,
        },
      ],
    },
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params

  const post = allPosts.find((post) => post._raw.flattenedPath === slug)

  if (!post) {
    return (
      <article className="mx-auto max-w-xl py-8">
        <div className="mb-8 text-center">
          <h1>Post not found</h1>
        </div>
      </article>
    )
  }

  const Content = getMDXComponent(post.body.code)

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <div className="mb-6 border-b border-black pb-6">
        <div className="mb-6 flex items-center gap-4">
          <Text className="text-muted-foreground text-sm font-medium">
            {format(new Date(post.date), "MMMM dd, yyyy")}
          </Text>
          <Text>|</Text>
          <div className="flex items-center gap-3">
            {post.tags.map((tag) => (
              <Badge key={tag} size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Text as="h1" className="mb-2">
          {post.title}
        </Text>
        <p className="text-muted-foreground mb-8 text-lg">{post.description}</p>
        <Image
          src={post.imageSrc}
          alt={post.title}
          width={1200}
          height={800}
          className="mb-8"
        />
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name}</AvatarFallback>
            </Avatar>
            <div>
              <Text as="h5">{post.author.name}</Text>
              {post.author.linkedin && (
                <Link
                  href={`https://www.linkedin.com/in/${post.author.linkedin}`}
                  target="_blank"
                  className="text-muted-foreground"
                >
                  @{post.author.linkedin}
                </Link>
              )}
              {post.author.x && (
                <Link
                  href={`https://x.com/@${post.author.x}`}
                  target="_blank"
                  className="text-muted-foreground"
                >
                  @{post.author.x}
                </Link>
              )}
            </div>
          </div>

          <Link
            target="_blank"
            href={`https://x.com/share?url=${
              "https://mta630.com/" + post.url
            }&text=${post.title}.%0AJust found some fire at mta630.com 👉`}
          >
            <Button size="sm" variant="outline">
              Share on X
            </Button>
          </Link>
        </div>
      </div>
      <Content components={mdxComponents} />
    </div>
  )
}
