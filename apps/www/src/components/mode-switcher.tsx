import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button, type buttonVariants } from "@/components/ui/button"

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

type Theme = "light" | "dark"

export function ModeSwitcher({ ...props }: ButtonProps) {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = React.useState<Theme>("light")

  React.useEffect(() => {
    setCurrentTheme(theme as Theme)
  }, [theme])

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark"]
    const currentIndex = themes.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeIcon = () => {
    switch (currentTheme) {
      case "light":
        return <Sun className="size-[1.2rem]" />
      case "dark":
        return <Moon className="size-[1.2rem]" />
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme} {...props}>
      {getThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
