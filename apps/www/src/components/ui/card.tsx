import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

import { Text } from "./text"

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Card = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        "bg-card inline-block border-2 shadow-md transition-all hover:shadow-xs",
        className
      )}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        "bg-card-header text-card flex flex-col justify-start border border-b-2",
        className
      )}
      {...props}
    />
  )
}

const CardTitle = ({ children, className, ...props }: ICardProps) => {
  return (
    <Text
      as="h5"
      className={cn("p-1 font-semibold", className)}
      {...props}
    >{`[ ${children} ]`}</Text>
  )
}

const CardDescription = ({ className, ...props }: ICardProps) => (
  <p className={cn("text-muted-foreground", className)} {...props} />
)

const CardContent = ({ className, ...props }: ICardProps) => {
  return <div className={cn("p-4", className)} {...props} />
}

const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
})

export { CardComponent as Card }
