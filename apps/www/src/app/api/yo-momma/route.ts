import { NextResponse } from "next/server"
import jokes from "@/data/yo-momma.json"

export async function GET() {
  const randomIndex = Math.floor(Math.random() * jokes.length)
  const randomJoke = jokes[randomIndex]

  return NextResponse.json({ joke: randomJoke })
}
