"use client"

import React, { useCallback, useState } from "react"
import Image from "next/image"
import { CloudUpload } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { Input } from "@/components/ui/input"

const apiKey = process.env.NEXT_PUBLIC_API_KEY

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null
  )

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0]
      setSelectedImage(image)
      handleImageUpload(image)
    }
  }

  const removeSelectedImage = () => {
    setLoading(false)
    setUploadedImagePath(null)
    setSelectedImage(null)
  }

  const handleImageUpload = async (image: File) => {
    if (!image) return
    setLoading(true)
    const form = new FormData()
    form.append("file", image)

    const res = await fetch("/api/image/upload", {
      method: "POST",
      body: form,
    })

    const { url } = await res.json()
    setUploadedImagePath(url)
    setLoading(false)
    onUploadComplete?.(url)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const image = acceptedFiles[0]
      setSelectedImage(image)
      handleImageUpload(image)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true })

  return (
    <div className="h-full space-y-3">
      <div {...getRootProps()} className="h-full">
        <label
          htmlFor="dropzone-file"
          className="dark:hover:bg-bray-800 visually-hidden-focusable relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {loading && (
            <div className="max-w-md text-center">
              <p className="text-sm font-semibold">Uploading Picture</p>
              <p className="text-xs text-gray-400">
                Do not refresh or perform any other action while the picture is
                being uploaded
              </p>
            </div>
          )}

          {!loading && !uploadedImagePath && (
            <div className="text-center">
              <div className="mx-auto max-w-min rounded-md border p-2">
                <CloudUpload size="1.6em" />
              </div>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Drag an image</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400">
                Select a image or drag here to upload directly
              </p>
            </div>
          )}

          {uploadedImagePath && !loading && (
            <div
              onClick={removeSelectedImage}
              className="space-y-2 text-center"
            >
              <Image
                width={1000}
                height={1000}
                src={uploadedImagePath}
                className="max-h-16 w-full object-contain opacity-70"
                alt="uploaded image"
              />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Image Uploaded</p>
                <p className="text-xs text-gray-400">
                  Click here to upload another image
                </p>
              </div>
            </div>
          )}
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
          disabled={loading || uploadedImagePath !== null}
          onChange={handleImageChange}
        />
      </div>
    </div>
  )
}

export default ImageUpload
