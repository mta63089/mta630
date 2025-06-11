import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageUpload from "@/components/image-upload/image-upload"

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
    <div className="my-4 grid grid-cols-3 justify-center gap-4 p-4">
      {ComponentCard(
        "Default Button",
        "This is the primary button component",
        <Button>Primary Button</Button>
      )}
      {ComponentCard(
        "Secondary Button",
        "This is the secondary button component",
        <Button variant="outline">Secondary Button</Button>
      )}
      {ComponentCard(
        "Ghost Button",
        "This is the ghost button component",
        <Button variant="ghost">Ghost Button</Button>
      )}
      {ComponentCard(
        "Link Button",
        "This is the disabled button component",
        <Button variant="link">Link</Button>
      )}
      {ComponentCard(
        "Disabled Button",
        "This is the disabled button component",
        <Button disabled>Disabled Button</Button>
      )}
      {ComponentCard(
        "Image Upload",
        "This is the image upload component",
        <ImageUpload />
      )}
    </div>
  )
}
