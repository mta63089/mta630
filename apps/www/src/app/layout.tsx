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
      <head>
        <meta
          name="google-adsense-account"
          content={process.env.GOOGLE_ADSENSE_META}
        />
      </head>
      <body
        className={cn(
          "bg-background min-h-svh font-sans antialiased md:subpixel-antialiased",
          fontSans.variable,
          fontMono.variable,
          fontDisplay.variable,
          fontHead.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableColorScheme
        >
          <div className="flex min-h-svh flex-1 flex-col">{children}</div>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
