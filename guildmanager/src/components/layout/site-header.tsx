import { auth } from "@/auth"
import { SiteHeaderClient } from "@/components/layout/site-header-client"

export async function SiteHeader() {
  const session = await auth()

  return (
    <SiteHeaderClient
      user={
        session?.user
          ? {
              name: session.user.name ?? null,
              email: session.user.email ?? null,
              image: session.user.image ?? null,
            }
          : null
      }
    />
  )
}