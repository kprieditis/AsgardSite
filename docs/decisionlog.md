## Decision — Frontend Framework

Date: 2026-05-09

Decision:
Use Next.js with the App Router as the frontend framework for the Asgard Community Website MVP.

Reasoning:
The MVP needs public pages, reusable layouts, future protected member routes, admin pages, authentication support, and a scalable structure for later backend/API work. Next.js aligns with the recommended MVP stack and supports TypeScript, Tailwind CSS, and shadcn/ui cleanly.

Initial setup:
- Next.js
- App Router
- TypeScript
- Tailwind CSS
- ESLint
- src/ directory
- @/* import alias
- shadcn/ui design system

Tradeoffs:
Next.js is more structured than a simple static site, but the added structure is useful because Asgard will later need Discord login, dashboards, applications, operations, roster tools, and admin workflows.



## Implementation Note — Phase 0 Site Shell

Date: 2026-05-09

Implemented:
- Base Asgard layout shell
- Main navigation
- Footer
- Homepage command-center placeholder
- Placeholder routes for public, member, and admin areas
- Shared placeholder panel component
- Initial tactical visual direction using dark space tones, blue highlights, and gold CTA accents

Reasoning:
This gives the project a stable structure before adding authentication, applications, operations, roster tools, and admin workflows.

Routes scaffolded:
- /
- /about
- /recruitment
- /fleet
- /operations
- /dispatches
- /rules
- /login
- /dashboard
- /admin


## Milestone — Phase 1 Started

Date: 2026-05-10

Status:
Asgard Community Website has officially moved from Phase 0 into Phase 1.

Phase 0 completed:
- Next.js App Router project foundation
- TypeScript and Tailwind setup
- Initial shadcn/ui design direction
- Base layout shell
- Main navigation
- Footer
- Homepage command-center placeholder
- Placeholder routes for public, member, and admin areas
- Initial tactical Asgard visual identity

Phase 1 goal:
Build the public-facing Asgard website so visitors can understand the organization, explore its identity, view recruitment information, and take clear next steps toward applying or joining Discord.

Phase 1 focus areas:
- Homepage
- About page
- Recruitment page
- Fleet page
- Rules page
- Public operations preview
- Dispatches/news page
- Discord and Apply calls-to-action
- Header/navigation polish
- Stronger Asgard tactical visual identity

Current first design task:
Experiment with a centered SVG/logo header, with navigation split to the left and right of the logo.


## Implementation Note — Header Polish Complete

Date: 2026-05-10

Implemented:
- Floating island-style public header
- Centered Asgard SVG logo
- Reduced primary navigation
- Swedish color tokens:
  - sweyellow: #fecb00
  - sweblue: #005293
- Scroll-collapse behavior
- Logo scroll-to-top behavior
- Mobile hamburger menu and dropdown

Reasoning:
The header now supports the Phase 1 public-site identity by acting as a compact branded navigation element rather than a generic full-width navbar.

Next focus:
Begin Homepage v1, starting with the hero section and public calls-to-action.