import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Edit3,
  Medal,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRoundCheck,
  Users,
} from "lucide-react"

import { auth } from "@/auth"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { prisma } from "@/lib/prisma"

function formatProfileValue(value: string | null | undefined, fallback = "Ej angivet") {
  if (!value) {
    return fallback
  }

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
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

  const identityGrid = [
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

  const previousOperations: Array<{
    date: string
    operation: string
    participants: string
    awards: string
  }> = []

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-slate-950 px-4 pt-36 text-slate-100 sm:px-6 lg:px-8">
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
      <div className="absolute inset-0 -z-20 bg-slate-950/75" />

      {/* Blue tactical tint */}
      <div className="absolute inset-0 -z-20 bg-sweblue/20" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 -z-20 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sweblue/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-y-1/2 rounded-full bg-sweyellow/10 blur-3xl" />

      <div className="mx-auto min-h-[calc(100vh-9rem)] max-w-7xl py-16">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sweyellow">
              Asgard Command Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Medlemsöversikt
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Din personliga Asgard-yta för identitet, utmärkelser och tidigare
              operationer.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/account/profile"
              className="inline-flex items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/25 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Redigera profil
              <Edit3 className="ml-2 h-4 w-4" />
            </Link>

            <SignOutButton />
          </div>
        </div>

        {/* Profile card */}
        <section className="rounded-[2rem] border border-sweyellow bg-sweblue/20 p-5 shadow-[0_0_40px_rgba(0,82,147,0.5)] backdrop-blur-xl">
          <div className="rounded-[1.5rem] border border-sweblue bg-slate-950/35 p-5 sm:p-6 lg:p-7">
            <div className="grid gap-7 lg:grid-cols-[19rem_1fr] lg:items-stretch">
              <aside className="flex flex-col items-center rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-center shadow-[inset_0_0_28px_rgba(0,82,147,0.16)]">
                <div className="relative overflow-hidden rounded-3xl border border-sweyellow bg-slate-950/60 p-1 shadow-[0_0_28px_rgba(254,203,0,0.16)]">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt=""
                      width={176}
                      height={176}
                      className="h-44 w-44 rounded-[1.25rem] object-cover"
                    />
                  ) : (
                    <div className="flex h-44 w-44 items-center justify-center rounded-[1.25rem] bg-sweblue/30 text-sweyellow">
                      <UserRoundCheck className="h-16 w-16" />
                    </div>
                  )}
                </div>

                <h2 className="mt-5 text-2xl font-bold tracking-tight text-white">
                  {displayName}
                </h2>

                <div className="mt-4 w-full space-y-3">
                  <div className="rounded-2xl border border-sweyellow/50 bg-sweblue/20 px-4 py-3">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-sweyellow">
                      RSI Handle
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-100">
                      {rsiHandle}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-slate-500">
                      Discord
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-100">
                      {discordName}
                    </p>
                  </div>
                </div>
              </aside>

              <div className="flex min-w-0 flex-col justify-between gap-6">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-sweyellow">
                      Profilstatus
                    </p>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
                      Aktiv Asgard-profil
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                      Discord-kontot är kopplat. Fyll på profilen med rätt roll,
                      aktivitet och RSI-information för att göra medlemskortet
                      komplett.
                    </p>
                  </div>

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/30 text-sweyellow shadow-[0_0_24px_rgba(254,203,0,0.12)]">
                    <BadgeCheck className="h-7 w-7" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {identityGrid.map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 shadow-[inset_0_0_20px_rgba(0,82,147,0.12)]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sweyellow/40 bg-sweblue/30 text-sweyellow">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-sweyellow">
                              {item.label}
                            </p>
                            <p className="mt-2 truncate text-lg font-bold text-white">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-slate-400">
                    Saknas något? Uppdatera profilen så dashboarden kan visa rätt
                    identitet och roll.
                  </p>

                  <Link
                    href="/account/profile"
                    className="inline-flex items-center justify-center rounded-2xl border border-sweyellow/70 bg-sweblue/25 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    Uppdatera
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="mt-6 rounded-[2rem] border border-sweyellow/80 bg-sweblue/20 p-5 shadow-[0_0_34px_rgba(0,82,147,0.35)] backdrop-blur-xl">
          <div className="rounded-[1.5rem] border border-sweblue bg-slate-950/35 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-sweyellow">
                  Utmärkelser
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  Medaljer och erkännanden
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Här kan vi senare visa medaljer, badges, commendations eller
                  andra Asgard-utmärkelser kopplade till medlemmen.
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/30 text-sweyellow">
                <Trophy className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Första operationen",
                "Fleet Support",
                "Combat Ready",
                "Community Service",
              ].map((award) => (
                <div
                  key={award}
                  className="rounded-2xl border border-dashed border-white/15 bg-slate-950/30 p-4 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-sweyellow/35 bg-sweblue/25 text-sweyellow/80">
                    <Medal className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-300">
                    {award}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Ej upplåst ännu</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous operations */}
        <section className="mt-6 rounded-[2rem] border border-sweyellow/80 bg-sweblue/20 p-5 shadow-[0_0_34px_rgba(0,82,147,0.35)] backdrop-blur-xl">
          <div className="rounded-[1.5rem] border border-sweblue bg-slate-950/35 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-sweyellow">
                  Tidigare operationer
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  Operationshistorik
                </h2>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/30 text-sweyellow">
                <Award className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35">
              <div className="hidden grid-cols-[10rem_1.5fr_1fr_1fr] border-b border-white/10 bg-sweblue/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-sweyellow md:grid">
                <p>Datum</p>
                <p>Operation</p>
                <p>Deltagare</p>
                <p>Utmärkelser</p>
              </div>

              {previousOperations.length > 0 ? (
                previousOperations.map((operation) => (
                  <div
                    key={`${operation.date}-${operation.operation}`}
                    className="grid gap-3 border-b border-white/10 px-4 py-4 text-sm text-slate-300 last:border-b-0 md:grid-cols-[10rem_1.5fr_1fr_1fr] md:items-center"
                  >
                    <div>
                      <p className="md:hidden text-[0.68rem] font-bold uppercase tracking-[0.2em] text-sweyellow">
                        Datum
                      </p>
                      <p>{operation.date}</p>
                    </div>
                    <div>
                      <p className="md:hidden text-[0.68rem] font-bold uppercase tracking-[0.2em] text-sweyellow">
                        Operation
                      </p>
                      <p className="font-semibold text-slate-100">
                        {operation.operation}
                      </p>
                    </div>
                    <div>
                      <p className="md:hidden text-[0.68rem] font-bold uppercase tracking-[0.2em] text-sweyellow">
                        Deltagare
                      </p>
                      <p>{operation.participants}</p>
                    </div>
                    <div>
                      <p className="md:hidden text-[0.68rem] font-bold uppercase tracking-[0.2em] text-sweyellow">
                        Utmärkelser
                      </p>
                      <p>{operation.awards}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid gap-4 px-4 py-8 text-center md:grid-cols-[10rem_1.5fr_1fr_1fr] md:items-center md:text-left">
                  <div className="flex justify-center md:justify-start">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sweyellow/40 bg-sweblue/30 text-sweyellow">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-100">
                      Inga tidigare operationer registrerade ännu
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      När operationssystemet byggs ut kan historiken visas här.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-400 md:justify-start">
                    <Users className="h-4 w-4 text-sweyellow" />
                    <span>0 deltagare</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-400 md:justify-start">
                    <Award className="h-4 w-4 text-sweyellow" />
                    <span>0 utmärkelser</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
