import Image from "next/image";

import { LoginPanel } from "@/components/login/login-panel";

type LoginSectionProps = {
  redirectWhenSignedIn?: boolean;
};

export default function LoginSection({
  redirectWhenSignedIn = true,
}: LoginSectionProps) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-slate-950 px-4 pt-36 text-slate-100 sm:px-6 lg:px-8">
      {/* Background image */}
      <Image
        src="/hero/asgard-hero-01.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-30 object-cover"
      />

      {/* Dark readability overlay */}
      <div className="absolute inset-0 -z-20 bg-slate-950/70" />

      {/* Blue tactical tint */}
      <div className="absolute inset-0 -z-20 bg-sweblue/20" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 -z-20 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-sweblue/25 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl items-center justify-center py-16">
        <LoginPanel
          variant="page"
          redirectWhenSignedIn={redirectWhenSignedIn}
        />
      </div>
    </section>
  );
}