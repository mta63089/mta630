import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc, format, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"

function PostCard(post: Post) {
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
    <div className="prose mx-auto flex w-full flex-col py-2">
      <Text as="h2">{"[Blog]"}</Text>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
