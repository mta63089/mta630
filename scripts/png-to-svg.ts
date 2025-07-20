#!/usr/bin/env node
import { transform } from "@svgr/core";
import fs from "node:fs/promises";
import path from "node:path";
import { trace } from "potrace";
import sharp from "sharp";
import { optimize } from "svgo";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/* ---------- CLI ---------- */
const { _: files, outDir } = yargs(hideBin(process.argv))
  .usage("$0 <icons...> [--out-dir dist]")
  .option("out-dir", { alias: "o", default: "dist", type: "string" })
  .demandCommand(1).argv as { _: string[]; outDir: string };

/* ---------- Helpers ---------- */
const ensureDir = async (dir: string) => {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    /**/
  }
};

const pngToBuffer = async (file: string) =>
  sharp(file).trim().toFormat("png").toBuffer(); // auto‑crop bg

const bufferToSvg = (buf: Buffer) =>
  new Promise<string>((res, rej) =>
    trace(buf, { turdSize: 0, optTolerance: 0.4 }, (e, s) =>
      e ? rej(e) : res(s)
    )
  );

const optimizeSvg = (svg: string) =>
  optimize(svg, {
    multipass: true,
    plugins: [
      "removeDimensions",
      "convertStyleToAttrs",
      "mergePaths",
      { name: "convertPathData", params: { floatPrecision: 2 } },
    ],
  }).data;

const svgToReact = async (svg: string, compName: string) =>
  transform(
    svg,
    {
      icon: true,
      typescript: true,
      prettier: false,
      svgProps: { className: "{className}", "aria-hidden": "true" },
      template: (api, opts, { componentName, jsx }) => `
import { cn } from "@/lib/utils";

export function ${componentName}({ className }: { className?: string }) {
  return ${jsx.replace("<svg", `<svg className={cn("h-6 w-6", className)}`)};
}
`,
    },
    { componentName: compName }
  );

/* ---------- Main ---------- */
await ensureDir(outDir);

for (const file of files) {
  const base = path.parse(file).name.replace(/[^a-z0-9]/gi, "_");
  const Comp =
    base.replace(/(^\w|_\w)/g, (m) => m.replace("_", "").toUpperCase()) +
    "Icon";

  try {
    const pngBuf = await pngToBuffer(file);
    const rawSvg = await bufferToSvg(pngBuf);
    const cleanSvg = optimizeSvg(rawSvg);

    await fs.writeFile(path.join(outDir, `${base}.svg`), cleanSvg, "utf8");

    const reactCode = await svgToReact(cleanSvg, Comp);
    await fs.writeFile(path.join(outDir, `${Comp}.tsx`), reactCode, "utf8");

    console.log(`✔ ${file} → ${Comp}.tsx`);
  } catch (err) {
    console.error(`✖ ${file}:`, err);
  }
}
