import { siteConfig } from "@/config/site"
import { fontDisplay, fontHead, fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | mta630.com",
  },
  description: siteConfig.description,
  keywords: [
    "mta630",
    "nextjs",
    "free",
    "web development",
    "blog",
    "tools",
    "demolisheddub",
    "ddubb",
    "michael albert",
    "michael thomas albert",
    "mike",
    "portfolio",
    "software engineer",
    "web design",
    "full stack development",
    "free tools",
    "privacy",
  ],
  metadataBase: new URL(siteConfig.url),
  authors: [
    {
      name: "Michael T. Albert",
      url: "https://www.mta630.com",
    },
  ],
  creator: "mta630",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-svh font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontDisplay.variable,
          fontHead.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <div className="bg-background relative mx-auto flex min-h-svh max-w-full min-w-full flex-col items-center md:max-w-4/5 md:min-w-4/5">
            {children}
          </div>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
