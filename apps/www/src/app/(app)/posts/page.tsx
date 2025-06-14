import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc, format, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

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

export default function BlogOverviewPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>BLOG</PageTitle>
        <PageDescription>
          Guides, insights, and explorations on whatever
        </PageDescription>
      </PageHeader>
      <PageContent className="bg-gray-100">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </PageContent>
    </PageLayout>
  )
}
