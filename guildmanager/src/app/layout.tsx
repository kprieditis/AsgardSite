import type { Metadata } from "next"

import { SiteShell } from "@/components/layout/site-shell"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Asgard | Star Citizen Organization",
    template: "%s | Asgard",
  },
  description:
    "Asgard is a tactical Star Citizen organization website for recruitment, operations, fleet identity, dispatches, and member command workflows.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}