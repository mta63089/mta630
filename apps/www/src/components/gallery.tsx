"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function Gallery({
  images,
}: {
  images: { name: string; url: string }[]
}) {
  return (
    <div className="bg-background container mx-auto px-4 py-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <GalleryItem key={index} image={image} />
        ))}
      </div>
    </div>
  )
}

function GalleryItem({ image }: { image: { name: string; url: string } }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image.url}
            alt={image.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <p className="text-sm font-medium text-white">{image.name}</p>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-background/95 max-w-3xl backdrop-blur-sm">
        <div className="relative aspect-square w-full">
          <Image
            src={image.url}
            alt={image.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <p className="text-primary mt-2 text-center text-sm">{image.name}</p>
      </DialogContent>
    </Dialog>
  )
}
