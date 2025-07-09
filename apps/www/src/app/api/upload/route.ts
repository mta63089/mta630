// /app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const userId = formData.get("userId") as string

  if (!file || !userId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 })
  }

  const filename = `${crypto.randomUUID()}-${file.name}`
  const webdavUrl = `${process.env.NAS_WEBDAV_URL}/${filename}`
  const credentials = btoa(
    `${process.env.NAS_WEBDAV_USER}:${process.env.NAS_WEBDAV_PASS}`
  )

  const upload = await fetch(webdavUrl, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    body: file,
  })

  if (!upload.ok) {
    return NextResponse.json({ error: "Upload to NAS failed" }, { status: 500 })
  }

  const dbRecord = await prisma.file.create({
    data: {
      name: file.name,
      filename,
      path: `/${filename}`,
      url: webdavUrl,
      mimeType: file.type,
      extension: file.name.split(".").pop() ?? "",
      size: file.size,
      uploadedBy: userId,
    },
  })

  return NextResponse.json({ success: true, file: dbRecord })
}
