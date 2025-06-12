import Link from "next/link"
import { Stars } from "lucide-react"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="text-foreground bg-secondary mt-16 mb-4 w-full border border-t shadow-2xl">
      <div className="container mx-auto py-8">
        <div className="mb-6 flex flex-col items-center">
          <Link href="/" className="mb-4 flex items-center">
            <Stars className="text-primary mr-2 size-6 rounded-full" />
            <span className="text-xl font-semibold">mta630</span>
          </Link>
          <p className="text-muted-foreground max-w-2xl text-center text-sm">
            {siteConfig.description}
          </p>
        </div>
        <div className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} Michael Albert. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
