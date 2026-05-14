"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState, type MouseEvent } from "react";

type HeaderUser = {
  name: string | null;
  email: string | null;
  image: string | null;
} | null;

const leftNav = [
  { label: "Om oss", href: "/about" },
  { label: "Nyheter", href: "/dispatches" },
];

const rightNav = [{ label: "Flotta", href: "/fleet" }];

const mainMobileNav = [...leftNav, ...rightNav];

const authedMobileTopNav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Operations", href: "/operations" },
];

const dropdownSurfaceStyle = {
  backdropFilter: "blur(36px) saturate(175%) brightness(95%)",
  WebkitBackdropFilter: "blur(36px) saturate(175%) brightness(95%)",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function handleSignIn() {
  void signIn("discord", {
    redirectTo: "/dashboard",
  });
}

function handleSignOut() {
  void signOut({
    redirectTo: "/",
  });
}

function DesktopNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full border px-1 py-1 text-center text-[15px] font-semibold uppercase tracking-[0.16em] transition",
        "active:border-sweyellow focus-visible:border-sweyellow focus-visible:outline-none",
        isActive
          ? "border-sweyellow bg-sweblue/50 text-sweyellow"
          : "border-transparent text-slate-300 hover:bg-sweblue/35 hover:text-sweyellow"
      )}
    >
      {label}
    </Link>
  );
}

function DesktopDropdownLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center justify-center rounded-2xl border px-3 py-2 text-center text-xs font-medium uppercase tracking-[0.16em] transition",
        "active:border-sweyellow focus-visible:border-sweyellow focus-visible:outline-none",
        isActive
          ? "border-sweyellow bg-sweblue/60 text-sweyellow"
          : "border-transparent text-slate-300 hover:bg-sweblue/35 hover:text-sweyellow"
      )}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center justify-center rounded-2xl border px-3 py-2 text-center text-xs font-medium uppercase tracking-[0.16em] transition",
        "active:border-sweyellow focus-visible:border-sweyellow focus-visible:outline-none",
        isActive
          ? "border-sweyellow bg-sweblue/60 text-sweyellow"
          : "border-transparent text-slate-300 hover:bg-sweblue/35 hover:text-sweyellow"
      )}
    >
      {label}
    </Link>
  );
}

function MobileDivider() {
  return <div aria-hidden="true" className="my-1 h-px bg-sweyellow/35" />;
}

function DropdownGloss() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-sweblue/10 to-slate-950/25"
    />
  );
}

function SiteLogo() {
  const pathname = usePathname();

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    const isAtTop = window.scrollY <= 32;
    const isHomePage = pathname === "/";

    if (!isAtTop) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (isHomePage) {
      event.preventDefault();
    }
  }

  return (
    <Link
      href="/"
      onClick={handleLogoClick}
      aria-label="Asgard home"
      className="flex h-14 w-14 items-center justify-center rounded-full"
    >
      <Image
        src="/brand/asglogowhite.svg"
        alt="Asgard logo"
        width={64}
        height={64}
        priority
        className="h-12 w-12 object-contain transition duration-300 hover:scale-105"
      />
    </Link>
  );
}

function AccountMenu({ user }: { user: NonNullable<HeaderUser> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const accountLabel = user.name ?? user.email ?? "Account";
  const accountRouteIsActive =
    isActivePath(pathname, "/dashboard") || isActivePath(pathname, "/operations");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-sweyellow px-2 py-1 text-center text-[15px] font-bold uppercase tracking-[0.16em] text-sweyellow transition focus-visible:border-sweyellow focus-visible:outline-none",
          accountRouteIsActive ? "bg-sweblue/50" : "hover:bg-sweblue/35"
        )}
      >
        <span className="max-w-36 truncate">{accountLabel}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-50 mt-2 grid min-w-44 -translate-x-1/2 gap-1.5 overflow-hidden rounded-3xl border border-sweyellow bg-sweblue/20 p-3 shadow-[0_0_32px_rgba(0,82,147,0.65)] ring-1 ring-white/10"
          style={dropdownSurfaceStyle}
        >
          <DropdownGloss />

          <DesktopDropdownLink
            href="/dashboard"
            label="Dashboard"
            onClick={() => setOpen(false)}
          />

          <DesktopDropdownLink
            href="/operations"
            label="Operations"
            onClick={() => setOpen(false)}
          />

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="relative flex items-center justify-center rounded-2xl border border-sweyellow px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-sweyellow transition hover:bg-sweblue/35 focus-visible:outline-none"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function SiteHeaderClient({ user }: { user: HeaderUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = Boolean(user);

  useEffect(() => {
    function handleScroll() {
      const isScrolled = window.scrollY > 32;

      setScrolled(isScrolled);

      if (isScrolled) {
        setMobileOpen(false);
      }
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex justify-center px-3">
      <div
        className={cn(
          "pointer-events-auto relative rounded-full border border-sweyellow bg-sweblue/20 shadow-[0_0_32px_rgba(0,82,147,0.65)] backdrop-blur-md transition-all duration-500 ease-out",
          scrolled
            ? "h-16 w-16 p-0"
            : "w-32 px-2 py-1.5 lg:w-[min(92vw,38rem)] lg:px-3"
        )}
      >
        {/* Logo always keeps the same rendered size */}
        <div className="absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
          <SiteLogo />
        </div>

        {/* Desktop nav */}
        <div
          className={cn(
            "hidden min-h-14 grid-cols-[1fr_5.5rem_1fr] items-center transition-all duration-500 ease-out lg:grid",
            scrolled && "pointer-events-none opacity-0"
          )}
        >
          <nav
            className={cn(
              "flex justify-end gap-2 overflow-hidden whitespace-nowrap pr-1.5 transition-all duration-500 ease-out",
              scrolled
                ? "translate-x-8 scale-95 opacity-0"
                : "translate-x-0 scale-100 opacity-100"
            )}
          >
            {leftNav.map((item) => (
              <DesktopNavLink key={item.href} {...item} />
            ))}
          </nav>

          <div aria-hidden="true" />

          <div
            className={cn(
              "flex justify-start gap-2 overflow-visible whitespace-nowrap pl-1.5 transition-all duration-500 ease-out",
              scrolled
                ? "-translate-x-8 scale-95 opacity-0"
                : "translate-x-0 scale-100 opacity-100"
            )}
          >
            <nav className="flex items-center gap-2">
              {rightNav.map((item) => (
                <DesktopNavLink key={item.href} {...item} />
              ))}
            </nav>

            {user ? (
              <AccountMenu user={user} />
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="inline-flex items-center justify-center rounded-full border border-sweyellow px-2 py-1 text-center text-[15px] font-bold uppercase tracking-[0.16em] text-sweyellow transition hover:bg-sweblue/35 active:border-sweyellow focus-visible:border-sweyellow focus-visible:outline-none"
              >
                Logga in
              </button>
            )}
          </div>
        </div>

        {/* Mobile header height spacer */}
        <div className="min-h-14 lg:hidden" aria-hidden="true" />

        {/* Mobile hamburger next to logo */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className={cn(
            "absolute left-[calc(50%+1.45rem)] top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-sweyellow text-sweyellow transition hover:bg-sweblue/35 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sweyellow backdrop-blur-md lg:hidden",
            mobileOpen && "border-sweyellow bg-sweblue/35",
            scrolled && "pointer-events-none opacity-0"
          )}
        >
          <span
            className={cn(
              "absolute h-px w-4 bg-current transition duration-300",
              mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
            )}
          />

          <span
            className={cn(
              "absolute h-px w-4 bg-current transition duration-300",
              mobileOpen ? "opacity-0" : "opacity-100"
            )}
          />

          <span
            className={cn(
              "absolute h-px w-4 bg-current transition duration-300",
              mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
            )}
          />
        </button>

        {/* Mobile dropdown */}
        {mobileOpen && !scrolled && (
          <nav
            className="absolute left-1/2 top-full mt-2 grid w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 gap-1.5 overflow-hidden rounded-3xl border border-sweyellow bg-sweblue/20 p-3 shadow-[0_0_32px_rgba(0,82,147,0.65)] ring-1 ring-white/10 lg:hidden"
            style={dropdownSurfaceStyle}
          >
            <DropdownGloss />

            {isLoggedIn ? (
              <>
                {authedMobileTopNav.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    {...item}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="relative flex items-center justify-center rounded-2xl border border-sweyellow px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-sweyellow transition hover:bg-sweblue/35 focus-visible:outline-none"
                >
                  Sign out
                </button>

                <MobileDivider />

                {mainMobileNav.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    {...item}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="relative flex items-center justify-center rounded-2xl border border-sweyellow px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-sweyellow transition hover:bg-sweblue/35 focus-visible:outline-none"
                >
                  Logga in
                </button>

                <MobileDivider />

                {mainMobileNav.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    {...item}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}