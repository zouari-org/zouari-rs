FROM node:24.11-alpine3.21 AS base

# 1. Install dependencies only when needed
FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/api-client/package.json ./packages/api-client/package.json
COPY packages/validation/package.json ./packages/validation/package.json
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Restore workspace symlinks
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prefer-offline

# Inject a generic fallback for build-time static generation. 
# The actual URL is determined at runtime by the smart client.
ARG NEXT_PUBLIC_API_URL=http://api-fallback.localhost
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN --mount=type=secret,id=auth_secret \
    AUTH_SECRET=$(cat /run/secrets/auth_secret) \
    pnpm turbo run build --filter=web...

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Single source of truth for Infisical version
ARG INFISICAL_VERSION=0.43.38

# Install Infisical (Pinned)
RUN apk add --no-cache curl ca-certificates openssl && \
    curl -fsSL "https://github.com/Infisical/cli/releases/download/v${INFISICAL_VERSION}/cli_${INFISICAL_VERSION}_linux_amd64.tar.gz" -o infisical.tar.gz && \
    tar -xzf infisical.tar.gz -C /usr/local/bin infisical && \
    rm infisical.tar.gz && \
    chmod +x /usr/local/bin/infisical

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Static Assets: If you eventually add a public/ folder (for things like robots.txt or favicon.ico), you will need to uncomment this line.
# COPY --from=builder /app/apps/web/public ./apps/web/public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
