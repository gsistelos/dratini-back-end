# mini-chat-back-end

## Setup

Create `.env`; use `.env.example` as reference.

Run `make` to start `postgres` and `express` containers.

## Development

Initialize only a local `postgres` container with `docker compose up -d postgres`

Run `pnpm generate` and `pnpm migrate` to generate then apply migrations.

Then, run `pnpm dev` to run `express` on watch mode.
