import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

export default function QuizPage() {
  return (
    <>
      <PageLayout>
        <PageHeader>
          <PageTitle>Political Ideology Quiz</PageTitle>
          <PageDescription>
            What ideologies match your policies?
          </PageDescription>
        </PageHeader>
        <PageContent>
          <div></div>
        </PageContent>
      </PageLayout>
    </>
  )
}
