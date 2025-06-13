import { AnonymousChatRoom } from "@/components/chat-room"
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

export default function HomePage() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Home</PageTitle>
        <PageDescription>
          Welcome to mta630.com the home of my busy mind
        </PageDescription>
      </PageHeader>
      <PageContent>
        <AnonymousChatRoom />
      </PageContent>
    </PageLayout>
  )
}
