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