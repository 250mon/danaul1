# Danaul clinic website

Next.js App Router website using React, TypeScript, and Tailwind CSS.

## Run with Docker Compose

Install Docker Engine or Docker Desktop with the Compose v2 plugin, then:

```bash
cp .env.example .env
```

Edit `.env`: set `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL` (the public origin, e.g. `https://danaul.kdocai.com`) and the clinic's `NEXT_PUBLIC_NAVER_CLIENT_ID` for Naver Maps. An empty map key leaves the map unavailable. Then start the website:

Every `NEXT_PUBLIC_*` value is inlined when `npm run build` runs, and `.env` is excluded from the Docker build context, so each one must be declared as a build arg in both `Dockerfile` and `docker-compose.yml`. Adding a new `NEXT_PUBLIC_*` variable to `.env` alone silently leaves the built pages on the old default — that is how `robots.txt`, `sitemap.xml` and every canonical URL ended up pointing at the wrong domain. Changing any of them requires `docker compose up -d --build`, not a restart.

```bash
docker compose up -d --build
docker compose ps
```

Open http://localhost:3000 (or the `WEB_PORT` set in `.env`). The image uses a multi-stage build with `npm ci`, Next.js standalone output, and a non-root runtime user. Local `.env` files are excluded from the image; Compose passes the admin password at runtime. The public map key is embedded during the build, so changing it requires rebuilding.

```bash
# View logs
docker compose logs -f web

# Rebuild after code or map-key changes
docker compose up -d --build

# Stop and remove containers, keeping popup data
docker compose down
```

## Popup storage

Compose mounts the named `popup-data` volume at `/app/data`. A new volume starts with the repository's `popups-config.json`; admin edits survive container recreation and image rebuilds. Later changes to the repository file do not replace data in an existing volume. `docker compose down --volumes` deletes this saved data.

To back up the active file to the host:

```bash
docker compose cp web:/app/data/popups-config.json ./popups-backup.json
```

To restore a backup while the container is running (avoid concurrent admin edits):

```bash
docker compose exec -T web sh -c 'cat > /app/data/popups-config.json' < popups-backup.json
```

Optional `REDIS_URL` and `REDIS_PASSWORD` settings connect to an existing Redis service; the file volume remains the fallback. `localhost` inside the container refers to the container itself. Redis data takes precedence over the file, and successful Redis writes do not update the file backup; back up Redis separately when using it. Existing Redis data is not automatically migrated to file storage.

Outside Docker, popup storage still defaults to `./popups-config.json`. Set `POPUP_STORAGE_FILE` to override it; its parent directory must exist and be writable.

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build` to verify the production build. To lint source directly, use `./node_modules/.bin/eslint app` (the existing `npm run lint` script uses `next lint`).
