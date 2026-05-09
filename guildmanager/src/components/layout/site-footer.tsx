import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-100">
            Asgard
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Tactical Star Citizen organization hub for recruitment, operations,
            fleet identity, dispatches, and member command workflows.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
          {siteConfig.mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-100">
              {item.title}
            </Link>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          Unofficial community website. Not affiliated with Cloud Imperium Games.
        </p>
      </div>
    </footer>
  )
}