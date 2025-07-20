// components/icon-converter.tsx
"use client"

import * as React from "react"
import { Upload } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Result {
  svg: string
  tsx: string
}

export default function IconConverter() {
  const [file, setFile] = React.useState<File | null>(null)
  const [result, setResult] = React.useState<Result | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  /* ---- upload helpers --------------------------------------------------- */
  const handleFiles = (fl: FileList | null) => {
    const f = fl?.[0]
    if (!f) return
    setFile(f)
    setResult(null)
    convert(f)
  }

  const convert = async (f: File) => {
    setLoading(true)
    setProgress(25)

    const body = new FormData()
    body.append("file", f)

    try {
      const res = await fetch("/api/png-to-svg", { method: "POST", body })
      setProgress(75)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Conversion failed")
      setResult({ svg: data.svg, tsx: data.tsx })
      setProgress(100)
    } catch (err: any) {
      console.log("Error: ", err)
      toast("Oops! There was a problem converting!")
    } finally {
      setLoading(false)
    }
  }

  /* ---- UI --------------------------------------------------------------- */
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          PNG → SVG Converter
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* DRAG‑AND‑DROP AREA */}
        <div
          className="border-muted-foreground/40 text-muted-foreground hover:border-primary hover:text-primary flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleFiles(e.dataTransfer.files)
          }}
        >
          <Upload className="h-8 w-8" />
          <p className="mt-2 text-sm">
            Drag &amp; drop or click to select a PNG
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/png"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {loading && <Progress value={progress} />}

        {/* ORIGINAL PREVIEW */}
        {file && !loading && (
          <div className="space-y-2">
            <h3 className="font-semibold">Original image</h3>
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded icon"
              className="mx-auto h-32 object-contain"
            />
          </div>
        )}

        {/* CODE SNIPPETS */}
        {result && (
          <div className="space-y-4">
            <div>
              <h3 className="mb-1 font-semibold">Converted SVG</h3>
              <pre className="bg-muted overflow-x-auto rounded-md p-4 text-xs">
                <code>{result.svg}</code>
              </pre>
            </div>

            <div>
              <h3 className="mb-1 font-semibold">Ready‑made React component</h3>
              <pre className="bg-muted overflow-x-auto rounded-md p-4 text-xs">
                <code>{result.tsx}</code>
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
