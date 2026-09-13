---
name: danaul-ui-check
description: Verify Danaul website layouts and interactions after UI changes, including the mobile/desktop home split, navigation, popups, contact map, and exercise videos. Use for rendered UI checks in this repository, not a full-site audit on every edit.
---

# Check the Danaul UI

Paths below are relative to the repository root. Select checks based on the changed files and affected routes. Shared header, footer, or theme changes warrant a broader sample than a single content edit.

## Start and scope

Read `package.json` and the root `AGENTS.md` for current commands. Reuse an existing local dev server when suitable; otherwise start `npm run dev` and use its reported URL. If dependencies are missing, use the project's chosen package manager when installation is in scope. Do not change both lockfiles just to run checks.

There is no configured browser test suite. Use browser tooling actually available in the session. If unavailable, perform source/asset checks and report the remaining visual checks explicitly; do not claim screenshots or visual verification from source inspection. Do not install a new test framework merely to follow this skill.

Use a clean browser session for public flows. Inspect whether local popup storage or environment configuration points to external services before testing admin changes; use isolated local fixtures for mutations.

## Viewports and shared UI

- Use representative widths of 390, 800, and 1280 CSS pixels for affected layouts. The home switches at `md` (768px); header navigation switches at `lg` (1024px). An 800px viewport intentionally combines the desktop home with the drawer menu.
- When changing responsive classes, also inspect just below and at the affected breakpoint (767/768 or 1023/1024).
- On both sides of `md`, confirm only the intended home layout is visible and assets, Korean text, and calls to action fit.
- Check header overlap at the top and after scrolling; its height changes. Below `lg`, open the drawer and close via its toggle, backdrop, and a navigation link. At `lg+`, check full navigation and booking-link layout.
- Check horizontal clipping, footer layout, focus visibility, and keyboard access on changed controls. `app/globals.css` pins `color-scheme: light` and has no dark-mode overrides, so a dark OS preference must not change the palette; it also honours `prefers-reduced-motion`.

## Route checks

| Affected area | Checks |
| --- | --- |
| Entry/home | `/` is the home route (`/danaul` 308-redirects to it); check `DanaulHome.tsx`, `DanaulMobile.tsx` and `DanaulDesktop.tsx`, the single shared hero, section links, images, and scroll behavior |
| Shared navigation | Home, five clinic links, and `/contact` resolve; verify the booking destination without making a reservation |
| Clinic pages | `/spine`, `/joint`, `/pain`, `/trauma`, `/obesity`: sample affected pages, stacked/wide sections, images, and contact calls to action |
| Popups | On `/`, enabled notice/promo records open after loading; disabled ones stay closed. Verify close controls, promo-to-contact action, line breaks, and link rendering using local fixtures when needed |
| Contact | `/contact`: hours/phone, `tel:` and booking links, stacked/two-column cards, Naver/Kakao links, and map container |
| Exercise | `/exercise`: `#lumbar`, `#knee`, `#shoulder` anchors clear the fixed header; affected clips load and native controls work; grid changes at `md` |

The Naver map in `app/ui/map.tsx` needs `NEXT_PUBLIC_NAVER_CLIENT_ID` and network access. With a usable configuration, verify map/marker rendering. Otherwise verify and report its configuration/load-error fallback; test Retry for a load error when practical. The missing-key panel reads “Configuration Error / Naver Maps API key is missing”; check that it stays within the map card and that the separate Naver/Kakao links remain usable. A missing key is not evidence that the configured map works or that a new UI change broke it.

Popup defaults may be overridden by Redis or `popups-config.json`; changing a default is not a reliable way to create a test case. See the content-update skill if the task involves stored popup content.

## Evidence

For changed behavior, check browser console/network failures and save screenshots when they help demonstrate the result. Report the routes and viewport widths checked, observed failures, and external-service or tooling limitations. Run source lint/build checks as appropriate to the change; report pre-existing failures separately. Stop servers you started when they are no longer needed, preserving pre-existing servers.
