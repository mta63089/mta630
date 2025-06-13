// components/QrCodeViewer.tsx
"use client"

import { useState } from "react"
import Image from "next/image"

import { generateQRCode } from "@/lib/qr"
import { Button } from "@/components/ui/button"

export default function QrCodeViewer() {
  const [text, setText] = useState("")
  const [qrCode, setQrCode] = useState<string | null>(null)

  async function handleGenerate() {
    const img = await generateQRCode(text)
    setQrCode(img)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="text"
        className="rounded border px-2 py-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
      />
      <Button onClick={handleGenerate} variant="secondary">
        Generate QR Code
      </Button>
      {qrCode && <Image src={qrCode} alt="QR Code" width={100} height={100} />}
    </div>
  )
}
