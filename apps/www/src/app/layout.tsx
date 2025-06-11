import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

// TODO implement
// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: "%s | ESO Guild",
//   },
//   description: siteConfig.description,
//   keywords: [
//     "ESO",
//     "Elder Scrolls Online",
//     "ESO Guild",
//     "ESO Guilds",
//     "Guild",
//     "mta630",
//     "demolisheddub",
//     "ddubb",
//   ],
//   metadataBase: new URL(siteConfig.url),
//   authors: [
//     {
//       name: "Michael Albert",
//       url: "https://michaelalbert.dev",
//     },
//   ],
//   creator: "mta630",
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//     images: [
//       {
//         url: siteConfig.ogImage,
//         width: 1200,
//         height: 630,
//         alt: siteConfig.name,
//       },
//     ],
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
// };

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
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <div className="bg-background relative mx-auto flex min-h-svh flex-col items-center md:max-w-3/4">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
