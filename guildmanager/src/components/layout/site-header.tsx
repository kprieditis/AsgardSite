"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

const leftNav = [
  { label: "Om oss", href: "/about" },
  { label: "Nyheter", href: "/dispatches" },
];

const rightNav = [{ label: "Flåtta", href: "/fleet" }];

const mobileNav = [
  ...leftNav,
  ...rightNav,
  { label: "Logga in", href: "/login" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DesktopNavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative rounded-full border px-1 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] transition",
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

function SiteLogo() {
  const pathname = usePathname();

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    const isAtTop = window.scrollY <= 32;

    if (!isAtTop) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (pathname === "/") {
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
        width={56}
        height={56}
        priority
        className="h-12 w-12 object-contain transition duration-300 hover:scale-105"
      />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
              "flex justify-start gap-2 overflow-hidden whitespace-nowrap pl-1.5 transition-all duration-500 ease-out",
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

            <Link
              href="/login"
              aria-current={pathname === "/login" ? "page" : undefined}
              className={cn(
                "rounded-full border border-sweyellow px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sweyellow transition",
                "active:border-sweyellow focus-visible:border-sweyellow focus-visible:outline-none",
                pathname === "/login"
                  ? "bg-sweblue/50"
                  : "hover:bg-sweblue/35"
              )}
            >
              Logga in
            </Link>
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
              "absolute left-[calc(50%+1.45rem)] top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-sweyellow/70 text-sweyellow transition hover:bg-sweblue/35 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sweyellow lg:hidden",
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
          <nav className="absolute left-1/2 top-full mt-2 grid w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 gap-1.5 rounded-3xl border border-sweyellow bg-sweblue/20 p-3 shadow-[0_0_32px_rgba(0,82,147,0.65)] backdrop-blur-md lg:hidden">
            {mobileNav.map((item) => {
              const isActive = pathname === item.href;
              const isLogin = item.href === "/login";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-2xl border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition",
                    "active:border-sweyellow focus-visible:border-sweyellow focus-visible:outline-none",
                    isActive
                      ? "border-sweyellow bg-sweblue/60 text-sweyellow"
                      : isLogin
                        ? "border-sweyellow text-sweyellow hover:bg-sweblue/45"
                        : "border-transparent text-slate-300 hover:bg-sweblue/45 hover:text-sweyellow"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}