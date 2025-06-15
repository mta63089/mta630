"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function GalleryPage() {
  const [fact, setFact] = useState<string>("")

  const fetchFact = async () => {
    try {
      const res = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/random"
      )
      const data = await res.json()
      setFact(data.text)
    } catch (err) {
      console.error(err)
      setFact("Error in api call, please wait and try again")
    }
  }

  return (
    <div>
      <h1>Random Facts</h1>
      <Card className="bg-accent">
        <CardHeader>
          <CardTitle>Click the button to get a fact!</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{fact}</CardDescription>
          <Button onClick={() => fetchFact()}>Gimme a Fact!</Button>
        </CardContent>
      </Card>
    </div>
  )
}
