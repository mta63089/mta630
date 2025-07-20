import { NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"

// Replace with your actual API key!
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export const runtime = "nodejs" // Ensure node runtime for buffer handling

export async function POST(req: NextRequest) {
  // 1. Get image file from form data
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  // 2. Read image buffer
  const arrayBuffer = await file.arrayBuffer()
  const imageBuffer = Buffer.from(arrayBuffer)

  // 3. (Optional) Upload to a temp location, or encode as base64 for OpenAI
  const imageBase64 = imageBuffer.toString("base64")

  // 4. Compose a colorization prompt (tune as needed)
  const prompt =
    "Colorize this outlined icon in a style suitable for modern web UI. Use visually appealing, harmonious colors. Only colorize the icon, do not change its shape."

  // 5. Use OpenAI's DALL·E API (image-to-image endpoint, if available)
  // If not available, fallback to GPT-4o Vision with prompt+base64 image context.

  // --- If DALL·E 3 Image-to-Image is available (not always public, may need Labs access):
  // const dalleRes = await openai.images.edit({
  //   image: fs.createReadStream("/tmp/original.png"),
  //   prompt,
  //   n: 1,
  //   size: "1024x1024"
  // });
  // const colorizedUrl = dalleRes.data[0].url;

  // --- For most users: Use GPT-4o Vision for "image understanding" and SVG generation

  const gptRes = await openai.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 4096,
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that colorizes outlined icons. Only output SVG code with harmonious colors, suitable for a web app.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: `data:image/png;base64,${imageBase64}`,
          },
        ],
      },
    ],
  })

  // Parse the SVG from the completion (strip markdown if present)
  let svg = gptRes.choices[0].message.content || ""
  svg = svg.replace(/```(svg)?/g, "").trim()

  // 6. Respond with SVG (or with an image URL if using DALL·E)
  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
