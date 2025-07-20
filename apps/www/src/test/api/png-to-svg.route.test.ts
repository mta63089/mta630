import { readFileSync } from "node:fs"
import { join } from "node:path"
import { NextResponse } from "next/server"
import File, { FormData } from "undici"
import { describe, expect, it } from "vitest"

import { POST } from "@/app/api/png-to-svg/route"

const fixture = readFileSync(join(__dirname, "fixtures/check.png"))

/* helper – create a Next‑compatible Request */
function makeReq(file: File) {
  const form = new FormData()
  form.append("file", file)
  return new Request("http://localhost/api/convert", {
    method: "POST",
    body: form as any,
  })
}

describe("PNG → SVG API", () => {
  it("returns component code for valid PNG", async () => {
    const file = new File([fixture], "check.png", { type: "image/png" })
    const res = (await POST(makeReq(file) as any)) as NextResponse
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.svg).toContain("<svg")
    expect(body.tsx).toContain("export function")
    expect(body.name).toBe("CheckIcon")
  })

  it("rejects non‑PNG uploads", async () => {
    const file = new File([fixture], "icon.jpg", { type: "image/jpeg" })
    const res = (await POST(makeReq(file) as any)) as NextResponse
    expect(res.status).toBe(400)
  })
})
