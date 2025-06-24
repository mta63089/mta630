"use client"

import { useCallback, useState } from "react"
import { Upload, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Label } from "../ui/label"

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [name, setName] = useState("")

  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = document.createElement("img")
      const reader = new FileReader()

      reader.onload = (e) => {
        if (!e.target?.result) return
        img.src = e.target.result as string
      }

      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            const webpFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".webp"),
              { type: "image/webp" }
            )
            resolve(webpFile)
          }
        }, "image/webp")
      }

      reader.readAsDataURL(file)
    })
  }

  const handleUpload = useCallback(async () => {
    if (!selectedImage) return
    const webp = await convertToWebP(selectedImage)

    const form = new FormData()
    form.append("file", webp)
    form.append("name", name)

    await fetch("/api/image/upload", { method: "POST", body: form })
    // TODO: STORE IMAGE PATH IN DB const { url } = await res.json()
  }, [selectedImage, name])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit self-center shadow-none">
          <UploadCloud size={16} className="mr-2" /> Upload an Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleUpload()
          }}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Upload an Image</DialogTitle>
            <DialogDescription>
              Upload and categorize your image!
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="image-1">Choose your image</Label>
            <Input
              id="image-1"
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && setSelectedImage(e.target.files[0])
              }
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="name-1">Name your image</Label>
            <Input
              id="name-1"
              placeholder="Image Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              <Upload />
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ImageUpload
