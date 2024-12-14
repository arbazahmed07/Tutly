# Base Stage
FROM oven/bun:latest AS base
WORKDIR /app

# Install dependencies for build tools
RUN apt-get update && apt-get install -y openssl curl

# Copy lock files and initial dependencies
COPY package.json bun.lockb ./
COPY prisma ./prisma/
RUN bun install --global astro

# Production Dependencies Stage
FROM base AS prod-deps
ENV HUSKY=0
RUN bun install
RUN bun add @astrojs/check typescript
RUN bunx prisma generate

# Build Stage
FROM base AS build
COPY . .
RUN bun install
RUN bun run build

# Runtime Stage
FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

# Runtime environment variables
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Expose port
EXPOSE 4321

# # Healthcheck
# HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:4321/health || exit 1

# Start Command
CMD ["sh", "-c", "bunx prisma migrate deploy && HOST=0.0.0.0 bun ./dist/server/entry.mjs"]