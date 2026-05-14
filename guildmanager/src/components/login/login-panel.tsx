import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  Medal,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import { auth, signIn } from "@/auth";

type LoginPanelProps = {
  variant?: "hero" | "page";
  redirectWhenSignedIn?: boolean;
};

const hubItems = [
  {
    label: "Profil",
    description: "Representera din division och visa din flotta.",
    icon: UserRoundCheck,
  },
  {
    label: "Operationer",
    description: "Anmäl dig till framtida operationer.",
    icon: Handshake,
  },
  {
    label: "Utmärkelser",
    description:
      "Samla utmärkelser för insatser och deltagande i operationer!",
    icon: Medal,
  },
];

const loggedOutNotes = [
  "Du behöver inget separat Asgard-lösenord.",
  "Din Asgard-profil skapas automatiskt vid första inloggningen.",
  "När inloggning lyckats så skickas du vidare till din panel!",
];

const signedInNotes = [
  "Du är redan inloggad på Asgards hemsida.",
  "Dashboarden samlar din profil och medlemsinformation.",
  "Operationer och framtida medlemsverktyg finns nära till hands.",
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export async function LoginPanel({
  variant = "hero",
  redirectWhenSignedIn = false,
}: LoginPanelProps) {
  const session = await auth();
  const isSignedIn = Boolean(session?.user);
  const isHero = variant === "hero";

  if (redirectWhenSignedIn && isSignedIn) {
    redirect("/dashboard");
  }

  const notes = isSignedIn ? signedInNotes : loggedOutNotes;

  return (
    <aside
      className={cn(
        "w-full rounded-[2rem] border border-sweyellow bg-sweblue/20 shadow-[0_0_40px_rgba(0,82,147,0.5)] backdrop-blur-xl",
        isHero
          ? "max-w-xl p-3 sm:p-4 lg:ml-auto lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto"
          : "p-5"
      )}
    >
      <div
        className={cn(
          "rounded-[1.5rem] border border-sweblue bg-slate-950/35",
          isHero ? "p-4 sm:p-5" : "p-6 sm:p-8"
        )}
      >
        <div
          className={cn(
            "flex items-start justify-between gap-4",
            isHero ? "mb-4" : "mb-6"
          )}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sweyellow">
              Medlemsportal
            </p>

            <h2
              className={cn(
                "mt-2 font-bold tracking-tight text-white",
                isHero ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
              )}
            >
              {isSignedIn ? "Välkommen tillbaka" : "Logga in"}
            </h2>

            <p
              className={cn(
                "mt-3 max-w-2xl leading-6 text-slate-300",
                isHero ? "text-sm" : "text-sm sm:text-base"
              )}
            >
              {isSignedIn
                ? "Du är redan inloggad. Gå vidare till din panel för profil, operationer och medlemsverktyg."
                : "Logga in med Discord för att komma åt din profil, operationer och medlemsverktyg."}
            </p>
          </div>

          {isSignedIn && (
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sweyellow/50 bg-sweblue/30 text-sweyellow sm:flex">
              <ShieldCheck className="h-5 w-5" />
            </div>
          )}
        </div>

        {isSignedIn ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard"
              className={cn(
                "group inline-flex w-full items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/25 text-center font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                isHero ? "px-5 py-3 text-sm" : "px-7 py-4 text-base"
              )}
            >
              Dashboard
              <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/operations"
              className={cn(
                "inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-center font-semibold text-slate-300 transition hover:border-sweyellow hover:bg-sweblue/35 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                isHero ? "px-5 py-3 text-sm" : "px-7 py-4 text-base"
              )}
            >
              Operations
            </Link>
          </div>
        ) : (
          <div className={cn("grid gap-3 sm:grid-cols-2", isHero ? "mt-4" : "mt-6")}>
            <form
              action={async () => {
                "use server";

                await signIn("discord", {
                  redirectTo: "/dashboard",
                });
              }}
            >
              <button
                type="submit"
                className={cn(
                  "group inline-flex w-full items-center justify-center rounded-2xl border border-sweyellow bg-sweblue/25 text-center font-semibold text-slate-100 transition hover:bg-sweblue/45 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                  isHero ? "px-5 py-3 text-sm" : "px-7 py-4 text-base"
                )}
              >
                Logga in
                <ArrowRight className="ml-3 h-5 w-5 transition group-hover:translate-x-1" />
              </button>
            </form>

            <Link
              href="#join-asgard"
              className={cn(
                "inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-950/35 text-center font-semibold text-slate-300 transition hover:border-sweyellow hover:bg-sweblue/35 hover:text-sweyellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sweyellow focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                isHero ? "px-5 py-3 text-sm" : "px-7 py-4 text-base"
              )}
            >
              Inte medlem än?
            </Link>
          </div>
        )}

        <div
          className={cn(
            "rounded-2xl border border-white/10 bg-slate-950/35",
            isHero ? "mt-4 p-3" : "mt-5 p-4"
          )}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sweyellow">
            {isSignedIn ? "Din session" : "Så fungerar inloggningen"}
          </p>

          <div className={cn("grid", isHero ? "mt-3 gap-2" : "mt-4 gap-3")}>
            {notes.map((note) => (
              <div
                key={note}
                className={cn(
                  "flex items-start gap-3 text-slate-300",
                  isHero ? "text-xs leading-5" : "text-sm leading-6"
                )}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sweyellow" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "rounded-2xl border border-sweyellow/85 bg-sweblue/20",
            isHero ? "mt-4 p-3" : "mt-5 p-4"
          )}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sweyellow">
            På hemsidan
          </p>

          <div className={cn("grid", isHero ? "mt-3 gap-2" : "mt-4 gap-3")}>
            {hubItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/35",
                    isHero ? "p-2.5" : "p-3"
                  )}
                >
                  <div
                    className={cn(
                      "flex shrink-0 items-center justify-center rounded-xl border border-sweyellow/40 bg-sweblue/30 text-sweyellow",
                      isHero ? "h-8 w-8" : "h-9 w-9"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {item.label}
                    </p>

                    <p
                      className={cn(
                        "mt-1 text-slate-400",
                        isHero ? "text-xs leading-4" : "text-xs leading-5"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}