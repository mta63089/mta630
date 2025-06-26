import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import BlogList from "@/components/blog-list"
import {
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

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
      <div className="mx-auto">
        <BlogList posts={posts} />
      </div>
    </PageLayout>
  )
}
