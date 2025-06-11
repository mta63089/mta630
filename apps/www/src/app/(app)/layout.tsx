import { StarsBackground } from "@/components/background-paths";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <SiteHeader />
      <StarsBackground className="flex justify-center items-center">
        <main className="min-h-svh z-10 mt-24">{children}</main>
      </StarsBackground>
      <SiteFooter />
    </div>
  );
}
