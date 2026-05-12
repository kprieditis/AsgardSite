import { redirect } from "next/navigation"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

async function updateProfile(formData: FormData) {
  "use server"

  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  await prisma.profile.upsert({
    where: {
      userId: session.user.id,
    },
    update: {
      displayName: String(formData.get("displayName") ?? ""),
      rsiHandle: String(formData.get("rsiHandle") ?? ""),
      timezone: String(formData.get("timezone") ?? ""),
      primaryActivity: String(formData.get("primaryActivity") ?? ""),
      primaryRole: String(formData.get("primaryRole") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      visibility: formData.get("visibility") === "PUBLIC" ? "PUBLIC" : "MEMBERS",
    },
    create: {
      userId: session.user.id,
      displayName: String(formData.get("displayName") ?? ""),
      rsiHandle: String(formData.get("rsiHandle") ?? ""),
      timezone: String(formData.get("timezone") ?? ""),
      primaryActivity: String(formData.get("primaryActivity") ?? ""),
      primaryRole: String(formData.get("primaryRole") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      visibility: formData.get("visibility") === "PUBLIC" ? "PUBLIC" : "MEMBERS",
    },
  })

  redirect("/dashboard")
}

export default async function ProfilePage() {
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
      <section className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sweyellow">
          Member Profile
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Configure Your Asgard Identity
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          This information will later power the roster, applications, operation
          signups, and member dashboard.
        </p>

        <form
          action={updateProfile}
          className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
        >
          <div>
            <label className="text-sm font-medium text-slate-300">
              Display name
            </label>
            <input
              name="displayName"
              defaultValue={profile.displayName ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sweyellow"
              placeholder="Your Asgard display name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              RSI handle
            </label>
            <input
              name="rsiHandle"
              defaultValue={profile.rsiHandle ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sweyellow"
              placeholder="Your Star Citizen / RSI handle"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              Timezone
            </label>
            <input
              name="timezone"
              defaultValue={profile.timezone ?? ""}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sweyellow"
              placeholder="Example: CET, GMT+1, UTC+1"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-300">
                Primary activity
              </label>
              <input
                name="primaryActivity"
                defaultValue={profile.primaryActivity ?? ""}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sweyellow"
                placeholder="Fleet, ground, industry..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">
                Primary role
              </label>
              <input
                name="primaryRole"
                defaultValue={profile.primaryRole ?? ""}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sweyellow"
                placeholder="Pilot, medic, logistics..."
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">Bio</label>
            <textarea
              name="bio"
              defaultValue={profile.bio ?? ""}
              rows={5}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sweyellow"
              placeholder="Short introduction for your Asgard profile"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">
              Profile visibility
            </label>
            <select
              name="visibility"
              defaultValue={profile.visibility}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sweyellow"
            >
              <option value="MEMBERS">Members only</option>
              <option value="PUBLIC">Public</option>
            </select>
          </div>

          <div className="flex justify-end border-t border-slate-800 pt-5">
            <button
              type="submit"
              className="rounded-xl bg-sweyellow px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}