"use client"

import { useRef, useState } from "react"
import { Sparkles, UploadCloud } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function ColorizeIconForm() {
  const [colorSvg, setColorSvg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setLoading(true)
    setError(null)
    setColorSvg(null)

    // Optional: show fake progress for user feedback
    let prog = 0
    const progressInterval = setInterval(() => {
      prog = Math.min(95, prog + Math.random() * 8)
      setPercent(prog)
    }, 100)

    try {
      const form = new FormData()
      form.append("file", file)

      const res = await fetch("/api/colorize-icon", {
        method: "POST",
        body: form,
      })

      clearInterval(progressInterval)
      setPercent(100)

      if (!res.ok) {
        setError("API error: " + (await res.text()))
        setLoading(false)
        return
      }

      const svg = await res.text()
      setColorSvg(svg)
    } catch (err: any) {
      setError("Failed to colorize: " + err.message)
    }
    setLoading(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files.length) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  return (
    <Card className="bg-background mx-auto mt-12 max-w-xl rounded-2xl p-6 shadow-2xl">
      <CardContent>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            if (inputRef.current?.files?.[0]) {
              handleFileSelect(inputRef.current.files[0])
            }
          }}
        >
          <div
            className="hover:bg-muted flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 transition"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            tabIndex={0}
            role="button"
          >
            <UploadCloud size={40} className="mb-3 opacity-70" />
            <div className="text-muted-foreground mb-2">
              Drag & drop an outline icon (SVG/PNG) here, or&nbsp;
              <span className="underline">click to browse</span>
            </div>
            <Input
              type="file"
              ref={inputRef}
              accept="image/png,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileSelect(e.target.files[0])
              }}
            />
          </div>

          {loading && (
            <div className="flex items-center gap-2">
              <Progress value={percent} className="w-2/3" />
              <span className="text-muted-foreground text-xs">
                Colorizing your icon...
              </span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {colorSvg && (
            <div className="bg-muted mt-6 rounded-xl border p-5 text-center shadow-inner">
              <div className="flex flex-col items-center gap-2">
                <span className="text-primary mb-2 flex items-center gap-1 text-lg font-semibold">
                  <Sparkles className="inline-block" size={20} /> Colorized Icon
                </span>
                <div
                  className="inline-block"
                  style={{ minHeight: 120 }}
                  dangerouslySetInnerHTML={{ __html: colorSvg }}
                />
                <Button
                  size="sm"
                  className="mt-3"
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(colorSvg)
                  }}
                >
                  Copy SVG Code
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
