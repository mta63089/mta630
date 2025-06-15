import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import {
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"
import { SinglePost } from "@/components/single-post"

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
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <SinglePost key={post._id} {...post} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
