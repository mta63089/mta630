import { useCallback, useState } from "react"
import Image from "next/image"
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

const TAG_OPTIONS = ["Nature", "Urban", "People", "Abstract"]

const ImageUpload = () => {
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
    <Dialog open={selectedImage !== null}>
      <form>
        <DialogTrigger asChild>
          <Button>
            <UploadCloud size={5} /> Upload an Image
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Upload an Image</DialogTitle>
            <DialogDescription>
              Upload and categorize your image!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && setSelectedImage(e.target.files[0])
              }
            />
            <Input
              placeholder="Image Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Optional Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

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

            {uploadedImagePath && (
              <Image
                src={uploadedImagePath}
                alt="uploaded"
                width={200}
                height={200}
                className="mt-4 rounded"
              />
            )}
          </div>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpload} type="submit">
            Upload
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ImageUpload
