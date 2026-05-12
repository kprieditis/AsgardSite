import Image from "next/image"
import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardPage() {
const session = await auth()

if (!session?.user?.id) {
  redirect("/login")
}

const profile = await prisma.profile.upsert({
  where: {
    userId: session.user.id,
  },
  update: {},
  create: {
    userId: session.user.id,
    displayName: session.user.name ?? "Asgard Member",
  },
})

return (
  <main className="min-h-[calc(100vh-8rem)] bg-slate-950 px-4 py-12 text-slate-100">
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sweyellow">
          Asgard Command Dashboard
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt=""
                width={56}
                height={56}
                className="rounded-full border border-slate-700"
              />
            ) : null}

            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {profile.displayName ?? session.user.name}
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Discord account linked. Asgard profile initialized.
              </p>
            </div>
          </div>

          <SignOutButton />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Site Role
          </p>
          <p className="mt-2 text-lg font-semibold">{profile.siteRole}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Rank
          </p>
          <p className="mt-2 text-lg font-semibold">{profile.communityRank}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Division
          </p>
          <p className="mt-2 text-lg font-semibold">
            {profile.division ?? "Unassigned"}
          </p>
          <Link
            href="/account/profile"
            className="inline-flex rounded-xl bg-sweyellow px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-300"
            >
          Edit Profile
          </Link>
        </div>
      </div>
    </section>
  </main>
)
}