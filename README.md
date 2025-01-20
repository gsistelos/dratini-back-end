# dratini-back-end

## Production

Create `.env`; use [.env.example](.env.example) as reference.

Run `make` to start `postgres`, `redis` and `express` containers.

## Development

Create `.env`; use [.env.example](.env.example) as reference.

Initialize only local `postgres` and `redis` containers with `docker compose up -d postgres redis`

Run `pnpm generate` and `pnpm migrate` to generate then apply migrations.

Then, run `pnpm dev` to run `express` on watch mode.
