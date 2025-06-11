// app/gallery/page.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { Card } from "@/components/ui/card"
import ImageUpload from "@/components/image-upload/image-upload"

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

  return (
    <div className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {images.map((img) => (
        <Card key={img.name}>
          <Card.Description className="break-inside-avoid self-center overflow-hidden p-0">
            <Image
              src={img.url}
              alt={img.name}
              className="h-auto max-h-full w-full max-w-full object-contain"
              width={0}
              height={0}
              sizes="100vw"
            />
          </Card.Description>
        </Card>
      ))}
      <ImageUpload />
    </div>
  )
}
