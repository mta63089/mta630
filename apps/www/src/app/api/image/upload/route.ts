// app/api/upload/route.ts
import { randomUUID } from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { Storage } from "@google-cloud/storage"

const storage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_KEY_PATH,
})
const bucketName = process.env.GOOGLE_CLOUD_BUCKET || ""
const bucket = storage.bucket(bucketName)

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const destFileName = `${randomUUID()}-${file.name}`
  const blob = bucket.file(destFileName)

  await blob.save(buffer, {
    metadata: {
      contentType: file.type,
    },
  })

  const publicUrl = `https://storage.googleapis.com/${bucketName}/${destFileName}`

  return NextResponse.json({ url: publicUrl })
}
