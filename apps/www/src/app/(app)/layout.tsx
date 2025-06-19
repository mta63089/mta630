import RetroGrid from "@/components/retro-grid"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="z-10 flex h-full min-h-svh w-full flex-1">
        <RetroGrid className="absolute inset-0 z-0 max-w-[1000]" />
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
