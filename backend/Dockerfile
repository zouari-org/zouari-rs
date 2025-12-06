FROM rust:1.91-alpine3.21 as builder
WORKDIR /usr/src/app
RUN apk add --no-cache musl-dev pkgconfig openssl-dev libc-dev

# Pre-step: copy manifest
COPY Cargo.toml Cargo.lock ./

# Create the directory first to ensure COPY works as expected
RUN mkdir -p migration
COPY migration/Cargo.toml migration/

# Create dummy source files for BOTH the backend and the migration crate
RUN mkdir -p src/bin migration/src && \
    # Stub the backend binary
    echo "fn main() {}" > src/bin/main.rs && \
    # Stub the migration library (needed because it's a path dependency)
    echo "pub fn migrate() {}" > migration/src/lib.rs

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
    curl -fsSL "https://github.com/Infisical/cli/releases/download/v${INFISICAL_VERSION}/cli_${INFISICAL_VERSION}_linux_amd64.tar.gz" -o infisical.tar.gz && \
    tar -xzf infisical.tar.gz -C /usr/local/bin infisical && \
    rm infisical.tar.gz && \
    chmod +x /usr/local/bin/infisical

# Copy binary and config
COPY --from=builder /usr/src/app/target/release/backend-cli ./zouari-backend
COPY --from=builder /usr/src/app/config ./config

# No ENTRYPOINT. Coolify defines it via command override.
ENV PORT=5150
EXPOSE 5150
CMD ["./zouari-backend", "start"]
