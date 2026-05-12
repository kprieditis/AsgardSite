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
        className="rounded-xl border border-sweyellow bg-sweblue/25 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-sweblue/45 hover:text-sweyellow"
      >
        Sign out
      </button>
    </form>
  )
}