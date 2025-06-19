"use client"

import { useCallback, useState } from "react"
import { UploadCloud } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "../ui/label"

const TAG_OPTIONS = ["Nature", "Urban", "People", "Abstract"]

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  )
  const [name, setName] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [description, setDescription] = useState("")

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
    form.append("tags", JSON.stringify(tags))
    form.append("description", description)

    const res = await fetch("/api/image/upload", { method: "POST", body: form })
    const { url } = await res.json()
    setUploadedImagePath(url)
  }, [selectedImage, name, tags, description])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
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

          <div className="grid gap-3">
            <Label htmlFor="description-1">Describe your image</Label>
            <Input
              id="description-1"
              placeholder="Optional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label>Select Tag</Label>
            <Select onValueChange={(value) => setTags([value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select Tag" />
              </SelectTrigger>
              <SelectContent>
                {TAG_OPTIONS.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ImageUpload
