import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LoginPanel } from "@/components/login/login-panel";

export function HeroSection() {
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

      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Left content */}
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-sweyellow">
            Välkommen till
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
            Asgard
          </h1>

          <div className="mt-7 space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
            <p>
              Asgard är ett aktivt, svenskt Star Citizen gaming-community där
              gemenskap, samarbete och långsiktig progression står i centrum.
            </p>

            <p>
              Vi utforskar, erövrar och tar del av spelets alla möjligheter,
              samtidigt som vi satsar stort på att utveckla en stark industriell
              och ekonomisk närvaro.
            </p>

            <p>
              Vårt mål är att skapa en välkomnande miljö där varje medlem känner
              sig hemma och kan bidra till ett dynamiskt, stödjande community.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="group inline-flex items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/25 px-7 py-4 text-center text-base font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Mer om oss
              <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/fleet"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 px-7 py-4 text-center text-base font-semibold text-slate-300 transition hover:border-sweyellow hover:bg-sweblue/35 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Se flottan
            </Link>
          </div>
        </div>

        {/* Right member portal panel */}
        <LoginPanel variant="hero" redirectWhenSignedIn={false} />
      </div>
    </section>
  );
}