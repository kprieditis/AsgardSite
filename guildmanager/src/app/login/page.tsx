import { redirect } from "next/navigation"

import { auth, signIn } from "@/auth"

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-slate-950 px-4 py-20 text-slate-100">
      <section className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sweyellow">
          Member Authentication
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Access Asgard Command
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Sign in with Discord to access member tools, applications, operations,
          roster features, and your Asgard profile.
        </p>

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
            className="w-full rounded-xl bg-sweyellow px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-yellow-300"
          >
            Continue with Discord
          </button>
        </form>
      </section>
    </main>
  )
}