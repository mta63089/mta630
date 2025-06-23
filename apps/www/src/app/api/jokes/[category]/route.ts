import { NextResponse } from "next/server"

import { JokeCategory } from "@/types/jokes"

export async function GET(
  _request: Request,
  context: { params: { category: JokeCategory } }
) {
  try {
    const category: JokeCategory = context.params.category || "Any"

    const data = await fetch(
      `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart`,
      { cache: "no-store" }
    )

    const joke = await data.json()

    return NextResponse.json({
      message: "Fetched a joke successfully",
      status: 200,
      data: joke,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
