# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS builder
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* values are inlined during `npm run build`, and .env is excluded
# from the build context, so every one of them must arrive as a build arg.
# Setting them at runtime has no effect on already-generated pages.
ARG NEXT_PUBLIC_NAVER_CLIENT_ID
ARG NEXT_PUBLIC_NAVER_MAP_AUTH_PARAM
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_NAVER_SITE_VERIFICATION
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ENV NEXT_PUBLIC_NAVER_CLIENT_ID=${NEXT_PUBLIC_NAVER_CLIENT_ID} \
    NEXT_PUBLIC_NAVER_MAP_AUTH_PARAM=${NEXT_PUBLIC_NAVER_MAP_AUTH_PARAM} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_NAVER_SITE_VERIFICATION=${NEXT_PUBLIC_NAVER_SITE_VERIFICATION} \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=${NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    POPUP_STORAGE_FILE=/app/data/popups-config.json

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
# New named volumes inherit this seed; existing volumes keep their edits.
RUN mkdir -p /app/data /app/.next/cache && chown -R node:node /app/data /app/.next
COPY --from=builder --chown=node:node /app/popups-config.json ./data/popups-config.json

USER node
EXPOSE 3000
CMD ["node", "server.js"]
