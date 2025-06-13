"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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
        <Card.Header>
          <Card.Title>Click the button to get a fact!</Card.Title>
        </Card.Header>
        <Card.Content>
          <Card.Description>{fact}</Card.Description>
          <Button onClick={() => fetchFact()}>Gimme a Fact!</Button>
        </Card.Content>
      </Card>
    </div>
  )
}
