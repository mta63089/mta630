import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { format, parseISO } from "date-fns"
import { getMDXComponent } from "next-contentlayer2/hooks"

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
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1>{post.title}</h1>
      </div>
      <Content components={mdxComponents} />
    </article>
  )
}
