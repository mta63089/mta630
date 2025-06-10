import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ThemeProvider, Toaster } from "@mta630/ui";

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
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-svh bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <div className="relative flex min-h-svh flex-col bg-background">
            {children}
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
