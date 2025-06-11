import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

function ComponentCard(
  title: string,
  description: string,
  component: React.ReactNode
) {
  return (
    <Card className="p-4">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardContent className="self-center">{component}</CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="grid-cols-3 grid p-4 gap-4 my-4 justify-center">
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
    </div>
  );
}
