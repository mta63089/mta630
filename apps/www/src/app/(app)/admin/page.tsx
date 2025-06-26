import { redirect } from "next/navigation"

import { authClient } from "@/lib/auth-client"

export default async function AdminPage() {
  const session = await authClient.getSession()

  if (!session?.data?.user) {
    redirect("/not-authorized")
  }

  return (
    <>
      <div>THIS IS THE ADMIN PAGE</div>
    </>
  )
}
