// app/api/upload/route.ts
import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { Storage } from "@google-cloud/storage"

import { db, images } from "@/lib/db"
import { credentials } from "@/lib/gcloud"

const storage = new Storage({ credentials })
const bucketName = process.env.GOOGLE_CLOUD_BUCKET || ""
const bucket = storage.bucket(bucketName)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const name = formData.get("name") as string
  const tags = formData.get("tags") as string
  const description = formData.get("description") as string | null

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const destFileName = `${randomUUID()}-${file.name}`
  const blob = bucket.file(destFileName)

  await blob.save(buffer, { metadata: { contentType: file.type } })
  const publicUrl = `https://storage.googleapis.com/${bucketName}/${destFileName}`

  await db.insert(images).values({
    id: randomUUID(),
    url: publicUrl,
    name,
    tags,
    description,
  })

  return NextResponse.json({ url: publicUrl })
}
