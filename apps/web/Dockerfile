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
RUN npm install -g pnpm

# Inject a generic fallback for build-time static generation. 
# The actual URL is determined at runtime by the smart client.
ARG NEXT_PUBLIC_API_URL=/api-fallback
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Inject a dummy secret to pass Zod validation during the build.
# The real value will be provided at runtime by Infisical.
# Declare the ARG (no default value, forcing the caller to provide it)
ARG AUTH_SECRET

RUN : "${AUTH_SECRET:?AUTH_SECRET build arg is required for build}" && \
    # Export it solely for this command's scope so Turbo sees it
    AUTH_SECRET=${AUTH_SECRET} pnpm turbo run build --filter=web...

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Single source of truth for Infisical version
ARG INFISICAL_VERSION=0.43.35

# Install Infisical (Pinned)
RUN apk add --no-cache curl ca-certificates openssl && \
    curl -fsSL "https://github.com/Infisical/infisical/releases/download/v${INFISICAL_VERSION}/infisical_${INFISICAL_VERSION}_linux_amd64.tar.gz" -o infisical.tar.gz && \
    tar -xzf infisical.tar.gz -C /usr/local/bin infisical && \
    rm infisical.tar.gz && \
    chmod +x /usr/local/bin/infisical

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
