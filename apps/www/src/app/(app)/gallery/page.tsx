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
    <div className="grid-col-3 grid items-center justify-center gap-4 md:grid-cols-5">
      {images.map((img) => (
        <Card>
          <Card.Header>
            <Card.Description className="self-center">
              <Image src={img.url} alt={img.name} width={100} height={100} />
            </Card.Description>
          </Card.Header>
        </Card>
      ))}
      <ImageUpload />
    </div>
  )
}
