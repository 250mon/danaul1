---
name: danaul-content-update
description: Update Danaul clinic information, page copy, assets, or popup content while keeping repeated patient-facing information consistent. Use for content changes in this repository, not unrelated backend or styling work.
---

# Update Danaul content

Paths below are relative to the repository root. Read the current implementation before editing; this map describes where to start.

## Find the source and its consumers

| Content | Starting points |
| --- | --- |
| Clinic name, phone, hours, map coordinates | `app/lib/clinic-info.ts`; search for consumers and hardcoded copies |
| Address and transport instructions | `app/contact/components/Contact.tsx`, `app/ui/Footer.tsx`; `CLINIC_INFO.address.full` is currently empty |
| Booking link | `NAVER_BOOKING_URL` in `app/lib/data.ts`; also inspect persisted contact popup text |
| Home sections and clinic buttons | `sections` and `navigationButtons` in `app/lib/data.ts`; both files in `app/danaul/components/` |
| Visible home hero heading | `app/ui/Hero.tsx`; the rendered heading is hardcoded and currently ignores the passed `title` prop |
| Individual treatment pages | `app/{spine,joint,pain,trauma,obesity}/page.tsx` |
| Site title and description | `app/layout.tsx` |
| Exercise descriptions and videos | `app/exercise/page.tsx`, `public/clips/` |
| Popup text, visibility, buttons | `app/lib/data.ts`, `popups-config.json`, and the persistence flow below |

Search with `rg -n -F -- '<old text or URL>' app popups-config.json` and search the relevant constant name. Use shell-safe quoting for supplied text. Inspect matching contexts before replacing: a schedule change may affect labels as well as time values.

Change the requested source and affected duplicates. Preserve Korean copy, line breaks, asset paths, and unrelated content. Reuse shared constants where a small local change prevents repeated facts; avoid a broad refactor for a copy edit. Use facts supplied by the user or established sources; flag missing material facts instead of filling them with plausible values.

Trace rendered consumers before assuming exported data is visible: `navigationButtons` is currently unused, and the header has its own links in `app/ui/Header.tsx`.

Tuesday evening is a separate `hours.tuesday_evening` slot alongside ordinary weekday hours. If a requested Tuesday schedule could mean either the evening slot or the full day, resolve that distinction before changing the values.

## Popup persistence

`app/api/admin/popups/route.ts` reads the Redis key `popup_contents` if `REDIS_URL` is configured, then falls back to `popups-config.json`, then `defaultPopupContents`. `app/ui/AdminContext.tsx` overlays returned popup records onto defaults; this is a shallow merge by popup ID, not by individual field.

- Determine whether the requested change is to repository defaults/local content or deployed content. Continue source work while clarifying a deployment target only if needed.
- Keep the IDs `notice`, `promo`, and `contact` aligned with their callers. Preserve fields in the `PopupContent` interface.
- `DynamicModalContent.tsx` interprets newlines and `label|https://...` links. The promo button opens contact only when its `buttonAction` is `contact` and its caller supplies the action.
- Updating defaults alone will not replace an existing stored popup record. When changing repository popup content, inspect both defaults and the JSON file and update the applicable values.
- Admin edits issue PUT requests; reset issues POST and resets all popups. Do not use reset as a shortcut for changing one notice. Use an isolated local data store for verification; source-edit authorization does not imply publishing to a live store.

## Verify the result

Search for stale copies of the changed value, inspect the diff, and confirm referenced files exist with the exact case. Parse `popups-config.json` if edited. For TypeScript changes, use the project checks appropriate to the change.

Check affected rendered views when browser access is available: both home layouts for home content, contact/footer for shared facts, and the displayed popup for stored text or actions. Check wrapping and link destinations; don't submit a booking. The UI-check skill contains the route-specific checks if needed.

Report which sources changed, which checks ran, and whether popup changes affect source/local data or a verified live store. Do not describe a source-only change as published.
