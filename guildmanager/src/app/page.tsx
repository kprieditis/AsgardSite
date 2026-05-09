import Link from "next/link"
import { ArrowRight, Radio, Shield, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const commandCards = [
  {
    title: "Recruitment",
    description: "Apply to Asgard and begin your path from applicant to operator.",
    icon: Users,
  },
  {
    title: "Operations",
    description: "View upcoming fleet activity, training events, patrols, and briefings.",
    icon: Radio,
  },
  {
    title: "Fleet Identity",
    description: "Explore divisions, ranks, roles, and the structure of the organization.",
    icon: Shield,
  },
]

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Badge className="mb-6 border-blue-400/30 bg-blue-400/10 text-blue-300 hover:bg-blue-400/10">
            Recruitment Status: Open
          </Badge>

          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Star Citizen Organization
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Asgard Command Center
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A tactical community hub for recruitment, member identity,
              operations, dispatches, and fleet coordination.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-300">
                <Link href="/recruitment">
                  Apply to Asgard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-slate-700 bg-slate-950/50 text-slate-100 hover:bg-slate-900">
                <Link href="/about">Explore the Organization</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        {commandCards.map((card) => {
          const Icon = card.icon

          return (
            <Card key={card.title} className="border-slate-800 bg-slate-900/70 text-slate-100">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-400">{card.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>
    </div>
  )
}