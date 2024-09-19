# mini-chat-back-end

## Setup

### Postgres

Run `make` to run `postgres` in a docker container.

### Express

Run `pnpm install` to install npm packages.

`pnpm generate` and `pnpm migrate` will generate migrations and migrate them to the database.

Then, run `pnpm build` and `pnpm start` to run `express`. `pnpm dev` will run on watch mode.
