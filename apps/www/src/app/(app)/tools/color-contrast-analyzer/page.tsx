"use client"

import { useState } from "react"
import tinycolor from "tinycolor2"

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj",
]

export default function ColorContrastAnalyzer() {
  const [colors, setColors] = useState([{ fg: "#000000", bg: "#ffffff" }])

  const addPair = () => setColors([...colors, { fg: "#000000", bg: "#ffffff" }])

  const updateColor = (index: number, type: "fg" | "bg", value: string) => {
    const updated = [...colors]
    updated[index][type] = value
    setColors(updated)
  }

  const contrastRatio = (fg: string, bg: string) => {
    return tinycolor.readability(bg, fg).toFixed(2)
  }

  const passesWCAG = (ratio: number) => {
    return {
      AA: ratio >= 4.5,
      AAA: ratio >= 7,
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Color Contrast Analyzer</h1>

      {colors.map((pair, index) => {
        const ratio = Number(contrastRatio(pair.fg, pair.bg))
        const wcag = passesWCAG(ratio)

        return (
          <div key={index} className="space-y-2 rounded border bg-gray-50 p-4">
            <div className="flex items-center gap-4">
              <label className="flex flex-col">
                Text Color
                <input
                  type="color"
                  value={pair.fg}
                  onChange={(e) => updateColor(index, "fg", e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                Background Color
                <input
                  type="color"
                  value={pair.bg}
                  onChange={(e) => updateColor(index, "bg", e.target.value)}
                />
              </label>
              <div>
                <p>
                  <strong>Contrast:</strong> {ratio}
                </p>
                <p>WCAG AA: {wcag.AA ? "✅ Pass" : "❌ Fail"}</p>
                <p>WCAG AAA: {wcag.AAA ? "✅ Pass" : "❌ Fail"}</p>
              </div>
            </div>

            <div className="space-y-2">
              {sampleTexts.map((text, i) => (
                <p
                  key={i}
                  className="rounded px-3 py-2"
                  style={{
                    color: pair.fg,
                    backgroundColor: pair.bg,
                    border: "1px solid #ddd",
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        )
      })}

      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={addPair}
      >
        Add Color Pair
      </button>
    </div>
  )
}
