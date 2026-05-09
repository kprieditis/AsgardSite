import Link from "next/link"
import { Menu, Shield } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/30 bg-slate-900 text-amber-300 shadow-lg shadow-blue-950/30">
            <Shield className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-100">
              Asgard
            </p>
            <p className="text-xs text-slate-400">Star Citizen Command</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                {item.title}
                {item.label ? (
                  <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
                    {item.label}
                  </Badge>
                ) : null}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild className="bg-amber-400 text-slate-950 hover:bg-amber-300">
            <Link href="/recruitment">Apply</Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="border-slate-800 bg-slate-950 text-slate-100">
              <SheetHeader>
                <SheetTitle className="text-left text-slate-100">
                  Asgard Command
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 grid gap-2">
                {[...siteConfig.mainNav, ...siteConfig.utilityNav].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}

                <Button asChild className="mt-4 bg-amber-400 text-slate-950 hover:bg-amber-300">
                  <Link href="/recruitment">Apply to Asgard</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}