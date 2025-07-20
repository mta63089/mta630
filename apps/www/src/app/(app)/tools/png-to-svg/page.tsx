import { MoveLeftIcon } from "lucide-react"

import IconConverter from "@/components/icon-converter"

export default function PNGtoSVGPage() {
  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div className="flex w-full flex-row">
        <div className="w-1/4">
          <MoveLeftIcon />
        </div>
        <div className="w-1/2">
          <h3>PNG to SVG Converter</h3>
        </div>
      </div>
      <div className="bg-teal mx-auto flex w-full justify-center p-4">
        <IconConverter />
      </div>
    </div>
  )
}
