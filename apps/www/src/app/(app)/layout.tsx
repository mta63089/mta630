import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="z-10 mt-16 flex h-full min-h-svh w-full flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
