import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <SiteHeader />
      <main className="z-10 mt-24 min-h-svh">{children}</main>
      <SiteFooter />
    </div>
  )
}
