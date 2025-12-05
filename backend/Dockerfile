FROM rust:1.91-alpine3.21 as builder
WORKDIR /usr/src/app
RUN apk add --no-cache musl-dev pkgconfig openssl-dev libc-dev

# Pre-step: copy manifest
COPY Cargo.toml Cargo.lock ./

# Create dummy main to cache dependencies
RUN mkdir -p src/bin && \
    echo "fn main() {}" > src/main.rs && \
    echo "fn main() {}" > src/bin/main.rs

# Build once to cache dependencies
RUN cargo build --release

# Now copy the full source and rebuild the real app
COPY . .
RUN touch src/bin/main.rs
RUN cargo build --release

# --- RUNNER ---
FROM alpine:3.21

# Single source of truth for Infisical version
ARG INFISICAL_VERSION=0.43.35

WORKDIR /app

# Install Runtime Dependencies & Infisical (Pinned Version)
RUN apk add --no-cache curl ca-certificates openssl && \
    curl -fsSL "https://github.com/Infisical/infisical/releases/download/v${INFISICAL_VERSION}/infisical_${INFISICAL_VERSION}_linux_amd64.tar.gz" -o infisical.tar.gz && \
    tar -xzf infisical.tar.gz -C /usr/local/bin infisical && \
    rm infisical.tar.gz && \
    chmod +x /usr/local/bin/infisical

# Copy binary and config
COPY --from=builder /usr/src/app/target/release/backend-cli ./zouari-backend
COPY --from=builder /usr/src/app/config ./config

# No ENTRYPOINT. Coolify defines it via command override.
CMD ["./zouari-backend", "start"]
