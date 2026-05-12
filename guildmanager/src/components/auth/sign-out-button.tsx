import { signOut } from "@/auth"

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server"

        await signOut({
          redirectTo: "/",
        })
      }}
    >
      <button
        type="submit"
        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
      >
        Sign out
      </button>
    </form>
  )
}