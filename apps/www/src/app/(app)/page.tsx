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
        <div className="my-2 w-full border-2 bg-gray-50 p-2">
          Currently working on...
        </div>
        <AnonymousChatRoom />
      </PageContent>
    </PageLayout>
  )
}
