# Danaul clinic website

Korean clinic website using Next.js App Router, React, TypeScript, and Tailwind CSS. Keep patient-facing copy in Korean unless the task requests another language.

## Project map

- `app/page.tsx` redirects `/` to `/danaul`.
- `app/danaul/page.tsx` mounts both `app/danaul/components/DanaulMobile.tsx` and `app/danaul/components/DanaulDesktop.tsx`; CSS controls visibility. Check both when changing the home page.
- Clinic pages are `app/{spine,joint,pain,trauma,obesity}/page.tsx`; contact and exercise have their own routes.
- `app/lib/clinic-info.ts` holds shared clinic details. `app/lib/data.ts` holds home sections, clinic navigation buttons, booking URL, and popup defaults. Some visible details are still hardcoded elsewhere; search before changing a shared fact.
- `app/ui/` contains shared navigation, footer, map, and popup/admin components. `app/layout.tsx` provides metadata, the admin context, and footer.
- `public/` contains images, fonts, and exercise clips. Preserve asset filename case and spaces when updating references.

## Working conventions

- Reuse the theme variables in `app/globals.css` and existing components where appropriate.
- Follow the package manager already used for the task. Both npm and pnpm lockfiles exist; avoid unrelated lockfile churn.
- Popup persistence can override code defaults: Redis when configured, then `popups-config.json`, then defaults. A source edit does not establish that deployed popup content changed.
- Separate supplied clinic facts from proposed copy. Do not invent hours, contact details, treatment claims, or booking destinations.

## Commands and verification

- `npm run dev` starts development; `npm run build` builds; `npm run start` serves a completed build.
- `npm run lint` currently invokes `next lint`. For a direct source lint check with dependencies installed, use `./node_modules/.bin/eslint app`. Recheck scripts if the toolchain changes.
- There is no configured automated test suite. Verify changes with the relevant existing tools and browser checks; report checks that could not run.
- Instructions-only edits need skill validation and source-reference checks, not an application build.

## Project workflows

- Use `.agents/skills/danaul-content-update/SKILL.md` for changes to clinic information, home/clinic copy, assets, or popup content.
- Use `.agents/skills/danaul-ui-check/SKILL.md` when validating rendered layout or interactions. Select checks relevant to the change rather than running every route for a small edit.
