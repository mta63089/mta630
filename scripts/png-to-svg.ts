import { vectorize } from "vectra";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

/**
 * Convert PNG/JPEG (Buffer or file path) to high-quality SVG using vectra.
 * @param input Buffer or string
 * @returns SVG string
 */
export async function pngToSvgHighQuality(
  input: Buffer | string,
  options: { width?: number; height?: number } = {}
): Promise<string> {
  let imageBuf: Buffer;
  if (typeof input === "string") {
    imageBuf = await fs.readFile(path.resolve(input));
  } else {
    imageBuf = input;
  }

  // Preprocess for optimal vectorization
  const processed = await sharp(imageBuf)
    .resize({ width: options.width ?? 1024, height: options.height ?? 1024, fit: "inside" })
    .png()
    .toBuffer();

  // vectra: directly from Buffer, returns SVG string
  const svg = await vectorize(processed, {
    color: true,   // keep colors (or false for b/w)
    numberofcolors: 16, // try 8-32 for logos, icons
    // ...other options
  });

  return svg;
}
