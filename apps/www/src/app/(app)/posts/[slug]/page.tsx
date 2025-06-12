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
  return { title: post?.title ?? "Post not found" }
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
