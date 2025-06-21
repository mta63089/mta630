import Link from "next/link"

import { Button } from "@/components/ui/button"
import SignUp from "@/components/auth/sign-up"
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
        <PageTitle>Signup</PageTitle>
        <PageDescription>
          Signup for a free account and get access to our AI tools, Premium
          Content, and More! If you already have an account then
          <Link href="/signin" className="flex place-content-center">
            <Button variant="link">Sign-In Instead</Button>
          </Link>
        </PageDescription>
      </PageHeader>
      <PageContent>
        <SignUp />
      </PageContent>
    </PageLayout>
  )
}
