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


## 2026-05-12 — Discord Authentication, Database Accounts, and Member Profile Foundation

### Summary

We completed the first major authentication and member identity setup for the Asgard website.

The site now has a working Discord login flow, persistent database-backed user accounts, and an initial Asgard-specific profile system. This establishes the foundation for future features such as applications, ranks, divisions, roster pages, operations RSVP, dashboards, moderation tools, and admin permissions.

---

## Implementation Note
Date: 2026-05-12

#### Footer improvements

Updated the site footer to better support the Asgard identity and legal/community context.

Changes included:

- Added support for a small Asgard logo near the `ASGARD` footer brand text.
- Added text explaining that Asgard is a Swedish organization and that website content is in Swedish.
- Added a Discord link for English-speaking visitors who want to ask questions.
- Replaced the short disclaimer with a fuller Star Citizen / Cloud Imperium / Roberts Space Industries trademark and affiliation disclaimer.

---

## 2026-05-12 — Auth, Database, and Profile Foundation

### Completed

- Improved footer with Asgard logo support, Swedish/English visitor notice, Discord link, and fuller Star Citizen legal disclaimer.
- Added Discord login using Auth.js / NextAuth.
- Created protected login flow with:
  - `/login`
  - `/dashboard`
  - `/api/auth/[...nextauth]/route.ts`
  - `src/auth.ts`
- Added required environment variables:
  - `AUTH_SECRET`
  - `AUTH_DISCORD_ID`
  - `AUTH_DISCORD_SECRET`
  - `AUTH_URL`
  - `DATABASE_URL`
- Fixed Discord callback routing issue.
- Fixed Discord avatar loading by allowing `cdn.discordapp.com` in Next image config.
- Set up local PostgreSQL database using Docker.
- Added Prisma and connected it to Auth.js with the Prisma adapter.
- Added database models for:
  - `User`
  - `Account`
  - `Session`
  - `VerificationToken`
  - `Profile`
- Added Asgard profile fields:
  - Display name
  - RSI handle
  - Timezone
  - Primary activity
  - Primary role
  - Bio
  - Visibility
  - Community rank
  - Site role
  - Division
- Created reusable Prisma client in `src/lib/prisma.ts`.
- Protected the dashboard behind Discord login.
- Dashboard now creates/fetches the user’s Asgard profile.
- Created initial profile editor at `/account/profile`.

### Decisions

- Discord is used for authentication.
- Asgard-specific member data is stored separately in the `Profile` table.
- Local development database uses Docker PostgreSQL instead of Prisma’s generated local `prisma+postgres` URL.
- Dashboard initializes a profile automatically after first login.
- Profile editor starts simple and server-rendered for MVP speed.

### Current Flow

```txt
Visitor
→ Login
→ Discord OAuth
→ Auth.js callback
→ User/account/session saved in database
→ Dashboard
→ Asgard profile created
→ User can edit profile


### Left TODO
- Improve CSS for all newly edited pages/components:
- Login page
- Dashboard page
- Profile editor page
- Sign-out button
- Footer
- Auth/member navigation states
- Make the dashboard feel more like an Asgard site.
- Improve mobile responsiveness.
- Add better spacing, card layouts, helper text, and visual hierarchy.
- Add saved/loading/empty states where useful.
- Start working on signed-in navigation and role-aware route protection.