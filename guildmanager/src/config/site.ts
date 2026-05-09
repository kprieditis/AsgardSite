export type NavItem = {
    title: string
    href: string
    label?: string
  }
  
  export const siteConfig = {
    name: "Asgard",
    description:
      "A Star Citizen organization website for recruitment, operations, member identity, and command workflows.",
    mainNav: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Recruitment",
        href: "/recruitment",
        label: "Open",
      },
      {
        title: "Fleet",
        href: "/fleet",
      },
      {
        title: "Operations",
        href: "/operations",
      },
      {
        title: "Dispatches",
        href: "/dispatches",
      },
      {
        title: "Rules",
        href: "/rules",
      },
    ] satisfies NavItem[],
    utilityNav: [
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Admin",
        href: "/admin",
      },
    ] satisfies NavItem[],
  }