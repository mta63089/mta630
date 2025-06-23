import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { Storage } from "@google-cloud/storage"

import { credentials } from "@/lib/gcloud"
import prisma from "@/lib/prisma"

const storage = new Storage({ credentials })
const bucketName = process.env.GOOGLE_CLOUD_BUCKET || ""
const bucket = storage.bucket(bucketName)

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME_TYPES = [
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/svg",
]

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const name = formData.get("name") as string | null

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Invalid or missing file." },
        { status: 400 }
      )
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 415 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large." }, { status: 413 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const filename = `${randomUUID()}-${file.name}`
    const blob = bucket.file(filename)

    await blob.save(buffer, { metadata: { contentType: file.type } })

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`

    const image = await prisma.image.create({
      data: {
        id: randomUUID(),
        name: name || null,
        filename,
        url: publicUrl,
      },
    })

    return NextResponse.json({ image })
  } catch (err) {
    console.error("Upload failed:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
