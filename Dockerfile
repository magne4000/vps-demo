# syntax=docker/dockerfile:1

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Enable corepack and install pnpm@10
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "docker-start"]

## ── Stage 2: Production ───────────────────────────────────────────────────────
#FROM node:22-alpine AS runner
#
#RUN corepack enable && corepack prepare pnpm@10 --activate
#
#WORKDIR /app
#
#ENV NODE_ENV=production
#
## Only copy what's needed to run the server
#COPY --from=builder /app/dist ./dist
#COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
#COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
#
## Install production dependencies only
#RUN pnpm install --frozen-lockfile --prod
#
#EXPOSE 3000
#
## DATABASE_URL is injected at runtime via docker-compose environment
#CMD ["pnpm", "run", "start"]