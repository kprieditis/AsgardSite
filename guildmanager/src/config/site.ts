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
        title: "Rules",
        href: "/rules",
      },
    ] satisfies NavItem[],
  }