import fs from "fs/promises"
import os from "os"
import path from "path"
import { transform } from "@svgr/core"
import potrace from "potrace"
import { optimize } from "svgo"

/**
 * Convert a PNG on disk to an optimized React SVG component.
 * @param inputPngPath - Path to the PNG file.
 * @returns { svg: string, tsx: string, name: string }
 */
export async function convertPngToComponent(buf: Buffer) {
  const trace = new potrace.Potrace()
  const tracedSvgPath = path.join(os.tmpdir(), `${Date.now()}-raw.svg`)

  trace.loadImage(buf, function (err) {
    if (err) throw err
  })
  const rawSvg = trace.getSVG()
  console.log("RAW SVG LINE 20 ----- \n", rawSvg)
  // 2. Optimize the SVG file with svgo
  const { data: optimizedSvg } = optimize(rawSvg, {
    multipass: true,
    plugins: [
      "preset-default",
      "removeDimensions",
      { name: "convertPathData", params: { floatPrecision: 2 } },
    ],
  })

  // 3. Generate a PascalCase React component name from the file name
  const filename = path.basename(inputPngPath, ".png")
  const pascal =
    filename
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\s+/g, "") + "Icon"

  // 4. Convert to a React component with svgr
  const tsx = await transform(
    optimizedSvg,
    {
      typescript: true,
      icon: true,
      prettier: false,
      svgProps: {
        className: "{cn('h-6 w-6', className)}",
        "aria-hidden": "true",
      },
    },
    { componentName: pascal }
  )

  // 5. Clean up temp SVG file
  await fs.unlink(tracedSvgPath)

  // 6. Return results
  return {
    svg: optimizedSvg,
    tsx,
    name: pascal,
  }
}
