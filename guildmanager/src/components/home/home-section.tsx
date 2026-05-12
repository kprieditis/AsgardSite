import Link from "next/link";
import { ArrowRight, MessageCircle, RadioTower, Shield, Users } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site"


const focusAreas = [
  {
    title: "Gemenskap",
    description:
      "Ett svenskt Star Citizen-community där nya och erfarna spelare kan hitta en plats att växa.",
    icon: Users,
  },
  {
    title: "Industri & ekonomi",
    description:
      "Vi bygger långsiktig styrka genom resurser, produktion, handel och organiserad progression.",
    icon: RadioTower,
  },
  {
    title: "Flotta & säkerhet",
    description:
      "Vi utvecklar en strukturerad närvaro för försvar, eskort, operationer och större mål.",
    icon: Shield,
  },
];

export function HomeSections() {
  return (
    <>
 {/* Section 1: About Asgard */}
<section className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 lg:px-8">
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sweyellow to-transparent" />
  {/* <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-sweblue/20 blur-3xl" />
  <div className="pointer-events-none absolute left-0 bottom-0 h-96 w-96 rounded-full bg-sweyellow/5 blur-3xl" /> */}

  <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
    {/* Left visual */}
    <div className="flex justify-center lg:justify-start">
      <div className="relative flex aspect-square w-full max-w-sm items-center justify-center rounded-[2rem] border border-sweyellow bg-sweblue/15 p-10 shadow-[0_0_48px_rgba(0,82,147,0.35)] backdrop-blur-xl sm:max-w-md">
        <div className="absolute inset-4 rounded-[1.5rem] border border-sweblue" />
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sweblue/30 blur-3xl" />

        <Image
          src="/brand/asglogowhite.svg"
          alt="Asgard logo"
          width={320}
          height={320}
          className="relative z-10 h-auto w-64 object-contain sm:w-72"
        />

        {/* <div className="absolute bottom-5 rounded-full border border-sweyellow bg-slate-950/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sweyellow backdrop-blur-md">
          Swedish Star Citizen Community
        </div> */}
      </div>
    </div>

          <div className="space-y-5 text-xl leading-8 text-slate-300">
            <p>
              Asgard är mer än bara en organisation i Star Citizen. 
              Vi är en grupp passionerade spelare som strävar efter att utforska och dominera galaxen i Star Citizen. 
              Vårt mål är att skapa en stark och sammanhållen gemenskap där varje medlem kan känna sig hemma.
            </p>

            <p>
            Asgard grundades med visionen att bli en ledande kraft inom spelets ekonomiska och industriella sektorer. 
            Genom samarbete och dedikation arbetar vi för att nå våra gemensamma mål och erövra nya höjder tillsammans.
            </p>

            <p>
            Vi välkomnar svensktalande spelare av alla erfarenhetsnivåer och erbjuder stöd, 
            vägledning för att hjälpa alla att växa och utvecklas inom spelet. 
            Gå med oss och bli en del av något större!
            </p>

          </div>
        </div>
      </section>

      {/* Section 2: Focus areas */}
      <section className="bg-slate-950 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-sweyellow">
              Vår organisation
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Detta är Asgard.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="rounded-[2rem] border border-sweyellow/30 bg-sweblue/15 p-6 shadow-[0_0_32px_rgba(0,82,147,0.25)] backdrop-blur-md transition hover:border-sweyellow/60 hover:bg-sweblue/25"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sweyellow/40 bg-sweblue/30 text-sweyellow">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">
                    {area.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Discord CTA */}
      <section className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sweyellow to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sweblue/25 blur-3xl" />

        <div className="relative mx-auto max-w-5xl rounded-[2rem] border border-sweyellow bg-sweblue/20 p-8 text-center shadow-[0_0_48px_rgba(0,82,147,0.45)] backdrop-blur-xl sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-sweyellow/50 bg-sweblue/35 text-sweyellow">
            <MessageCircle className="h-7 w-7" />
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-sweyellow">
            Rekrytering via Discord
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Vill du bli en del av Asgard?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Hoppa in på vår Discord, presentera dig och prata med communityt.
            Där börjar rekryteringen och där sker den dagliga kommunikationen.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-sweyellow/40 bg-sweblue/25 px-7 py-4 text-base font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow"
            >
              Gå med på Discord
              <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
            </a>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-2xl border border-sweyellow/40 bg-sweblue/25 px-7 py-4 text-base font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow"
            >
              Läs mer om Asgard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}