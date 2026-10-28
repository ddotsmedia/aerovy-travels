# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat \
 && npm install -g pnpm@9.12.0
WORKDIR /app

# ---- build ----
FROM base AS build
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY packages ./packages
COPY scripts ./scripts
COPY apps/web ./apps/web
RUN pnpm install --frozen-lockfile

ARG NEXT_PUBLIC_APP_URL=https://aerovy.ae
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
RUN pnpm --filter @aerovy/web build

# ---- production ----
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3130 \
    HOSTNAME=0.0.0.0
WORKDIR /app

# With outputFileTracingRoot set to the monorepo root, the standalone
# server lives at apps/web/server.js inside the traced tree.
COPY --from=build --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=build --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=node:node /app/apps/web/public ./apps/web/public

USER node
EXPOSE 3130
CMD ["node", "apps/web/server.js"]
