"use client"

import * as React from "react"
import Image from "next/image"
import { Expand } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ImageData {
  id: string
  title: string
  thumbnail: string
  fullImage: string
}

const images: ImageData[] = [
  {
    id: "1",
    title: "Cosmic Wonders",
    thumbnail:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Deep Sea Mysteries",
    thumbnail:
      "https://images.unsplash.com/photo-1498574932731-e711f7092d07?w=800&h=800&fit=crop&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1498574932731-e711f7092d07?w=800&h=800&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Urban Rhythms",
    thumbnail:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=800&fit=crop&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=800&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Nature's Palette",
    thumbnail:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=800&fit=crop&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=800&fit=crop&q=80",
  },
  {
    id: "5",
    title: "Culinary Journey",
    thumbnail:
      "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&h=800&fit=crop&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&h=800&fit=crop&q=80",
  },
  {
    id: "6",
    title: "Architectural Marvels",
    thumbnail:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=800&fit=crop&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=800&fit=crop&q=80",
  },
  {
    id: "7",
    title: "Extreme Sports",
    thumbnail: "https://images.unsplash.com/photo-1522163182402-834f871fd851",
    fullImage: "https://images.unsplash.com/photo-1522163182402-834f871fd851",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = React.useState<ImageData | null>(
    null
  )

  const openImage = (image: ImageData) => {
    setSelectedImage(image)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className="container mx-auto p-4 py-8 md:py-16">
      <h1 className="mb-8 text-center text-4xl font-bold md:mb-16 md:text-4xl">
        Dual Color Heading With <br />
        <span className="text-primary">HoneyComb Hexagonal Image Gallery</span>
      </h1>
      <div className="honeycomb mx-auto flex max-w-5xl flex-col items-center">
        <div className="honeycomb-row flex flex-wrap justify-center gap-4 md:gap-8">
          {images.map((image, index) => (
            <HexagonalImage
              key={image.id}
              image={image}
              openImage={openImage}
              className={index >= 4 ? "mt-0 md:-mt-14 lg:-mt-16" : ""}
            />
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={closeImage}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="mt-2">
              <Image
                src={selectedImage.fullImage}
                alt={selectedImage.title}
                width={800}
                height={800}
                className="w-full rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function HexagonalImage({
  image,
  openImage,
  className,
}: {
  image: ImageData
  openImage: (image: ImageData) => void
  className?: string
}) {
  return (
    <div
      className={`hexagon-wrapper relative h-48 w-40 p-10 sm:h-56 sm:w-48 md:h-64 md:w-56 ${className}`}
    >
      <div
        className="hexagon bg-muted absolute inset-0 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={image.thumbnail}
            alt={image.title}
            layout="fill"
            objectFit="cover"
            className="opacity-90"
          />
        </div>
        <div className="hexagon-overlay bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-100">
          <h3 className="mb-2 px-2 text-center text-xs font-semibold text-white sm:text-sm">
            {image.title}
          </h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => openImage(image)}
          >
            <Expand className="mr-2 size-3 sm:h-4 sm:w-4" />
            Expand
          </Button>
        </div>
      </div>
    </div>
  )
}
