import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PlaceholderPanelProps = {
  eyebrow: string
  title: string
  description: string
  status?: string
}

export function PlaceholderPanel({
  eyebrow,
  title,
  description,
  status = "Phase 0 Placeholder",
}: PlaceholderPanelProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="border-slate-800 bg-slate-900/70 text-slate-100 shadow-2xl shadow-blue-950/20">
        <CardHeader>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Badge className="border-blue-400/30 bg-blue-400/10 text-blue-300 hover:bg-blue-400/10">
              {eyebrow}
            </Badge>
            <Badge className="border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/10">
              {status}
            </Badge>
          </div>

          <CardTitle className="text-3xl tracking-tight sm:text-4xl">
            {title}
          </CardTitle>

          <CardDescription className="max-w-3xl text-base text-slate-400">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/70 p-6 text-sm text-slate-400">
            This page is scaffolded for Phase 0. Full content and functionality
            will be added in a later MVP phase.
          </div>
        </CardContent>
      </Card>
    </section>
  )
}