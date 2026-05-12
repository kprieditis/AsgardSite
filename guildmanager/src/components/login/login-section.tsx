import Image from "next/image"
import { redirect } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Handshake ,
  UserRoundCheck,
  Medal,
} from "lucide-react"

import { auth, signIn } from "@/auth"
import { siteConfig } from "@/config/site"

const hubItems = [
  {
    label: "Profil",
    description:
      "Representera din divison och visa din flotta.",
    icon: UserRoundCheck,
  },
  {
    label: "Operationer",
    description:
      "Anmäl dig till framtida operationer.",
    icon: Handshake ,
  },
  {
    label: "Utmärkelser",
    description:
      "Samla utmärkelser för insatser och deltagande i operationer!",
    icon: Medal,
  },
]

const loginNotes = [
  "Du behöver inget separat Asgard-lösenord.",
  "Din Asgard-profil skapas automatiskt vid första inloggningen.",
  "När inloggning lyckats så skickas du vidare till din panel!",
]

export default async function LoginSection() {
  const session = await auth()

  if (session?.user) {
    redirect("/dashboard")
  }

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
      <div className="absolute inset-0 -z-20 bg-slate-950/70" />

      {/* Blue tactical tint */}
      <div className="absolute inset-0 -z-20 bg-sweblue/20" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 -z-20 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sweblue/25 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl items-center justify-center py-16">
        <aside className="w-full rounded-[2rem] border border-sweyellow bg-sweblue/20 p-5 shadow-[0_0_40px_rgba(0,82,147,0.5)] backdrop-blur-xl">
          <div className="rounded-[1.5rem] border border-sweblue bg-slate-950/35 p-6 sm:p-8">
          
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-sweyellow">
                  Medlemsportal
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Logga in
                </h1>

                <p className="mt-3 max-w-2xl text-md leading-6 text-slate-300">
              Här börjar den skyddade delen av Asgards hemsida. Logga in med
              Discord för att komma åt din profil, anmäla dig för operationer, titta på flottan och samla dina utmärkelser.
                </p>
              </div>

            </div>

            <form
              className="mt-6"
              action={async () => {
                "use server"

                await signIn("discord", {
                  redirectTo: "/dashboard",
                })
              }}
            >
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/25 px-7 py-4 text-base font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Logga in med Discord
                <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sweyellow">
                Så fungerar inloggningen
              </p>

              <div className="mt-4 grid gap-3">
                {loginNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sweyellow" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-sweyellow/85 bg-sweblue/20 p-4 mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sweyellow">
                På hemsidan
              </p>

              <div className="mt-4 grid gap-3">
                {hubItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sweyellow/40 bg-sweblue/30 text-sweyellow">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>





            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-sm font-bold text-white">Inte medlem i Asgard än?</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Rekryteringen börjar på Discord. Gå med, presentera dig och prata med communityt.
                  </p>
                </div>

                <a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/25 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Gå med i våran Discord
                </a>
              </div>
            </div>
          </div>
        </aside>      </div>
    </section>
  )
}
