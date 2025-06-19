// app/gallery/page.tsx
"use client"

import { useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import ImageUpload from "@/components/image-upload/image-upload"
import { MasonryItem, MasonryRoot } from "@/components/masonry"
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

type ImageInfo = {
  name: string
  url: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageInfo[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/image")
      const data = await res.json()
      setImages(data.images || [])
    }

    fetchImages()
  }, [])

  const skeletonIds = Array.from(
    { length: 6 },
    () => `skeleton-${Math.random().toString(36).substring(2, 9)}`
  )

  return (
    <>
      <PageLayout>
        <PageHeader>
          <PageTitle>GALLERY</PageTitle>
          <PageDescription>
            A public gallery page where you can upload and download image! Built
            from the ground up using Google Cloud and a custom API
          </PageDescription>
        </PageHeader>

        <ImageUpload />
        <PageContent>
          <MasonryRoot
            className=""
            gap={12}
            fallback={
              <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {skeletonIds.map((id) => (
                  <div className="bg-card flex flex-col gap-2 rounded-md border p-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            }
          >
            {images.map((img) => (
              <MasonryItem className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                <div className="relative flex h-full w-full flex-1">
                  <img src={img.url} alt={img.name} className="h-full w-full" />
                </div>
              </MasonryItem>
            ))}
          </MasonryRoot>
        </PageContent>
      </PageLayout>
    </>
  )
}
