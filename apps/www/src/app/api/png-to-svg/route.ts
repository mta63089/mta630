import { NextRequest, NextResponse } from "next/server"

import { convertPngToComponent } from "@/lib/png-to-svg"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get("file") as File | null

  if (!file || file.type !== "image/png") {
    return NextResponse.json(
      { error: "Upload a single PNG file via the 'file' field." },
      { status: 400 }
    )
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const { svg, tsx, name } = await convertPngToComponent(buffer)
    return NextResponse.json({ svg, tsx, name })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: "Conversion failed: " + err.message },
      { status: 500 }
    )
  }
}
