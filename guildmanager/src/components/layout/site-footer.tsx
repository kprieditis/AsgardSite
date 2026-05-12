import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-sweyellow bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <Image
              src="/brand/asglogowhite.svg"
              alt="Asgard logo"
              width={44}
              height={44}
              className="mt-1 rounded-md"
            />

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-100">
                Asgard
              </p>

              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Svenskt Star Citizen gaming-community
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-100">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-sweyellow"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="space-y-4 border-t border-sweblue pt-6 text-xs leading-6 text-slate-500">
          <p>
            Since we are a Swedish organization, all content on this website is
            also in Swedish. If you are an English speaker and wish to reach out
            to us with questions, you can join our{" "}
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-300 transition hover:text-slate-100"
            >
              Discord
            </Link>
            .
          </p>

          <p>
            This site is not endorsed by or affiliated with the Cloud Imperium or
            Roberts Space Industries group of companies. All game content and
            materials are copyright Cloud Imperium Rights LLC and Cloud Imperium
            Rights Ltd. Star Citizen®, Squadron 42®, Roberts Space Industries®,
            and Cloud Imperium® are registered trademarks of Cloud Imperium
            Rights LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}