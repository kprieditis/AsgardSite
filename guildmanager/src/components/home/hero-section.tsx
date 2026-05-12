import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    MessageCircle,
    Newspaper,
    Ship,
    ChartBar,
    ArrowRight,
  } from "lucide-react";
import { siteConfig } from "@/config/site"

const hubItems = [
    {
      label: "Nyheter",
      description: "Följ uppdateringar och information.",
      icon: Newspaper,
    },
    {
      label: "Flotta",
      description: "Lär känna Asgards struktur och fokus.",
      icon: Ship,
    },
    {
      label: "Operationer",
      description: "Planering och samling av events.",
      icon: CalendarDays,
    },
    {
      label: "Statistik",
      description: "Samling av statistik och utmärkelser",
      icon: ChartBar,
    },
  ];

export function HeroSection() {
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

      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left content */}
        <div className="max-w-4xl">
          {/* <div className="mb-8 inline-flex items-center rounded-full border border-sweyellow/60 bg-sweblue/20 px-4 py-2 text-sm font-medium text-slate-200 shadow-[0_0_24px_rgba(0,82,147,0.45)] backdrop-blur-md">
            <span className="mr-2 h-2 w-2 rounded-full bg-sweyellow shadow-[0_0_14px_rgba(254,203,0,0.9)]" />
            Rekrytering Status: Öppen
          </div>

          <p className="mb-5 text-sm font-bold uppercase tracking-[0.45em] text-sweyellow">
            ASGARD
          </p> */}

            <h1 className="max-w-5xl text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Välkommen till <br />
            <span className="text-sweyellow">Asgard</span>
            </h1>

            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            <p>
                Asgard är ett aktivt, svenskt Star Citizen gaming-community där gemenskap,
                samarbete och långsiktig progression står i centrum.
            </p>

            <p>
                Vi utforskar, erövrar och tar del av spelets alla möjligheter, samtidigt som
                vi satsar stort på att utveckla en stark industriell och ekonomisk närvaro.
            </p>

            <p>
                Vårt mål är att skapa en välkomnande miljö där varje medlem känner sig hemma
                och kan bidra till ett dynamiskt, stödjande community.
            </p>
            </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            {/* <Link
              href="/recruitment"
              className="group inline-flex items-center justify-center rounded-2xl border border-sweyellow bg-sweyellow px-7 py-4 text-base font-semibold text-slate-950 transition hover:bg-sweyellow/90"
            >
              Gå med i Asgard
              <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
            </Link> */}

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/20 px-7 py-4 text-base font-semibold text-slate-100 shadow-[0_0_24px_rgba(0,82,147,0.35)] backdrop-blur-md transition hover:bg-sweblue/40 hover:text-sweyellow"
            >
              Mer om oss
            </Link>
          </div>
        </div>
        {/* Right community hub panel */}
        <aside className="rounded-[2rem] border border-sweyellow bg-sweblue/20 p-5 shadow-[0_0_40px_rgba(0,82,147,0.5)] backdrop-blur-xl">
        <div className="rounded-[1.5rem] border border-sweblue bg-slate-950/35 p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
            <div>
                {/* <p className="text-xs font-bold uppercase tracking-[0.3em] text-sweyellow">
                Community Hub
                </p> */}

                <h2 className="mt-2 text-2xl font-bold text-white">
                Rekrytering sker på Discord
                </h2>

                <p className="mt-3 text-md leading-6 text-slate-300">
                Vill du gå med i Asgard? Hoppa in på vår Discord, presentera dig och
                prata med communityt. Hemsidan hjälper dig att förstå vilka vi är,
                medan Discord är platsen där rekryteringen börjar.
                </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/30 text-sweyellow">
                <MessageCircle className="h-6 w-6" />
            </div>
            </div>

            <div className="rounded-2xl border border-sweyellow/85 bg-sweblue/20 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sweyellow">
                På hemsidan
            </p>

            <div className="mt-4 grid gap-3">
                {hubItems.map((item) => {
                const Icon = item.icon;

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
                );
                })}
            </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/25 px-7 py-4 text-base font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow"
            >
              Gå med på Discord
              <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
            </a>

            {/* <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-2xl border border-sweyellow/40 bg-sweblue/25 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow"
            >
                Läs mer först
            </Link> */}
            </div>
        </div>
        </aside>
      </div>
    </section>
  );
}