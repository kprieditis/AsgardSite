import Image from "next/image"
import { redirect } from "next/navigation"
import {
  BadgeCheck,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

function formatProfileValue(
  value: string | null | undefined,
  fallback = "Ej angivet",
) {
  if (!value) {
    return fallback
  }

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

type IdentityGridItem = {
  label: string
  value: string | number | null | undefined
  icon: LucideIcon
}

export default async function DashboardSection() {
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

  const displayName = profile.displayName ?? session.user.name ?? "Asgard Member"
  const discordName = session.user.name ?? "Discord kopplat"
  const rsiHandle = profile.rsiHandle ?? "RSI ej kopplat"
  const communityRank = formatProfileValue(profile.communityRank)
  const primaryRole = formatProfileValue(profile.primaryRole, "Ej valt")
  const primaryActivity = formatProfileValue(profile.primaryActivity, "Ej valt")
  const operationCount = "0 registrerade"

  const identityGrid: IdentityGridItem[] = [
    {
      label: "Community rank",
      value: communityRank,
      icon: BadgeCheck,
    },
    {
      label: "Primär roll",
      value: primaryRole,
      icon: ShieldCheck,
    },
    {
      label: "Primär aktivitet",
      value: primaryActivity,
      icon: Sparkles,
    },
    {
      label: "Operationer",
      value: operationCount,
      icon: CalendarDays,
    },
  ]

  return (
    <section className="relative isolate min-h-screen overflow-hidden px-4 pt-36 sm:px-6 lg:px-8">
      {/* Background image */}
      <Image
        src="/hero/asgard-hero-01.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover"
      />

      {/* Dark readability overlay */}
      <div className="absolute inset-0 -z-20 bg-slate-950/70" />

      {/* Blue tactical tint */}
      <div className="absolute inset-0 -z-20 bg-sweblue/20" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 -z-20 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sweblue/25 blur-3xl" />

      <div className="mx-auto min-h-[calc(100vh-9rem)] max-w-7xl py-16">
        <section className="rounded-[2rem] border border-sweyellow bg-sweblue/20 p-6 shadow-[0_0_40px_rgba(0,82,147,0.5)] backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
            {/* Left profile column */}
            <aside className="space-y-5">
              <div className="w-fit rounded-2xl border border-sweyellow bg-slate-950/60 p-1 shadow-[0_0_28px_rgba(254,203,0,0.16)]">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt=""
                    width={176}
                    height={176}
                    className="h-44 w-44 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-sweblue/30 text-sweyellow">
                    <UserRoundCheck className="h-16 w-16" />
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {displayName}
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-sweyellow">
                    RSI Handle
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {rsiHandle}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                    Discord
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {discordName}
                  </p>
                </div>
              </div>
            </aside>

            {/* Right stats column */}
            <div className="grid gap-4 sm:grid-cols-2">
              {identityGrid.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 shadow-[inset_0_0_24px_rgba(0,82,147,0.12)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sweyellow/40 bg-sweblue/30 text-sweyellow">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-500">
                          {item.label}
                        </p>

                        <p className="mt-1 truncate text-base font-semibold text-white">
                          {item.value || "Ej angivet"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}