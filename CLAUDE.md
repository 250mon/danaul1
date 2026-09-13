# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Korean neurosurgery clinic website (다나을신경외과의원) built with Next.js App Router, React 19, TypeScript, and Tailwind CSS 4. Keep patient-facing copy in Korean unless the task requests another language. Facts about the clinic (hours, phone, treatments) are real-world claims — never invent them; flag missing material facts instead of guessing.

## Commands

- `npm run dev` — start development server
- `npm run build` — production build (also the practical way to type-check the app)
- `npm run start` — serve a completed build
- `npm run lint` — runs `next lint`; for a direct source lint with dependencies installed, use `./node_modules/.bin/eslint app`
- No automated test suite is configured. Verify changes via build/lint and browser checks; report any checks that could not be run.
- Both `package-lock.json` and `pnpm-lock.yaml` exist. Use whichever package manager the task already implies and avoid unrelated lockfile churn.

### Docker Compose (for testing the deployed/runtime configuration)

```bash
cp .env.example .env   # set ADMIN_PASSWORD and NEXT_PUBLIC_NAVER_CLIENT_ID
docker compose up -d --build
```
`NEXT_PUBLIC_NAVER_CLIENT_ID` is embedded at build time, so changing it requires a rebuild. Popup data lives in the named `popup-data` volume mounted at `/app/data`; `docker compose down --volumes` deletes it. Optional `REDIS_URL`/`REDIS_PASSWORD` point at an external Redis (see Popup persistence below).

## Architecture

- `app/page.tsx` is the home route (server component holding the page metadata); it renders `app/danaul/components/DanaulHome.tsx`. `/danaul` 308-redirects to `/` via `redirects()` in `next.config.ts`.
- `DanaulHome.tsx` mounts **both** `app/danaul/components/DanaulMobile.tsx` and `app/danaul/components/DanaulDesktop.tsx` simultaneously; CSS (breakpoint `md`, 768px) controls which is visible. Check both when changing the home page. The shared `Hero` is rendered once by `DanaulHome` (not by each layout) so the document keeps a single `<h1>`; the section copy is still duplicated across the two trees.
- Clinic service pages: `app/{spine,joint,pain,trauma,obesity}/page.tsx`. Contact (`app/contact`) and exercise (`app/exercise`) have their own routes.
- `app/lib/clinic-info.ts` — **the single source of truth for every clinic fact**: name, phone, specialty labels, address, coordinates, transit (subway, bus stops, parking), served districts, map links, and the `SCHEDULE` constant that all displayed hours derive from. Edit `SCHEDULE`, never the `hours` display strings, and never retype a clinic fact in a page — `getOpeningHoursSpecification()` builds the schema.org hours from the same constant, so structured data cannot drift from the contact page. `app/lib/seo.ts` composes the repeated metadata phrases (district + specialty wording, catchment sentences, local keyword set) from it. `app/lib/site.ts` holds the canonical origin (`NEXT_PUBLIC_SITE_URL`, default `https://danaul.co.kr`). `app/lib/data.ts` — home page `sections`, `navigationButtons` (currently unused — the header has its own links in `app/ui/Header.tsx`), `NAVER_BOOKING_URL`, and `defaultPopupContents`. Search before assuming a shared constant is what's actually rendered.
- `app/ui/` — shared navigation (`Header.tsx`, drawer menu below `lg`/1024px), `Footer.tsx`, `map.tsx` (Naver Maps, needs `NEXT_PUBLIC_NAVER_CLIENT_ID`; the paired client secret is server-only and is not used by the browser SDK — never expose it as `NEXT_PUBLIC_*`. Auth failures arrive via the `navermap_authFailure` global, not as a script error), and the popup/admin system (`AdminContext.tsx`, `AdminPanel.tsx`, `PopupModalManager.tsx`, `DynamicModalContent.tsx`, `useModals.tsx`). `app/layout.tsx` wires up metadata, `AdminProvider`, and the footer for every route.
- `public/` — images, fonts, exercise clips. Preserve asset filename case and spaces (some filenames contain spaces) when referencing them. Source photos are large (several 5-6MB PNGs); they are served through `next/image`, so keep using `<Image>` rather than CSS `background-image` for content photos.
- Fonts: Pretendard Variable is self-hosted in two tiers of the **same family**, so the later `@font-face` wins per codepoint. `app/fonts/pretendard-site.css` (imported last) declares one ~139KB subset holding every character the site renders — that is the only font file a normal page fetches. `app/fonts/pretendard.css` declares the 92 `unicode-range` slices in `public/fonts/pretendard/` behind it, which only serve characters the subset misses. Regenerate the subset with `./scripts/build-font-subset.sh` after a large copy change; a stale subset is not a bug, the character still renders in Pretendard via one extra slice request. There is no `next/font` wiring: the family reaches every element through Tailwind's `--font-sans` in the `@theme` block of `app/globals.css`, which is what `--default-font-family` resolves to. **Never point `--font-sans` (or any `font-family`) at a `var()` that nothing defines** — an undefined custom property makes the whole declaration invalid at computed-value time and silently drops the site to the browser's default font.

### SEO and HTTP surface

- `app/layout.tsx` owns the title template, canonical/OG defaults and the `MedicalClinic` JSON-LD; every route exports its own `metadata` (the clinic pages are server components for exactly this reason — do not add `"use client"` back to them).
- `app/robots.ts` and `app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml`; add new routes to the `routes` list in `app/sitemap.ts`.
- `next.config.ts` sets security headers (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`). The CSP allowlists the Naver Maps hosts — extend it there when adding a third-party script, or the resource is blocked silently.
- `NEXT_PUBLIC_SITE_URL` sets the canonical origin for metadata, `robots.txt`, `sitemap.xml` and JSON-LD. Because `NEXT_PUBLIC_*` is inlined at build time and those routes are statically generated, **any new `NEXT_PUBLIC_*` variable must be added as a build arg in both `Dockerfile` and `docker-compose.yml`** — `.env` is excluded from the build context, and a runtime-only value silently leaves the generated output on its default. Same for `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_NAVER_MAP_AUTH_PARAM`.

### Popup content and persistence

Popups (`notice`, `promo`, `contact`) are defined by the `PopupContent` interface in `app/lib/data.ts`. Read order in `app/api/admin/popups/route.ts`: **Redis** (`popup_contents` key, if `REDIS_URL` is set) → **`popups-config.json`** file (path overridable via `POPUP_STORAGE_FILE`) → `defaultPopupContents` as final fallback. `AdminContext.tsx` fetches this and shallow-merges it onto `defaultPopupContents` **by popup ID**, not per-field.

Implications:
- Editing `defaultPopupContents` in source does **not** change already-persisted popup data (Redis or the JSON file) — a source edit is not a "deployed content changed" claim.
- Admin edits go out as `PUT` with a `Bearer <payload>.<hmac>` token issued by `app/api/admin/login/route.ts` and verified in `app/lib/admin-auth.ts` (HMAC over `ADMIN_PASSWORD`, or `ADMIN_SESSION_SECRET` if set; 12-hour expiry). `ADMIN_PASSWORD` is required — there is no default. `PUT` bodies are validated against the `PopupContent` shape and rejected otherwise; `POST` resets **all** popups to defaults — don't use it as a shortcut to change one popup.
- `DynamicModalContent.tsx` renders newlines and `label|https://...` link syntax from popup content; the promo button only opens contact when `buttonAction: 'contact'`.
- Outside Docker, file storage defaults to `./popups-config.json`; `POPUP_STORAGE_FILE`'s parent directory must exist and be writable.

## Repository-provided skills

Two skills under `.agents/skills/` cover the most common tasks in this repo — prefer them over ad hoc approaches:
- `danaul-content-update` — updating clinic info, page copy, assets, or popup content, including where duplicate copies of a fact tend to hide and how to verify a popup change without publishing to a live store.
- `danaul-ui-check` — verifying rendered layout/interactions (mobile/desktop home split, header/drawer breakpoints, popups, map, exercise clips) with the specific viewport widths and routes to sample.
