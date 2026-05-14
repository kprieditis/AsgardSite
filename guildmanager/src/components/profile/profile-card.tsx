import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import {
  CalendarDays,
  ChartBarIncreasing,
  PencilLine,
  User,
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

type ProfileAvatarFrameProps = {
  image: string | null | undefined
  displayName: string
}

function ProfileAvatarFrame({ image, displayName }: ProfileAvatarFrameProps) {
  return (
    <div className="mx-auto w-fit rounded-[1.9rem] border border-sweyellow p-3 shadow-[0_0_28px_rgba(254,203,0,0.16)]">
      <div className="relative h-44 w-44 overflow-hidden rounded-[1.45rem] border border-sweblue shadow-[inset_0_0_28px_rgba(0,82,147,0.24)]">
        {image ? (
          <Image
            src={image}
            alt={displayName}
            fill
            sizes="176px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sweblue/20 text-sweyellow">
            <UserRoundCheck className="h-16 w-16" />
          </div>
        )}
      </div>
    </div>
  )
}

export default async function ProfileCard() {
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
  const timezone = profile.timezone ?? "Ej angivet"
  const bio = profile.bio?.trim()
  const operationCount = "0 registrerade"

  const identityGrid: IdentityGridItem[] = [
    {
      label: "Rank",
      value: communityRank,
      icon: ChartBarIncreasing,
    },
    {
      label: "Primär roll",
      value: primaryRole,
      icon: User,
    },
    {
      label: "Uppdrag",
      value: operationCount,
      icon: CalendarDays,
    },
  ]

  return (
    <section className="relative isolate min-h-screen overflow-hidden px-4 pt-36 sm:px-6 lg:px-8">
      <Image
        src="/hero/asgard-hero-01.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover"
      />

      <div className="absolute inset-0 -z-20 bg-slate-950/70" />
      <div className="absolute inset-0 -z-20 bg-sweblue/20" />
      <div className="absolute inset-x-0 bottom-0 -z-20 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sweblue/25 blur-3xl" />

      <div className="mx-auto min-h-[calc(100vh-9rem)] max-w-7xl py-16">
        <section className="rounded-[2rem] border border-sweyellow/80 bg-sweblue/20 p-6 shadow-[0_0_40px_rgba(0,82,147,0.5)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[14rem_minmax(13rem,0.7fr)_minmax(0,1fr)] lg:items-start">
            <aside className="space-y-5">
              <ProfileAvatarFrame
                image={session.user.image}
                displayName={displayName}
              />

              <div className="space-y-4 rounded-2xl bg-slate-950/30 p-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-sweyellow">
                    Namn
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                    {displayName}
                  </h2>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    RSI Handle
                  </p>

                  <p className="mt-1 truncate text-lg font-semibold text-slate-400">
                    {rsiHandle}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                    Discord
                  </p>

                  <p className="mt-1 truncate text-lg font-semibold text-slate-400">
                    {discordName}
                  </p>
                </div>
              </div>

              <Link
                href="/account/profile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sweyellow/70 bg-sweyellow px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-yellow-300"
              >
                <PencilLine className="h-4 w-4" />
                Edit profile
              </Link>
            </aside>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {identityGrid.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-slate-950/35 p-5 shadow-[inset_0_0_24px_rgba(0,82,147,0.12)]"
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

            <section className="rounded-2xl bg-slate-950/35 p-5 shadow-[inset_0_0_24px_rgba(0,82,147,0.12)]">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-sweyellow">
                Profilöversikt
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Primär aktivitet
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    {primaryActivity}
                  </p>
                </div>

                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Tidszon
                  </p>

                  <p className="mt-1 text-base font-semibold text-white">
                    {timezone}
                  </p>
                </div>

                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Bio
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {bio ||
                      "Ingen bio angiven ännu. Lägg till en kort presentation så andra medlemmar vet vem du är och vad du gillar att göra."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  )
}