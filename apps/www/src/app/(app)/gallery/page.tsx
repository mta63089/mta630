// app/gallery/page.tsx
"use client"

import { useEffect, useState } from "react"

import Gallery from "@/components/gallery"
import ImageUpload from "@/components/image-upload/image-upload"
import {
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

export default function GalleryPage() {
  const [images, setImages] = useState<{ name: string; url: string }[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/image")
      const data = await res.json()
      setImages(data.images || [])
    }

    fetchImages()
  }, [])

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

        <Gallery images={images}></Gallery>
      </PageLayout>
    </>
  )
}
