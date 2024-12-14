FROM oven/bun:latest AS base
WORKDIR /app

RUN apt-get update && apt-get install -y openssl curl

COPY package.json bun.lockb ./
COPY prisma ./prisma/
RUN bun install --global astro

FROM base AS prod-deps
# todo: change this
ENV HUSKY=0
RUN bun install --no-check
RUN bun add @astrojs/check typescript --no-check
RUN bunx prisma generate


FROM base AS build
COPY . .
# todo: change this
RUN bun install --no-check
RUN bun run build --no-check

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

CMD ["sh", "-c", "bunx prisma migrate deploy && HOST=0.0.0.0 bun ./dist/server/entry.mjs"]
