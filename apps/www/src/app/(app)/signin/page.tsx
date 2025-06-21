import Link from "next/link"

import { Button } from "@/components/ui/button"
import SignIn from "@/components/auth/sign-in"
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout"

export default function SignupPage() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>SignIn</PageTitle>
        <PageDescription>
          Sign in to your account! Or
          <Link href="/signup" className="flex place-content-center">
            <Button variant="link">Register for an account instead</Button>
          </Link>
        </PageDescription>
      </PageHeader>
      <PageContent>
        <SignIn />
      </PageContent>
    </PageLayout>
  )
}
