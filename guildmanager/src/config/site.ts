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
        title: "Om oss",
        href: "/about",
      },
      {
        title: "Flåtta",
        href: "/fleet",
      },

      {
        title: "Nyheter",
        href: "/dispatches",
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
      {
        title: "Regler",
        href: "/rules",
      },
            {
        title: "Operationer",
        href: "/operations",
      },
            {
        title: "Rekrytering",
        href: "/recruitment",
        label: "Open",
      },
    ] satisfies NavItem[],
  }