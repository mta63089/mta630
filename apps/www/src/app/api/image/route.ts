// app/api/images/route.ts
import { NextResponse } from "next/server"
import { Storage } from "@google-cloud/storage"

import { credentials } from "@/lib/gcloud"

const storage = new Storage({ credentials })
const bucketName = process.env.GOOGLE_CLOUD_BUCKET || ""
const bucket = storage.bucket(bucketName)

export async function GET() {
  try {
    const [files] = await bucket.getFiles()

    const urls = files.map((file) => ({
      name: file.name,
      url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
    }))

    return NextResponse.json({ images: urls })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    )
  }
}
