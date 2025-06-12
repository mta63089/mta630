import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup } from "@/components/ui/radio-group"

function ComponentCard(
  title: string,
  description: string,
  component: React.ReactNode
) {
  return (
    <Card className="p-4">
      <Card.Title>{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Content className="self-center">{component}</Card.Content>
    </Card>
  )
}

export default function HomePage() {
  return (
    <div className="flex">
      <div className="my-4 grid h-fit grid-cols-1 justify-center gap-4 p-4 md:grid-cols-2">
        {ComponentCard(
          "Buttons",
          "This is the primary button component",
          <div className="flex flex-col gap-4">
            <h1 className="py-4 text-2xl underline">Styles</h1>

            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button>Primary Button</Button>
          </div>
        )}
        {ComponentCard(
          "Radio",
          "Radio Components - Click to see difference in fill",
          <>
            <h1 className="py-4 text-2xl underline">Styles</h1>
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroup.Item value="default" variant="default" />
                <label htmlFor="default">Default Style</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroup.Item value="outline" variant="outline" />
                <label htmlFor="outline">Outline Style</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroup.Item value="solid" variant="solid" />
                <label htmlFor="solid">Solid Style</label>
              </div>
            </RadioGroup>
            <h1 className="py-4 text-2xl underline">Sizes</h1>
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroup.Item value="sm" size="sm" />
                <label htmlFor="sm" className="text-sm">
                  Small
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroup.Item value="md" size="md" />
                <label htmlFor="md">Medium</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroup.Item value="lg" size="lg" />
                <label htmlFor="lg" className="text-lg">
                  Large Size
                </label>
              </div>
            </RadioGroup>
          </>
        )}
      </div>
    </div>
  )
}
