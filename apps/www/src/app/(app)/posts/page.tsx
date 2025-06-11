import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc, format, parseISO } from "date-fns"
import { getMDXComponent } from "next-contentlayer2/hooks"

import { Button } from "@/components/ui/button"

function PostCard(post: Post) {
  const Content = getMDXComponent(post.body.code)

  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link href={post.url}>
          <Button variant="link" className="p-0">
            {post.title}
          </Button>
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
    </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Next.js Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
