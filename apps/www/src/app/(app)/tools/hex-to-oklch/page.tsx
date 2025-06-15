"use client"

import { useState } from "react"
import { oklch, parseHex } from "culori"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

export default function HexToOklchConverterPage() {
  const [hexCode, setHexCode] = useState("")
  const [oklchCode, setOklch] = useState("")

  const handleConvert = () => {
    const parsed = parseHex(hexCode) // converts hex to RGB object
    if (!parsed) return null

    const converted = oklch(parsed) // converts RGB to OKLCH
    setOklch(`oklch(${converted.c} ${converted.h} ${converted.l})`)
  }

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Hex to oklch Color Converter</PageTitle>
        <PageDescription>
          Put a hex code in the input and get the oklch value!
        </PageDescription>
      </PageHeader>
      <Input
        placeholder="Put your hexcode here"
        onChange={(e) => setHexCode(e.target.value)}
      />
      <Button onClick={() => handleConvert()} className="my-4">
        Convert
      </Button>
      <Textarea disabled rows={1} className="resize-none" value={oklchCode} />
    </PageLayout>
  )
}
