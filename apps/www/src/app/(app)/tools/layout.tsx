import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

interface ToolsLayoutProps {
  children: React.ReactNode
}

export default function ToolsLayout({ children }: ToolsLayoutProps) {
  return (
    <>
      <PageLayout>
        <PageHeader>
          <PageTitle>Tools</PageTitle>
          <PageDescription>
            A collection of free tools created by me mta630.
          </PageDescription>
        </PageHeader>
        <PageContent>{children}</PageContent>
      </PageLayout>
    </>
  )
}
