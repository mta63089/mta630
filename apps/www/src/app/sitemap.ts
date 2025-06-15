import type { MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.mta630.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...allPosts.map((post) => ({
      url: `https://www.mta630.com${post.url}`,
      lastModified: post.date,
    })),
  ]
}
